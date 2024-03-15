from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission

# Create your models here.


class CustomUser(AbstractUser):
    groups = models.ManyToManyField(
        Group,
        verbose_name=('groups',),
        blank=True,
        related_name='custom_user_groups',
        related_query_name='group',
    )

    permissions = models.ManyToManyField(
        Permission,
        verbose_name=('permissions',),
        blank=True,
        related_name='custom_user_permissions',
        related_query_name='user_permission'
    )
