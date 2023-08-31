from rest_framework import routers
from django.urls import path, include

from loan.viewsets import LoanViewSet

router = routers.SimpleRouter()
router.register(r'loan', LoanViewSet, basename='loan')

app_name = 'api'

urlpatterns = [
    path('', include(router.urls)),
]
