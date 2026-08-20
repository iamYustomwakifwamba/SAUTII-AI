from django.urls import path
from .admin_views import AdminRegisterView, AdminLoginView, AdminCustomerListView, AdminProfileView, LogoutView


urlpatterns = [
    path('register/', AdminRegisterView.as_view(), name="admin-register"),
    path('login/', AdminLoginView.as_view(), name="admin-login"),
    path('customers/', AdminCustomerListView.as_view(), name="admin-customers"),
    path('profile/', AdminProfileView.as_view(), name="admin-profile"),
    path('logout/', LogoutView.as_view(), name="admin-logout")
]