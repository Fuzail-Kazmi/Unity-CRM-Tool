from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('lead/', views.getLead),
    path('lead/create/', views.createLead),
    path('lead/delete/<int:pk>/', views.deleteLead),
    path('customer/', views.getCustomer),
    path('customer/create/', views.createCustomer),
    path('customer/delete/<int:pk>/', views.deleteCustomer)
]