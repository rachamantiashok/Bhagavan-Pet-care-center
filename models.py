from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    mobile = models.CharField(max_length=15, unique=True)
    address = models.TextField()
    URBAN_RURAL_CHOICES = (('urban', 'Urban'), ('rural', 'Rural'))
    location_type = models.CharField(max_length=10, choices=URBAN_RURAL_CHOICES)
    # email and username already in AbstractUser

class Pet(models.Model):
    PET_TYPE_CHOICES = (('Dog', 'Dog'), ('Cat', 'Cat'), ('Bird', 'Bird'), ('Other', 'Other'))
    ADOPTION_STATUS = (('Available', 'Available'), ('Pending', 'Pending'), ('Adopted', 'Adopted'))
    name = models.CharField(max_length=50)
    type = models.CharField(max_length=10, choices=PET_TYPE_CHOICES)
    breed = models.CharField(max_length=50)
    age = models.CharField(max_length=20)
    description = models.TextField()
    vaccinated = models.BooleanField(default=False)
    neutered = models.BooleanField(default=False)
    adoption_status = models.CharField(max_length=10, choices=ADOPTION_STATUS, default='Available')
    rescue_date = models.DateTimeField(auto_now_add=True)
    added_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    location = models.CharField(max_length=200, default="")
    # add image field as needed

class Adoption(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    pet = models.ForeignKey(Pet, on_delete=models.CASCADE)
    pet_preference = models.CharField(max_length=20)
    home_type = models.CharField(max_length=20)
    experience_with_pets = models.BooleanField()
    experience_details = models.TextField(blank=True)
    family_members = models.IntegerField()
    status = models.CharField(max_length=20, default="Pending")
    application_date = models.DateTimeField(auto_now_add=True)

class Donation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    purpose = models.CharField(max_length=100)
    payment_status = models.CharField(max_length=20, default="Pending")
    donation_date = models.DateTimeField(auto_now_add=True)

class Volunteer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    available_time = models.CharField(max_length=50)
    help_type = models.CharField(max_length=200)
    availability = models.CharField(max_length=200)
    status = models.CharField(max_length=30, default="Pending")
    created_at = models.DateTimeField(auto_now_add=True)

class Service(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    schedule = models.CharField(max_length=200)
    location = models.CharField(max_length=200)
    contact = models.CharField(max_length=100, blank=True)

class Suggestion(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    submitted = models.DateTimeField(auto_now_add=True)
