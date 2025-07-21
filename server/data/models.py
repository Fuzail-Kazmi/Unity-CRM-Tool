from django.db import models

# Create your models here.

class LeadData(models.Model):
    name = models.CharField(max_length=200)    
    email = models.EmailField(unique=True,max_length=200)
    phone = models.CharField(max_length=12)
    source = models.CharField(max_length=200,null=True)

    def __str__(self):
        return self.name
    
class CustomerData(models.Model):
    name = models.CharField(max_length=200)    
    email = models.EmailField(unique=True,max_length=200)
    phone = models.CharField(max_length=12)

    def __str__(self):
        return self.name



        