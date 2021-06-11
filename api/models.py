from django.db import models
from users.models import CustomUser


class Task(models.Model):
    id = models.AutoField(primary_key=True)
    text = models.TextField(verbose_name='Task Text')
    is_complited = models.BooleanField(default=False,
                                       verbose_name='Is Task Complited')
    created_at = models.DateTimeField(
        auto_now_add=True, verbose_name='Date and Time when Task was created')
    created_by = models.ForeignKey(CustomUser,
                                   on_delete=models.CASCADE,
                                   verbose_name='User who created task')

    class Meta:
        ordering = ['-created_at']
