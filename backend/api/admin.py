from django.contrib import admin
from .models import Transaction

# 관리자 페이지에 Transaction 모델을 등록
admin.site.register(Transaction)