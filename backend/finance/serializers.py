from rest_framework import serializers
from .models import Transaction

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'
        read_only_fields = ('user', 'created_at', 'is_impulsive', 'ai_feedback')

    def create(self, validated_data):
        # 요청을 보낸 유저를 자동으로 할당
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)
