# backend/finance/ai_utils.py
"""
[파일 역할]
- AI 관련 기능을 별도로 분리하여 모아둔 유틸리티 파일입니다.
- Google Gemini API 등을 호출하여 지출 내역을 분석하고 코칭 메시지를 생성합니다.
"""
import os
import google.generativeai as genai

def get_ai_coaching(transactions):
    try:
        # 1. API 키 설정
        api_key = os.environ.get("GEMINI_API_KEY")
        if not api_key:
            return "에러: GEMINI_API_KEY가 설정되지 않았습니다."

        genai.configure(api_key=api_key)
        model = genai.GenerativeModel('gemini-2.0-flash')

        # 2. AI에게 전달할 프롬프트(명령서) 작성
        prompt = """
        당신은 '두둑' 서비스의 AI 소비 코치입니다.
        다음은 사용자의 최근 지출 내역 리스트입니다.

        [지출 내역]
        {}

        이 지출 내역을 기반으로, 사용자의 소비 패턴을 분석하고
        절약을 위한 '대안 추천'과 '분석 코멘트'를 친근한 말투로 150자 이내로 생성해 주세요.
        """.format(transactions)

        # 3. AI 호출 및 응답 반환
        response = model.generate_content(prompt)
        return response.text

    except Exception as e:
        return f"AI 분석 중 오류 발생: {str(e)}"