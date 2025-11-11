from django.db import models

class Transaction(models.Model):
    # (필수 필드)
    category = models.CharField(max_length=100)
    amount = models.IntegerField()
    description = models.CharField(max_length=255, blank=True)
    
    # (테스트용 날짜 필드)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"[{self.category}] {self.description} - {self.amount}원"