from django.db import models


class UsersMst(models.Model):
    user_id = models.AutoField(primary_key=True)
    user_name = models.CharField(max_length=150)
    email = models.EmailField(null=True, blank=True)

    class Meta:
        db_table = "Users_mst"

    def __str__(self):
        return f"{self.user_name} ({self.email})" if self.email else self.user_name


class CountryMst(models.Model):
    country_id = models.AutoField(primary_key=True)
    country_name = models.CharField(max_length=150)

    class Meta:
        db_table = "Country_mst"

    def __str__(self):
        return self.country_name


class CityMst(models.Model):
    city_id = models.AutoField(primary_key=True)
    country = models.ForeignKey(CountryMst, on_delete=models.CASCADE)
    city_name = models.CharField(max_length=150)

    class Meta:
        db_table = "City_mst"

    def __str__(self):
        return f"{self.city_name}, {self.country.country_name}"


class ProductMst(models.Model):
    product_id = models.AutoField(primary_key=True)
    product_name = models.CharField(max_length=150)
    unit_price = models.DecimalField(max_digits=18, decimal_places=2)

    class Meta:
        db_table = "Product_mst"

    def __str__(self):
        return f"{self.product_name} - ₹{self.unit_price}"


class SalesMaster(models.Model):
    sales_master_id = models.AutoField(primary_key=True)
    sales_date = models.DateField()
    user = models.ForeignKey(UsersMst, on_delete=models.CASCADE)
    notes = models.CharField(max_length=500, null=True, blank=True)
    created_on = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "SalesMaster"

    def __str__(self):
        return f"Sales #{self.sales_master_id} - {self.user.user_name} - {self.sales_date}"


class SalesDetails(models.Model):
    sales_detail_id = models.AutoField(primary_key=True)
    sales_master = models.ForeignKey(
        SalesMaster, on_delete=models.CASCADE, related_name="details"
    )
    country = models.ForeignKey(CountryMst, on_delete=models.CASCADE)
    city = models.ForeignKey(CityMst, on_delete=models.CASCADE)
    product = models.ForeignKey(ProductMst, on_delete=models.CASCADE)
    qty_sold = models.IntegerField()
    amount = models.DecimalField(max_digits=18, decimal_places=2)

    class Meta:
        db_table = "SalesDetails"

    def __str__(self):
        return (
            f"{self.product.product_name} | "
            f"{self.city.city_name} | "
            f"Qty: {self.qty_sold} | ₹{self.amount}"
        )
