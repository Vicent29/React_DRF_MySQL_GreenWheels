# Generated by Django 4.1.5 on 2023-01-30 16:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rent', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rent',
            name='duration_rent',
            field=models.DurationField(null=True),
        ),
    ]
