from rest_framework import serializers
from .models import *


class SalesDetailsSerializer(serializers.ModelSerializer):

    country_name = serializers.CharField(source="country.country_name", read_only=True)
    city_name = serializers.CharField(source="city.city_name", read_only=True)
    product_name = serializers.CharField(source="product.product_name", read_only=True)

    class Meta:
        model = SalesDetails
        fields = [
            "country",
            "city",
            "product",
            "qty_sold",
            "amount",
            "country_name",
            "city_name",
            "product_name",
        ]

    def validate_qty_sold(self, value):
        if value <= 0:
            raise serializers.ValidationError("Qty Sold must be > 0")
        return value

    def validate_amount(self, value):
        if value <= 0:
            raise serializers.ValidationError("Amount must be > 0")
        return value


class SalesMasterSerializer(serializers.ModelSerializer):
    details = SalesDetailsSerializer(many=True)
    user_name = serializers.CharField(source="user.user_name", read_only=True)


    class Meta:
        model = SalesMaster
        fields = [
            "sales_master_id",
            "sales_date",
            "user",
            "user_name",
            "notes",
            "created_on",
            "details",
        ]
