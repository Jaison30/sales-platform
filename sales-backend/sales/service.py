from django.db import transaction
from rest_framework.exceptions import ValidationError, NotFound

from .models import *


class SalesService:

    # -----------------------------------------
    # DROPDOWNS
    # -----------------------------------------

    def get_users(self):
        return UsersMst.objects.all()

    def get_countries(self):
        return CountryMst.objects.all()

    def get_products(self):
        return ProductMst.objects.all()

    def get_cities_by_country(self, country_id):
        if not country_id:
            raise ValidationError("country_id is required")

        return CityMst.objects.filter(country_id=country_id)

    # -----------------------------------------
    # SALES CRUD
    # -----------------------------------------

    @transaction.atomic
    def create_sales(self, validated_data):
        details_data = validated_data.pop("details", None)

        if not details_data:
            raise ValidationError("Sales details are required")

        master = SalesMaster.objects.create(**validated_data)

        SalesDetails.objects.bulk_create([
            SalesDetails(
                sales_master=master,
                country=detail["country"],
                city=detail["city"],
                product=detail["product"],
                qty_sold=detail["qty_sold"],
                amount=detail["amount"],
            )
            for detail in details_data
        ])

        return master

    def get_sales_list_by_user(self, user_id):

        if user_id is None:
            raise ValidationError("User id is required")

        queryset = SalesMaster.objects.filter(user_id=user_id).order_by("-created_on")

        return queryset

    def list_sales(self):
        return SalesMaster.objects.prefetch_related("details", "user").all()

    
