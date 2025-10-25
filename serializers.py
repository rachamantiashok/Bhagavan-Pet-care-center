from rest_framework import serializers
from .models import Pet, User, Adoption, Donation, Volunteer, Service, Suggestion

class PetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pet
        fields = '__all__'

# Similarly define UserSerializer, AdoptionSerializer, etc.