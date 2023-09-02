from rest_framework import serializers

from core.models import CustomField


class CustomFieldSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomField
        fields = '__all__'
