from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Transaction
from .serializers import TransactionSerializer
from .ai_utils import get_ai_coaching, parse_transaction_with_ai

class TransactionViewSet(viewsets.ModelViewSet):
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # 현재 로그인한 유저의 데이터만 조회
        return Transaction.objects.filter(user=self.request.user).order_by('-created_at')

    def perform_create(self, serializer):
        # 데이터 생성 시 유저 정보 자동 저장
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['post'])
    def parse(self, request):
        """
        텍스트를 받아 AI로 파싱하여 JSON 결과를 반환 (DB 저장 X)
        URL: POST /api/transactions/parse/
        """
        text = request.data.get('text', '')
        if not text:
            return Response({"error": "No text provided"}, status=status.HTTP_400_BAD_REQUEST)

        parsed_data = parse_transaction_with_ai(text)
        if not parsed_data:
            return Response({"error": "Failed to parse text"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        return Response(parsed_data)

    @action(detail=False, methods=['get'])
    def coaching(self, request):
        """
        전체 내역을 불러와 AI 조언 반환
        URL: GET /api/transactions/coaching/
        """
        transactions = self.get_queryset()
        
        # 지출 내역을 텍스트로 변환
        transaction_list_str = ""
        for t in transactions:
            transaction_list_str += f"- {t.category} / {t.item} ({t.store}) / {t.amount}원\n"
            
        ai_response = get_ai_coaching(transaction_list_str)
        return Response({"message": ai_response})