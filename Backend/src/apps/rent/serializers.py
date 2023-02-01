from rest_framework import serializers
from django.core.serializers import serialize
from src.apps.rent.models import Rent
from src.apps.bike.models import Bike
import datetime
from datetime import timedelta
import json


class RentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Rent
        fields = ('id', 'bike', 'user', 'data_ini','data_fin', 'cost')

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

    def close_rent(context):
        bike = Bike.objects.get(id=context['id_bike'])
        fields_bike = RentSerializer.to_cost_bike(bike)

        id_rent = context['id_rent']
        rent = Rent.objects.get(id=id_rent)
        fields_rent = RentSerializer.to_rents(rent)
        if not fields_rent['id']:
            raise serializers.ValidationError(
                'Rent is missing '
            )
        else:
            date = datetime.datetime.now()
            data_ini = datetime.datetime.strptime(fields_rent['data_ini'].strftime("%Y-%m-%d %H:%M:%S"), "%Y-%m-%d %H:%M:%S")
            data_fin = datetime.datetime.strptime(date.strftime("%Y-%m-%d %H:%M:%S"), "%Y-%m-%d %H:%M:%S")

            time_rent = data_fin - data_ini
            time_rent_str = str(time_rent)

            if len(time_rent_str.split(" ")) == 1:
                Day= 0
                Hour = time_rent_str.split(":")[0]
                Minutes = time_rent_str.split(":")[1]
            else:
                Day = time_rent_str.split(" ")[0]
                Hour = time_rent_str.split(" ")[2].split(":")[0]
                Minutes = time_rent_str.split(" ")[2].split(":")[1]

            calculate_cost= round(int(Day)*1440 + int(Hour)*60 +int(Minutes)*fields_bike['pfm'],2)
            
            Rent.objects.filter(id=context['id_rent']).update(
            data_fin = date,
            cost = calculate_cost,
            )

            rent = Rent.objects.get(id=id_rent)
            return RentSerializer.to_rents(rent)
