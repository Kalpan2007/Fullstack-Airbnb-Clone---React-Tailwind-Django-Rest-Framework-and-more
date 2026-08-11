from django.contrib import admin
from .models import Property, Reservation


@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = ('title', 'price_per_night', 'bedrooms', 'bathrooms', 'guests', 'country', 'category', 'landlord', 'created_at')
    list_filter = ('category', 'country')
    search_fields = ('title', 'description', 'country')
    readonly_fields = ('created_at',)


@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):
    list_display = ('property', 'start_date', 'end_date', 'number_of_nights', 'guests', 'total_price', 'created_by', 'created_at')
    list_filter = ('start_date', 'end_date')
    search_fields = ('property__title', 'created_by__email')
    readonly_fields = ('created_at',)
