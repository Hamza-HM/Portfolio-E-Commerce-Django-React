from django_countries import countries
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.views import APIView



class ItemView(ListAPIView, RetrieveAPIView):
