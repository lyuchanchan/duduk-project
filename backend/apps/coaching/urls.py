from django.urls import path
from .views import CoachingAdviceView

urlpatterns = [
    path('advice/', CoachingAdviceView.as_view(), name='coaching_advice'),
]
