from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    """
    Custom User model for Duduk project.
    Inherits from AbstractUser to allow future extension.
    """
    pass
