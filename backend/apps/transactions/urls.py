from django.urls import path
from .views import ParseTransactionView, CreateTransactionView, TransactionListView

urlpatterns = [
    path('parse/', ParseTransactionView.as_view(), name='parse_transaction'),
    path('create/', CreateTransactionView.as_view(), name='create_transaction'),
    path('', TransactionListView.as_view(), name='list_transactions'),
]
