from django.db import models
from django.conf import settings

class Transaction(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='transactions')
    category = models.CharField(max_length=20)   # AI가 분류한 카테고리
    item = models.CharField(max_length=100, default='')     # 품목 (예: 아메리카노)
    store = models.CharField(max_length=100, default='')    # 소비처 (예: 스타벅스)
    amount = models.IntegerField()               # 금액
    memo = models.CharField(max_length=255, blank=True)
    
    date = models.DateTimeField() # 실제 소비 날짜 (사용자 수정 가능)

    # AI 분석 필드
    is_impulsive = models.BooleanField(default=False) # 충동구매 여부
    is_fixed = models.BooleanField(default=False) # 고정 지출 여부 (AI 판단/사용자 수정)
    ai_feedback = models.TextField(blank=True, null=True) # AI 피드백
    
    # 확장성 (위치 기반)
    address = models.CharField(max_length=255, blank=True, null=True) # 소비 위치

    def __str__(self):
        return f"{self.user} - {self.item} ({self.amount}원)"
