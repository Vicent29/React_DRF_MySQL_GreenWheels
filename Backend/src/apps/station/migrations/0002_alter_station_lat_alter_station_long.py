# Generated by Django 4.1.5 on 2023-01-26 17:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('station', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='station',
            name='lat',
            field=models.FloatField(blank=True, default='38.821635'),
        ),
        migrations.AlterField(
            model_name='station',
            name='long',
            field=models.FloatField(blank=True, default='-0.608426'),
        ),
    ]
