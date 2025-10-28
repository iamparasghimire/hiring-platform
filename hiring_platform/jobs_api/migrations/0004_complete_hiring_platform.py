# Generated migration for new models

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.core.validators


class Migration(migrations.Migration):

    dependencies = [
        ('jobs_api', '0003_alter_jobcategory_created_at'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Company',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200, unique=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('website', models.URLField(blank=True, null=True)),
                ('logo', models.ImageField(blank=True, null=True, upload_to='company_logos/')),
                ('location', models.CharField(max_length=200)),
                ('industry', models.CharField(blank=True, max_length=100, null=True)),
                ('employee_count', models.CharField(blank=True, max_length=50, null=True)),
                ('founded_year', models.IntegerField(blank=True, null=True)),
                ('phone', models.CharField(blank=True, max_length=20, null=True)),
                ('email', models.EmailField(max_length=254)),
                ('verified', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='company', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name_plural': 'Companies',
                'ordering': ['-created_at'],
            },
        ),
        migrations.AddField(
            model_name='job',
            name='company',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='jobs', to='jobs_api.company'),
            preserve_default=False,
        ),
        migrations.RemoveField(
            model_name='job',
            name='company_name',
        ),
        migrations.AddField(
            model_name='job',
            name='salary_min',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='job',
            name='salary_max',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='job',
            name='salary_currency',
            field=models.CharField(default='USD', max_length=10),
        ),
        migrations.AddField(
            model_name='job',
            name='experience_level',
            field=models.CharField(choices=[('Entry', 'Entry Level'), ('Mid', 'Mid Level'), ('Senior', 'Senior')], default='Entry', max_length=50),
        ),
        migrations.AddField(
            model_name='job',
            name='skills_required',
            field=models.TextField(blank=True, help_text='Comma-separated skills'),
        ),
        migrations.AddField(
            model_name='job',
            name='benefits',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='job',
            name='applications_count',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='job',
            name='views_count',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='application',
            name='rating',
            field=models.IntegerField(blank=True, choices=[(1, 1), (2, 2), (3, 3), (4, 4), (5, 5)], null=True),
        ),
        migrations.AddField(
            model_name='application',
            name='notes',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.CreateModel(
            name='SavedJob',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('candidate_email', models.EmailField(max_length=254)),
                ('saved_at', models.DateTimeField(auto_now_add=True)),
                ('job', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='saved_by', to='jobs_api.job')),
            ],
        ),
        migrations.CreateModel(
            name='Interview',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('interview_type', models.CharField(choices=[('phone', 'Phone'), ('video', 'Video Call'), ('in_person', 'In-person'), ('assignment', 'Assignment')], max_length=20)),
                ('scheduled_at', models.DateTimeField()),
                ('duration_minutes', models.IntegerField(default=30)),
                ('interviewer_name', models.CharField(max_length=150)),
                ('status', models.CharField(choices=[('scheduled', 'Scheduled'), ('completed', 'Completed'), ('cancelled', 'Cancelled'), ('rescheduled', 'Rescheduled')], default='scheduled', max_length=20)),
                ('notes', models.TextField(blank=True, null=True)),
                ('rating', models.IntegerField(blank=True, choices=[(1, 1), (2, 2), (3, 3), (4, 4), (5, 5), (6, 6), (7, 7), (8, 8), (9, 9), (10, 10)], null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('application', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='interviews', to='jobs_api.application')),
            ],
            options={
                'ordering': ['-scheduled_at'],
            },
        ),
        migrations.AlterField(
            model_name='job',
            name='category',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='jobs', to='jobs_api.jobcategory'),
        ),
        migrations.AddConstraint(
            model_name='savedjob',
            constraint=models.UniqueConstraint(fields=('candidate_email', 'job'), name='unique_saved_job'),
        ),
    ]
