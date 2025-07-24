from rest_framework import serializers
from .models import LeadData, CustomerData , EmailModel

class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeadData
        fields = '__all__'
        read_only_fields = ['id', 'created']

class EmailSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmailModel
        fields = '__all__'
        read_only_fields = ['sent_to', 'sent_from', 'created']

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerData
        fields = '__all__'
        read_only_fields = ['id', 'created']
