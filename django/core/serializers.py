from rest_framework import serializers

from core.models import CustomField


class CustomFieldSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomField
        exclude = ['raw_value']
