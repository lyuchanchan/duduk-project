from django.contrib import admin

"""
[파일 역할]
- Django 관리자 페이지(Admin Site) 설정을 담당합니다.
- models.py에 정의한 모델을 관리자 페이지에서 조회/수정할 수 있도록 등록합니다.
"""
from .models import Transaction

# 관리자 페이지에 Transaction 모델을 등록
admin.site.register(Transaction)