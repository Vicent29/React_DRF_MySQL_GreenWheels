# Generated by Django 4.1.5 on 2023-02-13 18:06

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('slot', '0005_slot_created_at_slot_updated_at'),
        ('user', '0003_alter_user_password'),
    ]

    operations = [
        migrations.CreateModel(
            name='IncidentSlot',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, editable=False)),
                ('updated_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('desc', models.CharField(blank=True, default='', max_length=200)),
                ('slot', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='slot.slot')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='user.user')),
            ],
            options={
                'verbose_name_plural': 'ISlots',
            },
        ),
        migrations.CreateModel(
            name='IncidentOther',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, editable=False)),
                ('updated_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('location', models.CharField(blank=True, default='', max_length=100)),
                ('desc', models.CharField(blank=True, default='', max_length=200)),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='user.user')),
            ],
            options={
                'verbose_name_plural': 'IOthers',
            },
        ),
        migrations.CreateModel(
            name='IncidentBike',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, editable=False)),
                ('updated_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('desc', models.CharField(blank=True, default='', max_length=200)),
                ('bike', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='slot.slot')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='user.user')),
            ],
            options={
                'verbose_name_plural': 'IBikes',
            },
        ),
    ]
