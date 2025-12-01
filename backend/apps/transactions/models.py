from django.db import models
from django.conf import settings
import django.utils.timezone

class Transaction(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='transactions')
    category = models.CharField(max_length=20)   # AI가 분류한 카테고리
    item = models.CharField(max_length=100, default='')     # 품목 (예: 아메리카노)
    store = models.CharField(max_length=100, default='')    # 소비처 (예: 스타벅스)
    amount = models.IntegerField()               # 금액
    memo = models.CharField(max_length=255, blank=True)
    
    date = models.DateTimeField() # 실제 소비 날짜 (사용자 수정 가능)
    
    # 확장성 (위치 기반)
    address = models.CharField(max_length=255, blank=True, null=True) # 소비 위치
    
    created_at = models.DateTimeField(default=django.utils.timezone.now) # 데이터 생성 시간

    def __str__(self):
        return f"{self.user} - {self.item} ({self.amount}원)"
