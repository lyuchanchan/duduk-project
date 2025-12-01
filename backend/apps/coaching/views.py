from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from django.contrib.auth import get_user_model

from apps.transactions.models import Transaction
from external.gemini.client import GeminiClient

User = get_user_model()

class CoachingAdviceView(APIView):
    """
    사용자의 코칭 카드 목록을 조회하는 뷰
    (코칭 생성은 지출 내역 추가 시 자동으로 이루어짐)
    """
    permission_classes = [AllowAny] # MVP 편의상 AllowAny

    def get(self, request):
        # 임시 유저 할당 (로그인 안된 경우 첫 번째 유저 사용) - MVP용
        user = request.user
        if not user.is_authenticated:
            first_user = User.objects.first()
            if first_user:
                user = first_user
            else:
                return Response({"error": "No users found in DB. Create a user first."}, status=status.HTTP_400_BAD_REQUEST)

        from .models import Coaching

        # 최신순으로 코칭 카드 조회
        coachings = Coaching.objects.filter(user=user).order_by('-created_at')
        
        data = []
        for c in coachings:
            data.append({
                "id": c.id,
                "subject": c.subject,
                "analysis": c.analysis,
                "coaching_content": c.coaching_content,
                "created_at": c.created_at
            })
            
        return Response(data)

class FeedbackView(APIView):
    """
    AI 조언에 대한 사용자의 피드백(좋아요/싫어요)을 저장하는 뷰
    """
    permission_classes = [AllowAny] # MVP 편의상 AllowAny

    def post(self, request):
        # 임시 유저 할당 (로그인 안된 경우 첫 번째 유저 사용) - MVP용
        user = request.user
        if not user.is_authenticated:
            first_user = User.objects.first()
            if first_user:
                user = first_user
            else:
                return Response({"error": "No users found in DB. Create a user first."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            from .models import CoachingFeedback
            
            is_liked = request.data.get('is_liked', True)
            dislike_reason = request.data.get('dislike_reason', '')

            # 피드백 저장
            feedback = CoachingFeedback.objects.create(
                user=user,
                is_liked=is_liked,
                dislike_reason=dislike_reason
            )
            
            return Response({"message": "Feedback saved", "id": feedback.id}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
