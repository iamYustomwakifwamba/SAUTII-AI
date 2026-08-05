from django.urls import path
from .views import CreateJingleView, RecentJinglesView, JingleDetailView, AddJingleMessageView

urlpatterns = [
    path("create/", CreateJingleView.as_view(), name="create-jingle"),
    path("recent/", RecentJinglesView.as_view(), name="recent-jingles"),
    path("<int:jingle_id>/", JingleDetailView.as_view(), name="jingle-detail"),
    path("<int:jingle_id>/message/", AddJingleMessageView.as_view(), name="add-message")
]
