from django.db import models
from django.conf import settings

class CoachingFeedback(models.Model):
    """
    AI 코칭에 대한 사용자의 피드백 (좋아요/싫어요 및 이유)
    """
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='feedbacks')
    is_liked = models.BooleanField(default=True) # True: 좋아요, False: 싫어요
    dislike_reason = models.TextField(blank=True, null=True) # 싫어요 선택 시 이유
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {'Like' if self.is_liked else 'Dislike'}"
