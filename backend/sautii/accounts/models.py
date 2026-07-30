from django.db import models
from django.contrib.auth.models import BaseUserManager, PermissionsMixin, AbstractBaseUser


class CustomUserManager(BaseUserManager):

    def _create_user(self, email, password=None, phonenumber=None, firstname=None, lastname=None, country=None, role=None, **extra_fields):

        if not email:
            return ValueError("Email must be set")

        self.normalize_email(email)

        user = self.model(
            email=email,
            phonenumber=phonenumber, 
            firstname=firstname,
            lastname=lastname,
            country=country,
            role=role,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_user(self, email, password=None, phonenumber=None, role='user' , firstname=None, lastname=None, country=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)

        if extra_fields.get('is_staff'):
            raise ValueError("Normal user must not be staff")

        if extra_fields.get('is_superuser'):
            raise ValueError('Normal user can not be superadmin')

        return self._create_user(
            email=email,
            password=password,
            phonenumber=phonenumber,
            role=role,
            firstname=firstname,
            lastname=lastname,
            country=country,
            **extra_fields
        )

    def create_superuser(self, email, password=None, phonenumber=None, role='admin', firstname=None, lastname=None, country=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Admin must be a staff')

        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Admin must be a superuser')

        return self._create_user(
            email=email,
            password=password,
            phonenumber=phonenumber,
            role=role,
            firstname=firstname,
            lastname=lastname,
            country=country,
            **extra_fields
        )

class CustomUser(AbstractBaseUser, PermissionsMixin):

    USER_ROLES_CHOICE = [

        ('admin', 'Admin'),
        ('staff', 'Staff'),
        ('user', 'User'),
    ]

    email = models.EmailField(max_length=100, unique=True, blank=False, null=False)
    phonenumber = models.CharField(max_length=15, unique=True, blank=True, null=True)
    password = models.CharField(max_length=10, null=False, blank=False, unique=False)
    firstname = models.CharField(max_length=20, null=True, blank=True, unique=False)
    lastname = models.CharField(max_length=30, null=True, blank=True, unique=False)
    country = models.CharField(max_length=100, null=True, blank=True, unique=False, default="Tanzania")
    role = models.CharField(max_length=20, null=True, blank=True, unique=False, choices=USER_ROLES_CHOICE, default='user')

    #Extra Fields
    date_joined = models.DateTimeField(auto_now_add=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return f"email {self.email}"


