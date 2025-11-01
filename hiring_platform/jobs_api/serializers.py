from rest_framework import serializers
from .models import JobCategory, Company, Job, Application

class JobCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = JobCategory
        fields = '__all__'
