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

def parse_transaction_with_ai(text):
    try:
        api_key = os.environ.get("GEMINI_API_KEY")
        if not api_key:
            return None

        genai.configure(api_key=api_key)
        model = genai.GenerativeModel('gemini-2.0-flash')

        prompt = f"""
        당신은 텍스트에서 소비 정보를 추출하는 AI입니다.
        다음 텍스트를 분석하여 JSON 형식으로 반환해주세요.
        
        [입력 텍스트]
        {text}

        [반환 형식]
        {{
            "category": "카테고리 (예: 식비, 교통, 쇼핑, 카페, 기타)",
            "item": "품목 (예: 아메리카노, 택시비)",
            "store": "소비처 (예: 스타벅스, 카카오택시)",
            "amount": 금액(숫자만),
            "memo": "기타 메모"
        }}
        
        JSON 외에 다른 말은 하지 마세요.
        """
        
        response = model.generate_content(prompt)
        
        # JSON 파싱을 위해 불필요한 마크다운 제거
        cleaned_text = response.text.replace("```json", "").replace("```", "").strip()
        import json
        data = json.loads(cleaned_text)
        
        # Ensure no None values for string fields
        for field in ['category', 'item', 'store', 'memo']:
            if data.get(field) is None:
                data[field] = ""
                
        return data

    except Exception as e:
        print(f"AI 파싱 오류: {e}")
        return None