from django.db import models

class JobCategory(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

class Company(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField(unique=True)
    location = models.CharField(max_length=200)
    industry = models.CharField(max_length=100)
