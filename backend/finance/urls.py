# backend/finance/urls.py
"""
[파일 역할]
- Finance 앱 내부의 URL 주소를 정의합니다.
- 예: /api/finance/test-coaching/ 주소로 요청이 오면 views.py의 어떤 함수를 실행할지 연결합니다.
"""
from django.urls import path
from . import views

urlpatterns = [
    path('test-coaching/', views.test_coaching_api), # <--- 이 API의 주소
]