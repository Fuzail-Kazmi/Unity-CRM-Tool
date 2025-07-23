from django.db import models

# Create your models here.

class LeadData(models.Model):
    class TypeChoices(models.TextChoices):
        DOCTOR = 'Dr' , 'Doctor'
        MADAM = 'Madam' , 'Madam'
        MASTER = 'Master' , 'Master'
        MISTER = 'Mr' , 'Mister'
        MISSUS = 'Mrs' , 'Missus'
        MASTER_OF_SCIENCE = 'Ms' , 'Master Of Science'
        MIXTER = 'Mx' , 'Mixter'
        PROFESSOR = 'Prof' , 'Professor'
        OTHERS = 'OTHER' , 'Other'

    class StatusChoices(models.TextChoices):
        NEW = 'New' , 'New'
        CONTACTED = 'Contacted' , 'Contacted'
        NURTURE = 'Nurture' , 'Nurture'
        QUALIFIED = 'Qualified' , 'Qualified'
        UNQUALIFIED = 'Unqualified' , 'Unqualified'
        JUNK = 'Junk' , 'Junk'

    name = models.CharField(max_length=100)    
    email = models.EmailField(unique=True,max_length=200)
    phone = models.CharField(max_length=12)
    source = models.URLField(default='', blank=True)
    organization = models.CharField(max_length=100,blank=True,null=True)
    no_of_employee = models.IntegerField(null=True, blank=True)
    annual_revenue = models.DecimalField(max_digits=20, decimal_places=2, null=True, blank=True)
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True) 
    salutation = models.CharField(max_length=6 , choices=TypeChoices.choices, null=True, blank=True)
    status = models.CharField(choices=StatusChoices.choices, null=True, blank=True)

    def __str__(self):
        return self.name
    
class CustomerData(models.Model):
    lead = models.ForeignKey(LeadData, on_delete=models.CASCADE,null=True,blank=True)
    name = models.CharField(max_length=200)    
    email = models.EmailField(unique=True,max_length=200)
    phone = models.CharField(max_length=12)
    created_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.name



        