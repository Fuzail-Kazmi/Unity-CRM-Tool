from rest_framework import serializers
from .models import LeadData, CustomerData

class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeadData
        fields = '__all__'

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerData
        fields = '__all__'