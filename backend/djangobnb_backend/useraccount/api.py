from django.http import JsonResponse

from rest_framework.decorators import api_view, authentication_classes, permission_classes

from .models import User
from .serializers import UserDetailSerializer

from property.models import Property
from property.serializers import ReservationsListSerializer, PropertiesListSerializer


@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def landlord_detail(request, pk):
    user = User.objects.get(pk=pk)

    serializer = UserDetailSerializer(user, many=False)

    return JsonResponse(serializer.data, safe=False)


@api_view(['GET'])
def reservations_list(request):
    reservations = request.user.reservations.all()
    
    serializer = ReservationsListSerializer(reservations, many=True)
    return JsonResponse(serializer.data, safe=False)


@api_view(['GET'])
def myproperties_list(request):
    properties = Property.objects.filter(landlord=request.user)
    serializer = PropertiesListSerializer(properties, many=True)
    return JsonResponse(serializer.data, safe=False)


@api_view(['GET'])
def myfavorites_list(request):
    properties = Property.objects.filter(favorited=request.user)
    favorites = [p.id for p in properties]
    serializer = PropertiesListSerializer(properties, many=True)
    return JsonResponse({'data': serializer.data, 'favorites': favorites})
