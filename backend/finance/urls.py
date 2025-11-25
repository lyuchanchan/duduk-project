# backend/api/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('test-coaching/', views.test_coaching_api), # <--- 이 API의 주소
]