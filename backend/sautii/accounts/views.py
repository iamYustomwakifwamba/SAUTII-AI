from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from .models import CustomUser


class ProfileView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        user = request.user

        return Response({
            "id": user.id,
            "email": user.email,
            "firstname":user.firstname,
            "lastname":user.lastname,
        })


class RegisterView(APIView):

    authentication_classes = []
    permission_classes = [AllowAny]

    def post(self, request):

        print(request.data)
        firstname = request.data.get("firstname")
        lastname = request.data.get("lastname")
        email = request.data.get("email")
        password = request.data.get("password")
        phonenumber = request.data.get("phonenumber")
        country = request.data.get("country")

        if CustomUser.objects.filter(email=email).exists():
            return Response(
                {
                    "error":"Email is alerdy exists"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        if CustomUser.objects.filter(phonenumber=phonenumber).exists():
            return Response(
                {
                    "error":"Phonenumber is alerdy exists"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        user = CustomUser.objects.create_user(
            firstname=firstname,
            lastname=lastname,
            email=email,
            password=password,
            country=country,
            phonenumber=phonenumber,
        )

        return Response(
            {
                "message":"Account created sucessfully"
            },
            status=status.HTTP_201_CREATED
        )