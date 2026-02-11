from django.contrib import admin

# Register your models here.

from .models import *

admin.site.register(UsersMst)
admin.site.register(CountryMst)
admin.site.register(CityMst)
admin.site.register(ProductMst)
admin.site.register(SalesMaster)
admin.site.register(SalesDetails)


