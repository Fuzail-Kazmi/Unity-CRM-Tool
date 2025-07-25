# Generated by Django 5.2.1 on 2025-07-24 11:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('data', '0014_customerdata_created_emailmodel'),
    ]

    operations = [
        migrations.AddField(
            model_name='emailmodel',
            name='sent_from',
            field=models.EmailField(blank=True, max_length=254, null=True),
        ),
        migrations.AddField(
            model_name='emailmodel',
            name='sent_to',
            field=models.EmailField(default='', max_length=254),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='emailmodel',
            name='subject',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AlterField(
            model_name='emailmodel',
            name='message',
            field=models.TextField(),
        ),
    ]
