from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('lead/', views.getLead),
    path('lead/create/', views.createLead),
    path('lead/update/<int:pk>/', views.updateLead),
    path('lead/delete/<int:pk>/', views.deleteLead),
    path('lead/convert/<int:pk>/', views.convert_to_customer),
    path('lead/<int:pk>/update-status/', views.updateLeadStatus),
     path('lead/<int:pk>/email/', views.getSendEmail),       
    path('lead/<int:pk>/email/create/', views.createSendEmail),
    path('customer/', views.getCustomer),
    path('customer/create/', views.createCustomer),
    path('customer/update/<int:pk>/', views.updateCustomer),
    path('customer/delete/<int:pk>/', views.deleteCustomer)
]