# Generated by Django 4.2.3 on 2023-07-31 00:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mail', '0002_alter_email_timestamp'),
    ]

    operations = [
        migrations.AlterField(
            model_name='email',
            name='timestamp',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
