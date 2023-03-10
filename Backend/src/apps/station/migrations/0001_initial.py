# Generated by Django 4.1.5 on 2023-01-25 20:48

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Station',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('slug', models.SlugField(editable=False, max_length=100, unique=True)),
                ('name', models.CharField(default='', max_length=255, unique=True)),
                ('long', models.IntegerField(blank=True, default='10')),
                ('lat', models.IntegerField(blank=True, default='11')),
                ('img', models.CharField(blank=True, default='img.png', max_length=255)),
            ],
            options={
                'verbose_name_plural': 'Stations',
            },
        ),
    ]
