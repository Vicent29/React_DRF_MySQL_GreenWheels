# Generated by Django 4.1.5 on 2023-02-14 17:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0004_profile_user'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Profile_User',
            new_name='ProfileUsr',
        ),
    ]