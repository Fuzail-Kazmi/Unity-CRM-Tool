from rest_framework import serializers
from .models import Lead_Data, Customer_Data

class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead_Data
        fields = '__all__'

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer_Data
        fields = '__all__'