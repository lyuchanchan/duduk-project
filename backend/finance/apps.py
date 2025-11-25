from django.apps import AppConfig

"""
[파일 역할]
- Finance 앱의 메타데이터와 설정을 정의하는 파일입니다.
- 앱의 이름, 기본 설정 등을 관리합니다.
"""


class FinanceConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'finance'
