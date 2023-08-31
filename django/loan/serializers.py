from rest_framework import serializers

from loan.models import Loan, LoanForm
from core.serializers import CustomFieldSerializer


class LoanFormSerializer(serializers.ModelSerializer):

    fields = CustomFieldSerializer(many=True, read_only=True) 

    class Meta:
        model = LoanForm
        fields = '__all__'

class LoanSerializer(serializers.ModelSerializer):

    class Meta:
        model = Loan
        fields = '__all__'

