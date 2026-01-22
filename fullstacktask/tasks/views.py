from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import generics
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import Task
from .serializers import (
    TaskSerializer,
    RegisterSerializer,
    CustomTokenObtainPairSerializer,
)

# ✅ LOGIN VIEW (YOU DID NOT HAVE THIS)
class LoginView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"message": "User registered successfully"})


class TaskListCreateView(generics.ListCreateAPIView):
    serializer_class = TaskSerializer

    def get_queryset(self):
        queryset = Task.objects.filter(created_by=self.request.user)

        status = self.request.query_params.get("status")
        if status:
            queryset = queryset.filter(status=status)

        return queryset

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)



class TaskUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TaskSerializer

    def get_queryset(self):
        return Task.objects.filter(created_by=self.request.user)
