# Generated by Django 5.0.6 on 2024-06-04 16:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service', '0006_alter_lesson_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lesson',
            name='description',
            field=models.TextField(max_length=1000),
        ),
    ]
