from django.db import models

"""
[파일 역할]
- 데이터베이스의 테이블 구조(스키마)를 정의하는 파일입니다.
- 클래스 하나가 테이블 하나에 대응되며, 변수는 컬럼에 대응됩니다.
"""

class Transaction(models.Model):
    # (필수 필드)
    category = models.CharField(max_length=100)
    amount = models.IntegerField()
    description = models.CharField(max_length=255, blank=True)
    
    # (테스트용 날짜 필드)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"[{self.category}] {self.description} - {self.amount}원"