# backend/finance/views.py
"""
[파일 역할]
- 클라이언트(프론트엔드)의 요청을 받아 처리하고 응답을 반환하는 로직을 담당합니다.
- DB에서 데이터를 조회하거나 조작하고, 결과를 JSON 등으로 변환하여 보냅니다.
"""
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