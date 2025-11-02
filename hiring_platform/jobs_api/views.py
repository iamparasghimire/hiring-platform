from rest_framework import viewsets
from .models import JobCategory, Company, Job, Application
from .serializers import *

class JobCategoryViewSet(viewsets.ModelViewSet):
    queryset = JobCategory.objects.all()
    serializer_class = JobCategorySerializer
