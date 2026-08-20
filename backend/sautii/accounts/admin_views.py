from django.contrib.auth import get_user_model, authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated

User = get_user_model()

class AdminProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        if not user.is_staff or not user.is_superuser:
            return Response(
                {
                    "error": "You are not authorized as an admin"
                },
                status=403
            )

        return Response({
            "id": user.id,
            "email": user.email,
            "firstname": user.firstname,
            "lastname": user.lastname,
            "role": user.role,
        })

class AdminRegisterView(APIView):

    def post(self, request):

        email = request.data.get("email")
        password = request.data.get("password")
        phonenumber = request.data.get("phonenumber")
        firstname = request.data.get("firstname")
        lastname = request.data.get("lastname")
        country = request.data.get("country")

        if not email or not password:
            return Response(
                {
                    "error": "Email and password are required"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        if User.objects.filter(email=email).exists():
            return Response(
                {
                    "error": "Email already exists"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        admin = User.objects.create_superuser(
            email=email,
            password=password,
            phonenumber=phonenumber,
            role="admin",
            firstname=firstname,
            lastname=lastname,
            country=country,
        )

        return Response(
            {
                "message": "Admin registered successfully",
                "data": {
                    "id": admin.id,
                    "email": admin.email,
                    "firstname": admin.firstname,
                    "lastname": admin.lastname,
                    "role": admin.role,
                    "is_staff": admin.is_staff,
                    "is_superuser": admin.is_superuser,
                }
            },
            status=status.HTTP_201_CREATED
        )


class AdminLoginView(APIView):

    def post(self, request):

        email = request.data.get("email")
        password = request.data.get("password")

        if not email or not password:
            return Response(
                {
                    "error": "Email and password are required"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        user = authenticate(
            request,
            email=email,
            password=password
        )

        if not user:
            return Response(
                {
                    "error": "Invalid email or password"
                },
                status=status.HTTP_401_UNAUTHORIZED
            )

        # Hakikisha huyu ni admin
        if not user.is_staff or not user.is_superuser:
            return Response(
                {
                    "error": "You are not authorized as an admin"
                },
                status=status.HTTP_403_FORBIDDEN
            )

        refresh = RefreshToken.for_user(user)

        return Response(
            {
                "message": "Admin login successful",

                "data": {
                    "id": user.id,
                    "email": user.email,
                    "firstname": user.firstname,
                    "lastname": user.lastname,
                    "role": user.role,
                },

                "tokens": {
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                }
            },
            status=status.HTTP_200_OK
        )

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]

            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response(
                {
                    "message": "Logged out successfully"
                },
                status=status.HTTP_200_OK
            )

        except Exception:
            return Response(
                {
                    "error": "Invalid or expired refresh token"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

class AdminCustomerListView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        # Hakikisha anayefanya request ni admin
        if not request.user.is_staff or not request.user.is_superuser:
            return Response(
                {
                    "error": "You are not authorized as an admin"
                },
                status=status.HTTP_403_FORBIDDEN
            )

        customers = User.objects.filter(
            role="user"
        ).order_by("-date_joined")

        data = []

        for customer in customers:
            data.append({
                "id": customer.id,
                "email": customer.email,
                "firstname": customer.firstname,
                "lastname": customer.lastname,
                "phonenumber": customer.phonenumber,
                "country": customer.country,
                "is_active": customer.is_active,
                "date_joined": customer.date_joined,
            })

        return Response(
            {
                "message": "Customers retrieved successfully",
                "count": customers.count(),
                "data": data
            },
            status=status.HTTP_200_OK
        )