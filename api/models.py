from django.db import models
from django.contrib.auth.models import User


class Task(models.Model):
    id = models.AutoField(primary_key=True)
    text = models.TextField(verbose_name='Task Text')
    is_complited = models.BooleanField(default=False,
                                       verbose_name='Is Task Complited')
    created_at = models.DateTimeField(
        auto_now_add=True, verbose_name='Date and Time when Task was created')
    created_by = models.ForeignKey(User,
                                   on_delete=models.CASCADE,
                                   verbose_name='User who created task')
