# backend/api/ai_utils.py
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