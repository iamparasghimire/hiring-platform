from django.db import migrations, models
import django.core.validators


class Migration(migrations.Migration):

    dependencies = [
        ('jobs_api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='jobcategory',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='jobcategory',
            name='icon',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='jobcategory',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.AlterField(
            model_name='job',
            name='description',
            field=models.TextField(),
        ),
        migrations.AddField(
            model_name='job',
            name='requirements',
            field=models.TextField(default=''),
        ),
        migrations.AddField(
            model_name='job',
            name='salary',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='job',
            name='job_type',
            field=models.CharField(
                choices=[('Full-time', 'Full-time'), ('Part-time', 'Part-time'), ('Contract', 'Contract')],
                default='Full-time',
                max_length=50
            ),
        ),
        migrations.AddField(
            model_name='job',
            name='status',
            field=models.CharField(
                choices=[('open', 'Open'), ('closed', 'Closed'), ('on_hold', 'On Hold')],
                default='open',
                max_length=20
            ),
        ),
        migrations.AddField(
            model_name='job',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AddField(
            model_name='application',
            name='candidate_message',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='application',
            name='status',
            field=models.CharField(
                choices=[('submitted', 'Submitted'), ('reviewing', 'Reviewing'), ('interview', 'Interview'), ('rejected', 'Rejected'), ('accepted', 'Accepted')],
                default='submitted',
                max_length=20
            ),
        ),
        migrations.AddField(
            model_name='application',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='application',
            name='cv',
            field=models.FileField(
                upload_to='cvs/%Y/%m/%d/',
                validators=[django.core.validators.FileExtensionValidator(allowed_extensions=['pdf', 'doc', 'docx', 'txt'])]
            ),
        ),
        migrations.AlterUniqueTogether(
            name='application',
            unique_together={('job', 'candidate_email')},
        ),
        migrations.AlterModelOptions(
            name='jobcategory',
            options={'ordering': ['name'], 'verbose_name_plural': 'Job Categories'},
        ),
        migrations.AlterModelOptions(
            name='job',
            options={'ordering': ['-created_at'], 'verbose_name_plural': 'Jobs'},
        ),
        migrations.AlterModelOptions(
            name='application',
            options={'ordering': ['-submitted_at'], 'verbose_name_plural': 'Applications'},
        ),
    ]
