from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    """
    Custom User model for Duduk project.
    Inherits from AbstractUser to allow future extension.
    """
    # 사용자 특성
    job = models.CharField(max_length=100, blank=True, null=True) # 직업
    hobbies = models.TextField(blank=True, null=True) # 취미 (예: 독서, 등산)
    self_development_field = models.CharField(max_length=100, blank=True, null=True) # 자기개발 분야

    # 인적 사항
    MARITAL_STATUS_CHOICES = [
        ('SINGLE', '미혼'),
        ('MARRIED', '기혼'),
    ]
    marital_status = models.CharField(max_length=10, choices=MARITAL_STATUS_CHOICES, default='SINGLE')
    has_children = models.BooleanField(default=False) # 자녀 유무
    birth_date = models.DateField(null=True, blank=True) # 생년월일

    def __str__(self):
        return self.username
