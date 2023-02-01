# Generated by Django 4.1.5 on 2023-01-30 14:32

import datetime
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('bike', '0004_bike_created_at_bike_updated_at'),
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Rent',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, editable=False)),
                ('updated_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('data_ini', models.DateTimeField(default=datetime.datetime.now, editable=False)),
                ('data_fin', models.DateTimeField(default=datetime.datetime.now)),
                ('duration_rent', models.DurationField()),
                ('bike', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bike.bike')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='user.user')),
            ],
            options={
                'verbose_name': 'rent',
                'verbose_name_plural': 'rents',
            },
        ),
    ]
