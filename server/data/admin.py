from django.contrib import admin
from .models import LeadData, CustomerData
# Register your models here.

admin.site.register(LeadData)
admin.site.register(CustomerData)