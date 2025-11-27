import os
import json
import google.generativeai as genai

class GeminiClient:
    def __init__(self):
        self.api_key = os.environ.get("GEMINI_API_KEY")
        if self.api_key:
            genai.configure(api_key=self.api_key)
            self.model = genai.GenerativeModel('gemini-2.0-flash')
        else:
            self.model = None

    def analyze_text(self, text):
        """
        Parses natural language transaction text into structured JSON.
        """
        if not self.model:
            return None

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
        
        try:
            response = self.model.generate_content(prompt)
            cleaned_text = response.text.replace("```json", "").replace("```", "").strip()
            data = json.loads(cleaned_text)
            
            # Ensure no None values for string fields
            for field in ['category', 'item', 'store', 'memo']:
                if data.get(field) is None:
                    data[field] = ""
            return data
        except Exception as e:
            print(f"Gemini Analysis Error: {e}")
            return None

    def get_advice(self, transaction_list_str):
        """
        Generates financial advice based on transaction history.
        """
        if not self.model:
            return "API Key가 설정되지 않아 조언을 생성할 수 없습니다."

        prompt = f"""
        당신은 '두둑' 서비스의 AI 소비 코치입니다.
        다음은 사용자의 최근 지출 내역 리스트입니다.

        [지출 내역]
        {transaction_list_str}

        이 지출 내역을 기반으로, 사용자의 소비 패턴을 분석하고
        절약을 위한 '대안 추천'과 '분석 코멘트'를 친근한 말투로 150자 이내로 생성해 주세요.
        """
        
        try:
            response = self.model.generate_content(prompt)
            return response.text
        except Exception as e:
            return f"AI 분석 중 오류 발생: {str(e)}"
