from django.contrib import admin
from .models import JobCategory, Company, Job, Application

admin.site.register(JobCategory)
admin.site.register(Company)
admin.site.register(Job)
admin.site.register(Application)
