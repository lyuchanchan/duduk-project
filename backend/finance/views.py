# backend/api/views.py
from django.http import JsonResponse
from .models import Transaction
from .ai_utils import get_ai_coaching  # 방금 만든 AI 모듈 임포트

def test_coaching_api(request):
    # 1. DB에서 모든 지출 내역 가져오기
    all_transactions = Transaction.objects.all()

    # 2. 지출 내역을 AI에게 보낼 텍스트로 변환
    transaction_list_str = ""
    for t in all_transactions:
        transaction_list_str += f"- {t.category} / {t.description} / {t.amount}원\n"

    # 3. AI 모듈 호출 (AI가 분석 시작!)
    ai_response = get_ai_coaching(transaction_list_str)

    # 4. 프론트엔드에 AI 응답 결과 전송
    return JsonResponse({"message": ai_response})