# backend/finance/models.py
from django.db import models
from django.conf import settings  # User 모델을 가져오기 위함

class Transaction(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='transactions')
    category = models.CharField(max_length=20)  # 카테고리
    item = models.CharField(max_length=100, default='')     # 소비 품목
    store = models.CharField(max_length=100, default='')    # 소비처
    amount = models.IntegerField()              # 소비 금액
    memo = models.CharField(max_length=255, blank=True)  # 메모
    date = models.DateTimeField(null=True, blank=True) # 소비 일시 (수동 입력 가능)
    created_at = models.DateTimeField(auto_now_add=True) # 생성일
    
    # [추가] AI 분석을 위한 필드
    is_impulsive = models.BooleanField(default=False) # 충동구매 여부 (AI 판단)
    ai_feedback = models.TextField(blank=True, null=True) # AI의 한줄 평

    def __str__(self):
        return f"{self.user} - [{self.category}] {self.item} ({self.amount}원)"
        
"""
[파일 역할]
- 데이터베이스의 테이블 구조(스키마)를 정의하는 파일입니다.
- 클래스 하나가 테이블 하나에 대응되며, 변수는 컬럼에 대응됩니다.
"""