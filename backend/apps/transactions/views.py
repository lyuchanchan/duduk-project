from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.contrib.auth import get_user_model

from .models import Transaction
from external.gemini.client import GeminiClient

User = get_user_model()

class ParseTransactionView(APIView):
    permission_classes = [AllowAny] # MVP 편의상 AllowAny, 실제로는 IsAuthenticated 권장

    def post(self, request):
        text = request.data.get('text', '')
        if not text:
            return Response({"error": "No text provided"}, status=status.HTTP_400_BAD_REQUEST)

        client = GeminiClient()
        parsed_data = client.analyze_text(text)
        
        if not parsed_data:
            return Response({"error": "Failed to parse text"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        return Response(parsed_data)

class CreateTransactionView(APIView):
    permission_classes = [AllowAny] # MVP 편의상 AllowAny

    def post(self, request):
        data = request.data
        
        # 임시 유저 할당 (로그인 안된 경우 첫 번째 유저 사용) - MVP용
        user = request.user
        if not user.is_authenticated:
            first_user = User.objects.first()
            if first_user:
                user = first_user
            else:
                return Response({"error": "No users found in DB. Create a user first."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            from django.utils import timezone
            transaction_date = data.get('date')
            if not transaction_date:
                transaction_date = timezone.now()

            transaction = Transaction.objects.create(
                user=user,
                category=data.get('category', '기타'),
                item=data.get('item', ''),
                store=data.get('store', ''),
                amount=data.get('amount', 0),
                memo=data.get('memo', ''),
                date=transaction_date,
                address=data.get('address', ''),
                is_impulsive=data.get('is_impulsive', False),
                is_fixed=data.get('is_fixed', False),
                ai_feedback=data.get('ai_feedback', '')
            )

            return Response({"message": "Transaction created", "id": transaction.id}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class TransactionListView(APIView):
    permission_classes = [AllowAny] # MVP 편의상 AllowAny

    def get(self, request):
        # 임시 유저 할당 (로그인 안된 경우 첫 번째 유저 사용) - MVP용
        user = request.user
        if not user.is_authenticated:
            first_user = User.objects.first()
            if first_user:
                user = first_user
            else:
                return Response({"error": "No users found in DB. Create a user first."}, status=status.HTTP_400_BAD_REQUEST)
        
        transactions = Transaction.objects.filter(user=user).order_by('-date')
        
        # Serializer를 따로 안 만들었으므로 수동 직렬화 (MVP)
        data = []
        for t in transactions:
            data.append({
                "id": t.id,
                "category": t.category,
                "item": t.item,
                "store": t.store,
                "amount": t.amount,
                "memo": t.memo,
                "date": t.date,
                "is_impulsive": t.is_impulsive,
                "is_fixed": t.is_fixed,
                "ai_feedback": t.ai_feedback,
                "address": t.address
            })
        return Response(data)
