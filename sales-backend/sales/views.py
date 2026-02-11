from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import ValidationError, NotFound

from .serializers import SalesMasterSerializer
from .service import SalesService

sales_service = SalesService()


# -----------------------------------------
# SALES LIST + CREATE
# -----------------------------------------

class SalesListCreateAPIView(APIView):

    def get(self, request):
        try:
            user_id = request.GET.get("user")

            # treat empty string as None
            if not user_id:
                user_id = None
            
            # if user selected → filter
            if user_id:
                queryset = sales_service.get_sales_list_by_user(user_id)
            else:
                # no user filter → return all
                queryset = sales_service.list_sales()

            serializer = SalesMasterSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except ValidationError as e:
            return Response(
                {"error": e.detail},
                status=status.HTTP_400_BAD_REQUEST
            )

        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def post(self, request):
        try:
            serializer = SalesMasterSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            master = sales_service.create_sales(serializer.validated_data)

            return Response(
                SalesMasterSerializer(master).data,
                status=status.HTTP_201_CREATED
            )

        except ValidationError as e:
            return Response(
                {"error": e.detail},
                status=status.HTTP_400_BAD_REQUEST
            )

        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class UsersAPIView(APIView):

    def get(self, request):
        try:
            users = sales_service.get_users()
            return Response(list(users.values()), status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class CountryAPIView(APIView):

    def get(self, request):
        try:
            countries = sales_service.get_countries()
            return Response(list(countries.values()), status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class ProductAPIView(APIView):

    def get(self, request):
        try:
            products = sales_service.get_products()
            return Response(list(products.values()), status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class CityByCountryAPIView(APIView):

    def get(self, request, country_id):
        try:
            cities = sales_service.get_cities_by_country(country_id)
            return Response(list(cities.values()), status=status.HTTP_200_OK)

        except ValidationError as e:
            return Response(
                {"error": e.detail},
                status=status.HTTP_400_BAD_REQUEST
            )

        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
