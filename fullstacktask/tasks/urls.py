from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView
from .views import (
    LoginView,
    RegisterView,
    TaskListCreateView,
    TaskUpdateDeleteView,
)

urlpatterns = [
    path("auth/login/", LoginView.as_view(), name="login"),
    path("auth/register/", RegisterView.as_view(), name="register"),
    path("tasks/", TaskListCreateView.as_view(), name="tasks"),
    path("tasks/<int:pk>/", TaskUpdateDeleteView.as_view(), name="task-detail"),
]
from django.urls import path



