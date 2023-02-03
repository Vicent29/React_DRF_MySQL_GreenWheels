# Generated by Django 4.1.5 on 2023-01-26 19:02

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('station', '0004_remove_station_created_at_remove_station_updated_at'),
    ]

    operations = [
        migrations.AddField(
            model_name='station',
            name='created_at',
            field=models.DateTimeField(default=django.utils.timezone.now, editable=False),
        ),
        migrations.AddField(
            model_name='station',
            name='updated_at',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]