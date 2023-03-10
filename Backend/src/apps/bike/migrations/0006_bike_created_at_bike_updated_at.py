# Generated by Django 4.1.5 on 2023-01-26 19:03

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('bike', '0005_remove_bike_created_at_remove_bike_updated_at'),
    ]

    operations = [
        migrations.AddField(
            model_name='bike',
            name='created_at',
            field=models.DateTimeField(default=django.utils.timezone.now, editable=False),
        ),
        migrations.AddField(
            model_name='bike',
            name='updated_at',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
