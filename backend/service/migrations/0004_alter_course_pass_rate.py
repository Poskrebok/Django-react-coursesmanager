# Generated by Django 5.0.6 on 2024-06-02 19:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service', '0003_results'),
    ]

    operations = [
        migrations.AlterField(
            model_name='course',
            name='pass_rate',
            field=models.FloatField(default=0),
        ),
    ]
