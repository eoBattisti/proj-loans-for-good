# Generated by Django 4.0.3 on 2023-08-31 01:15

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Loan',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Created at')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='Updated at')),
                ('client_name', models.CharField(max_length=255, verbose_name='Client Name')),
                ('client_document', models.CharField(max_length=255, verbose_name='Client Document')),
                ('status', models.PositiveSmallIntegerField(blank=True, choices=[(1, 'Approved'), (2, 'Denied'), (3, 'Under Review'), (4, 'Waiting Process')], null=True, verbose_name='Status')),
                ('data', models.JSONField(blank=True, null=True, verbose_name='Data')),
            ],
            options={
                'verbose_name': 'Loan',
                'verbose_name_plural': 'Loans',
            },
        ),
        migrations.CreateModel(
            name='LoanProcessorApi',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Created at')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='Updated at')),
                ('url', models.CharField(max_length=255, verbose_name='URL')),
                ('username', models.CharField(blank=True, max_length=255, null=True, verbose_name='Username')),
                ('password', models.CharField(blank=True, max_length=255, null=True, verbose_name='Password')),
                ('scheme', models.CharField(default='http', max_length=255, verbose_name='Scheme')),
            ],
            options={
                'verbose_name': 'Loan Processor',
                'verbose_name_plural': 'Loan Processors',
            },
        ),
        migrations.CreateModel(
            name='LoanForm',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Created at')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='Updated at')),
                ('title', models.CharField(max_length=255, verbose_name='Title')),
                ('fields', models.ManyToManyField(related_name='loan_forms', to='core.customfield', verbose_name='Fields')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]