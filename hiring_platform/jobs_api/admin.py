from django.contrib import admin
from .models import JobCategory, Job, Application, Company, Interview, SavedJob


@admin.register(JobCategory)
class JobCategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'jobs_count', 'created_at']
    search_fields = ['name', 'description']
    readonly_fields = ['created_at']
    
    def jobs_count(self, obj):
        return obj.jobs.filter(status='open').count()
    jobs_count.short_description = 'Open Jobs'


@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = ['title', 'get_company_name', 'category', 'status', 'job_type', 'applications_count', 'created_at']
    list_filter = ['status', 'job_type', 'category', 'created_at']
    search_fields = ['title', 'company__name', 'location', 'description']
    readonly_fields = ['created_at', 'updated_at', 'applications_count', 'views_count']
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'company', 'category')
        }),
        ('Job Details', {
            'fields': ('location', 'salary_min', 'salary_max', 'salary_currency', 'job_type', 'experience_level', 'status')
        }),
        ('Content', {
            'fields': ('description', 'requirements', 'skills_required', 'benefits'),
            'classes': ('wide',)
        }),
        ('Statistics', {
            'fields': ('applications_count', 'views_count'),
            'classes': ('collapse',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def get_company_name(self, obj):
        return obj.company.name if obj.company else 'Unknown'
    get_company_name.short_description = 'Company'
    
    def applications_count(self, obj):
        return obj.applications_count
    applications_count.short_description = 'Applications'


@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ['candidate_name', 'candidate_email', 'job', 'status', 'submitted_at']
    list_filter = ['status', 'job', 'submitted_at']
    search_fields = ['candidate_name', 'candidate_email', 'job__title']
    readonly_fields = ['submitted_at', 'updated_at', 'cv_download']
    fieldsets = (
        ('Job Information', {
            'fields': ('job',)
        }),
        ('Candidate Information', {
            'fields': ('candidate_name', 'candidate_email', 'phone_number')
        }),
        ('Application', {
            'fields': ('candidate_message', 'cv', 'cv_download', 'status', 'rating', 'notes'),
            'classes': ('wide',)
        }),
        ('Timestamps', {
            'fields': ('submitted_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def cv_download(self, obj):
        if obj.cv:
            return f'<a href="{obj.cv.url}" target="_blank">Download CV</a>'
        return 'No CV uploaded'
    cv_download.short_description = 'CV File'
    cv_download.allow_tags = True


@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ['name', 'location', 'industry', 'verified', 'jobs_count', 'created_at']
    list_filter = ['verified', 'industry', 'created_at']
    search_fields = ['name', 'location', 'industry', 'email']
    readonly_fields = ['created_at', 'updated_at', 'jobs_count', 'active_jobs']
    fieldsets = (
        ('Company Information', {
            'fields': ('name', 'email', 'website', 'logo')
        }),
        ('Details', {
            'fields': ('location', 'industry', 'description', 'phone', 'employee_count', 'founded_year')
        }),
        ('Status', {
            'fields': ('verified',)
        }),
        ('Statistics', {
            'fields': ('jobs_count', 'active_jobs'),
            'classes': ('collapse',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(Interview)
class InterviewAdmin(admin.ModelAdmin):
    list_display = ['id', 'application', 'interview_type', 'scheduled_at', 'status', 'rating']
    list_filter = ['status', 'interview_type', 'scheduled_at']
    search_fields = ['application__candidate_name', 'interviewer_name']
    readonly_fields = ['created_at', 'updated_at']
    fieldsets = (
        ('Interview Information', {
            'fields': ('application', 'interview_type', 'status')
        }),
        ('Schedule', {
            'fields': ('scheduled_at', 'duration_minutes', 'interviewer_name')
        }),
        ('Feedback', {
            'fields': ('rating', 'notes'),
            'classes': ('wide',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(SavedJob)
class SavedJobAdmin(admin.ModelAdmin):
    list_display = ['id', 'job', 'candidate_email', 'saved_at']
    list_filter = ['saved_at', 'job__category']
    search_fields = ['candidate_email', 'job__title']
    readonly_fields = ['saved_at']
    fieldsets = (
        ('Saved Job', {
            'fields': ('job', 'candidate_email')
        }),
        ('Timestamp', {
            'fields': ('saved_at',),
            'classes': ('collapse',)
        }),
    )

