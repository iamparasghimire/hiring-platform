from rest_framework import serializers
from .models import JobCategory, Job, Application, Company, Interview, SavedJob


class JobCategorySerializer(serializers.ModelSerializer):
    jobs_count = serializers.SerializerMethodField()
    
    class Meta:
        model = JobCategory
        fields = ['id', 'name', 'description', 'icon', 'jobs_count', 'created_at']
    
    def get_jobs_count(self, obj):
        return obj.jobs.filter(status='open').count()


class JobSerializer(serializers.ModelSerializer):
    category = JobCategorySerializer(read_only=True)
    category_id = serializers.IntegerField(write_only=True)
    company = serializers.StringRelatedField(read_only=True)
    company_id = serializers.IntegerField(write_only=True, required=False)
    applications_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Job
        fields = ['id', 'title', 'company', 'company_id', 'location', 'description', 
                  'requirements', 'salary_min', 'salary_max', 'salary_currency',
                  'job_type', 'experience_level', 'status', 'category', 
                  'category_id', 'skills_required', 'benefits', 'applications_count',
                  'views_count', 'created_at', 'updated_at']
    
    def get_applications_count(self, obj):
        return obj.applications_count


class JobDetailSerializer(serializers.ModelSerializer):
    category = JobCategorySerializer(read_only=True)
    company = serializers.StringRelatedField(read_only=True)
    applications_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Job
        fields = ['id', 'title', 'company', 'location', 'description', 
                  'requirements', 'salary_min', 'salary_max', 'salary_currency',
                  'job_type', 'experience_level', 'status', 'category', 
                  'skills_required', 'benefits', 'applications_count',
                  'views_count', 'created_at', 'updated_at']
    
    def get_applications_count(self, obj):
        return obj.applications_count


class ApplicationSerializer(serializers.ModelSerializer):
    job_title = serializers.CharField(source='job.title', read_only=True)
    
    class Meta:
        model = Application
        fields = ['id', 'job', 'job_title', 'candidate_name', 'candidate_email', 
                  'phone_number', 'candidate_message', 'cv', 'status', 
                  'submitted_at', 'updated_at']
    
    def validate_cv(self, value):
        # Validate file size (max 5MB)
        if value.size > 5 * 1024 * 1024:
            raise serializers.ValidationError("CV file size must not exceed 5MB")
        return value


class ApplicationCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ['job', 'candidate_name', 'candidate_email', 'phone_number', 
                  'candidate_message', 'cv']


class ApplicationListSerializer(serializers.ModelSerializer):
    job = JobSerializer(read_only=True)
    
    class Meta:
        model = Application
        fields = ['id', 'job', 'candidate_name', 'candidate_email', 'phone_number', 
                  'status', 'rating', 'notes', 'submitted_at', 'updated_at']


class CompanySerializer(serializers.ModelSerializer):
    jobs_count = serializers.SerializerMethodField()
    active_jobs = serializers.SerializerMethodField()
    
    class Meta:
        model = Company
        fields = ['id', 'name', 'description', 'website', 'logo', 'location',
                  'industry', 'employee_count', 'founded_year', 'phone', 'email',
                  'verified', 'jobs_count', 'active_jobs', 'created_at', 'updated_at']
    
    def get_jobs_count(self, obj):
        return obj.jobs_count
    
    def get_active_jobs(self, obj):
        return obj.active_jobs


class InterviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interview
        fields = ['id', 'application', 'interview_type', 'scheduled_at',
                  'duration_minutes', 'interviewer_name', 'status', 'rating',
                  'notes', 'created_at', 'updated_at']


class SavedJobSerializer(serializers.ModelSerializer):
    job = JobSerializer(read_only=True)
    job_id = serializers.IntegerField(write_only=True)
    
    class Meta:
        model = SavedJob
        fields = ['id', 'job', 'job_id', 'candidate_email', 'saved_at']