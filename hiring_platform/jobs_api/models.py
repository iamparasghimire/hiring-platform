from django.db import models
from django.core.validators import FileExtensionValidator
from django.contrib.auth.models import User

class Company(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='company', null=True, blank=True)
    name = models.CharField(max_length=200, unique=True)
    description = models.TextField(blank=True, null=True)
    website = models.URLField(blank=True, null=True)
    logo = models.ImageField(upload_to='company_logos/', blank=True, null=True)
    location = models.CharField(max_length=200)
    industry = models.CharField(max_length=100, blank=True, null=True)
    employee_count = models.CharField(max_length=50, blank=True, null=True)
    founded_year = models.IntegerField(blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    email = models.EmailField()
    verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = "Companies"

    def __str__(self):
        return self.name

    @property
    def jobs_count(self):
        return self.jobs.count()

    @property
    def active_jobs(self):
        return self.jobs.filter(status='open').count()


class JobCategory(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True, null=True)
    icon = models.CharField(max_length=50, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['name']
        verbose_name_plural = "Job Categories"

    def __str__(self):
        return self.name


class Job(models.Model):
    STATUS_CHOICES = [
        ('open', 'Open'),
        ('closed', 'Closed'),
        ('on_hold', 'On Hold'),
    ]

    JOB_TYPE_CHOICES = [
        ('Full-time', 'Full-time'),
        ('Part-time', 'Part-time'),
        ('Contract', 'Contract'),
        ('Freelance', 'Freelance'),
        ('Internship', 'Internship'),
    ]

    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='jobs')
    title = models.CharField(max_length=200)
    location = models.CharField(max_length=150)
    description = models.TextField()
    requirements = models.TextField(default='')
    salary_min = models.IntegerField(blank=True, null=True)
    salary_max = models.IntegerField(blank=True, null=True)
    salary_currency = models.CharField(max_length=10, default='USD')
    job_type = models.CharField(max_length=50, choices=JOB_TYPE_CHOICES, default='Full-time')
    experience_level = models.CharField(max_length=50, choices=[('Entry', 'Entry Level'), ('Mid', 'Mid Level'), ('Senior', 'Senior')], default='Entry')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='open')
    category = models.ForeignKey(JobCategory, related_name='jobs', on_delete=models.SET_NULL, null=True)
    skills_required = models.TextField(blank=True, help_text='Comma-separated skills')
    benefits = models.TextField(blank=True, null=True)
    applications_count = models.IntegerField(default=0)
    views_count = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = "Jobs"

    def __str__(self):
        return f"{self.title} at {self.company.name}"


class Application(models.Model):
    STATUS_CHOICES = [
        ('submitted', 'Submitted'),
        ('reviewing', 'Reviewing'),
        ('interview', 'Interview'),
        ('rejected', 'Rejected'),
        ('accepted', 'Accepted'),
    ]

    job = models.ForeignKey(Job, related_name='applications', on_delete=models.CASCADE)
    candidate_name = models.CharField(max_length=150)
    candidate_email = models.EmailField()
    phone_number = models.CharField(max_length=20)
    candidate_message = models.TextField(blank=True, null=True)
    
    # CV file with validation
    cv = models.FileField(
        upload_to='cvs/%Y/%m/%d/',
        validators=[FileExtensionValidator(allowed_extensions=['pdf', 'doc', 'docx', 'txt'])]
    )
    
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='submitted')
    submitted_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    rating = models.IntegerField(blank=True, null=True, choices=[(i, i) for i in range(1, 6)])
    notes = models.TextField(blank=True, null=True)

    class Meta:
        ordering = ['-submitted_at']
        verbose_name_plural = "Applications"
        unique_together = ('job', 'candidate_email')

    def __str__(self):
        return f"Application for {self.job.title} by {self.candidate_name}"


class SavedJob(models.Model):
    """Allows candidates to save jobs for later"""
    candidate_email = models.EmailField()
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name='saved_by')
    saved_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('candidate_email', 'job')

    def __str__(self):
        return f"{self.candidate_email} saved {self.job.title}"


class Interview(models.Model):
    INTERVIEW_TYPE_CHOICES = [
        ('phone', 'Phone'),
        ('video', 'Video Call'),
        ('in_person', 'In-person'),
        ('assignment', 'Assignment'),
    ]

    STATUS_CHOICES = [
        ('scheduled', 'Scheduled'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
        ('rescheduled', 'Rescheduled'),
    ]

    application = models.ForeignKey(Application, on_delete=models.CASCADE, related_name='interviews')
    interview_type = models.CharField(max_length=20, choices=INTERVIEW_TYPE_CHOICES)
    scheduled_at = models.DateTimeField()
    duration_minutes = models.IntegerField(default=30)
    interviewer_name = models.CharField(max_length=150)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='scheduled')
    notes = models.TextField(blank=True, null=True)
    rating = models.IntegerField(blank=True, null=True, choices=[(i, i) for i in range(1, 11)])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-scheduled_at']

    def __str__(self):
        return f"Interview for {self.application} on {self.scheduled_at}"