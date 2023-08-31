# Generated by Django 4.0.3 on 2023-08-31 01:15

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CustomField',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Created at')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='Updated at')),
                ('name', models.CharField(max_length=255, verbose_name='Name')),
                ('description', models.CharField(max_length=255, verbose_name='Description')),
                ('ftype', models.PositiveSmallIntegerField(choices=[(0, 'Text Type'), (1, 'Number Type'), (2, 'Date Type'), (3, 'Email Type'), (4, 'Phone Type')], verbose_name='Field Type')),
                ('raw_value', models.CharField(blank=True, max_length=255, null=True, verbose_name='Value')),
                ('optional', models.BooleanField(default=False, verbose_name='Optional')),
            ],
            options={
                'verbose_name': 'Custom Field',
                'verbose_name_plural': 'Custom Fields',
            },
        ),
    ]