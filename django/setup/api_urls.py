from rest_framework import routers
from django.urls import path, include

from loan.viewsets import LoanViewSet, LoanFormViewSet

router = routers.SimpleRouter()
router.register(r'loan', LoanViewSet, basename='loan')
router.register(r'loan_form', LoanFormViewSet, basename='loan_form')

app_name = 'api'

urlpatterns = [
    path('', include(router.urls)),
]
