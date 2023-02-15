from rest_framework import serializers
from django.core.serializers import serialize
from src.apps.rent.models import Rent
from src.apps.bike.models import Bike
from src.apps.slot.models import Slot
import datetime
from datetime import timedelta
from rest_framework.response import Response
from django.http.response import JsonResponse
import json


class RentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Rent
        fields = ('id', 'bike', 'user', 'data_ini', 'data_fin', 'cost')

    def to_rents(instance):
        return {
            'id': instance.id,
            'bike': instance.bike_id,
            'user': instance.user_id,
            'data_ini': instance.data_ini,
            'data_fin': instance.data_fin,
            'cost': instance.cost,
        }

    def to_cost_bike(instance):
        return {
            'id': instance.id,
            'pfm': instance.pfm,
        }

    def to_create_rent(instance):
        return {
            'bike': instance['bike_id'],
            'user': instance['user_id'],
        }

    def create_rent(context, request):

        last_rent = Rent.objects.filter(
            user=request.user.id).order_by("data_fin").last()

        if last_rent is not None and last_rent.cost == 0:
            raise serializers.ValidationError(
                'You cant do a rent yet'
            )

        try:
            bike = Bike.objects.get(id=context['bike'])
        except Bike.DoesNotExist:
            raise serializers.ValidationError(
                'Bike doesnt exist'
            )

        context['user'] = request.user.id
        rent = RentSerializer(data=context)
        if (rent.is_valid(raise_exception=True)):
            rent.save()

        bike.slot = None
        bike.save()
        return rent.data

    def close_rent(context):
        bike = Bike.objects.get(id=context['id_bike'])
        bike.slot = Slot(context['id_slot'])
        fields_bike = RentSerializer.to_cost_bike(bike)
        bike.save()

        id_rent = context['id_rent']
        rent = Rent.objects.get(id=id_rent)
        fields_rent = RentSerializer.to_rents(rent)
        if not fields_rent['id']:
            raise serializers.ValidationError(
                'Rent is missing '
            )
        else:
            date = datetime.datetime.now()
            data_ini = datetime.datetime.strptime(
                fields_rent['data_ini'].strftime("%Y-%m-%d %H:%M:%S"), "%Y-%m-%d %H:%M:%S")
            data_fin = datetime.datetime.strptime(
                date.strftime("%Y-%m-%d %H:%M:%S"), "%Y-%m-%d %H:%M:%S")

            time_rent = data_fin - data_ini
            time_rent_str = str(time_rent)

            if len(time_rent_str.split(" ")) == 1:
                Day = 0
                Hour = time_rent_str.split(":")[0]
                Minutes = time_rent_str.split(":")[1]
            else:
                Day = time_rent_str.split(" ")[0]
                Hour = time_rent_str.split(" ")[2].split(":")[0]
                Minutes = time_rent_str.split(" ")[2].split(":")[1]

            calculate_cost = round(
                int(Day)*1440 + int(Hour)*60 + int(Minutes)*fields_bike['pfm'], 2)
            if calculate_cost == 0:
                calculate_cost = fields_bike['pfm']

            Rent.objects.filter(id=context['id_rent']).update(
                data_fin=date,
                cost=calculate_cost,
            )

            rent = Rent.objects.get(id=id_rent)
            return RentSerializer.to_rents(rent)

    def getRentByUser(request):
        serialized = []
        try:
            rents = Rent.objects.filter(
                user=request.user.id).order_by("-data_fin")
        except Rent.DoesNotExist:
            return serialized

        for rent in rents.iterator():
            fields = RentSerializer.to_rents(rent)
            serialized.append(fields)
        return serialized
