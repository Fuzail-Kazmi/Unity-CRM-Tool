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
    mobile = models.CharField(max_length=12)
    source = models.URLField(default='', blank=True)
    organization = models.CharField(max_length=100,blank=True,null=True)
    no_of_employee = models.IntegerField(null=True, blank=True)
    annual_revenue = models.DecimalField(max_digits=20, decimal_places=2, null=True, blank=True)
    created = models.DateField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True) 
    salutation = models.CharField(max_length=6 , choices=TypeChoices.choices, null=True, blank=True)
    status = models.CharField(choices=StatusChoices.choices, null=True, blank=True)

    def __str__(self):
        return self.name
    
class EmailModel(models.Model):
    lead = models.ForeignKey(LeadData, on_delete=models.CASCADE, null=True, blank=True)
    message = models.TextField()
    sent_to = models.EmailField()
    sent_from = models.EmailField(blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Email to {self.sent_to} for Lead {self.lead.id if self.lead else 'N/A'}"
    
class CustomerData(models.Model):
    lead = models.ForeignKey(LeadData, on_delete=models.CASCADE,null=True,blank=True)
    name = models.CharField(max_length=200)    
    email = models.EmailField(unique=True,max_length=200)
    mobile = models.CharField(max_length=12)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name



        