from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from django.contrib.auth import get_user_model

from apps.transactions.models import Transaction
from external.gemini.client import GeminiClient

User = get_user_model()

class CoachingAdviceView(APIView):
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

        # 최근 10건 조회
        transactions = Transaction.objects.filter(user=user).order_by('-date')[:10]
        
        if not transactions:
            return Response({"message": "분석할 지출 내역이 없습니다."}, status=status.HTTP_200_OK)

        transaction_list_str = ""
        for t in transactions:
            transaction_list_str += f"- {t.date.strftime('%Y-%m-%d')} {t.category} / {t.item} ({t.store}) / {t.amount}원\n"

        client = GeminiClient()
        advice = client.get_advice(transaction_list_str)
        
        return Response({"message": advice})

class FeedbackView(APIView):
    permission_classes = [AllowAny] # MVP 편의상 AllowAny

    def post(self, request):
        # 임시 유저 할당 (로그인 안된 경우 첫 번째 유저 사용) - MVP용
        user = request.user
        if not user.is_authenticated:
            first_user = User.objects.first()
            if first_user:
                user = first_user
            else:
                return Response({"error": "No users found in DB. Create a user first."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            from .models import CoachingFeedback
            
            is_liked = request.data.get('is_liked', True)
            dislike_reason = request.data.get('dislike_reason', '')

            feedback = CoachingFeedback.objects.create(
                user=user,
                is_liked=is_liked,
                dislike_reason=dislike_reason
            )
            
            return Response({"message": "Feedback saved", "id": feedback.id}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
