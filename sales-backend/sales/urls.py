from django.urls import path
from .views import (
    SalesListCreateAPIView,
    # SalesRetrieveUpdateDeleteAPIView,
    UsersAPIView,
    CountryAPIView,
    ProductAPIView,
    CityByCountryAPIView
)

urlpatterns = [

    # SALES MASTER
    path('sales/', SalesListCreateAPIView.as_view(), name='sales-list-create'),
    # path('sales/<int:pk>/', SalesRetrieveUpdateDeleteAPIView.as_view(), name='sales-detail'),

    # DROPDOWNS
    path('users/', UsersAPIView.as_view(), name='users'),
    path('countries/', CountryAPIView.as_view(), name='countries'),
    path('products/', ProductAPIView.as_view(), name='products'),
    path('cities/<int:country_id>/', CityByCountryAPIView.as_view(), name='cities'),
]
