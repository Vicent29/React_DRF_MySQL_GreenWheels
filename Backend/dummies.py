import django
import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'src.settings')
django.setup()
from src.apps.station.serializers import StationSerializer
from src.apps.slot.serializers import SlotSerializer
from src.apps.bike.serializers import BikeSerializer
from src.apps.user.serializers import UserSerializer, ProfileSerializer
from src.apps.user.models import User

# Const Stations
stations_name = ['Sant Antoni', 'Mestalla', 'GV de les Germanies', 'Campanar', 'Pont de les arts', 'La petxina', 'Reina Sofia Palace' ]
stations_long= [-0.3683061784538779, -0.3574377740980026, -0.37789696944614093, -0.4016102272319131, -0.38317146191394613, -0.4051409914447106, -0.355896609189557]
stations_lat = [39.48787683924212, 39.47340554036913, 39.462941818658436, 39.483480002708745, 39.48033947524959, 39.47294026796396, 39.45675013920493 ]
stations_img = ['https://i.postimg.cc/Wbwx9GKx/Captura-de-pantalla-2023-01-31-172335.png', 'https://i.postimg.cc/Wbwx9GKx/Captura-de-pantalla-2023-01-31-172335.png', 'https://i.postimg.cc/m2dWL3wC/Captura-de-pantalla-2023-01-31-172701.png', 'https://i.postimg.cc/269TG5Lc/Station-4.png', 'https://i.postimg.cc/4yCy2bsS/Captura-de-pantalla-2023-02-03-171211.png', 'https://i.postimg.cc/P5D6BdWV/Captura-de-pantalla-2023-02-03-171453.png', 'https://i.postimg.cc/RFjwMFzX/Captura-de-pantalla-2023-02-22-173501.png']

# Const Bikes
bike_imgs = ['https://www.diariodenavarra.es/uploads/2022/01/11/61dd81436b264.jpeg', 'https://img.freepik.com/fotos-premium/alquiler-bicicletas-ciudad-almaty-kazajstan_154092-10839.jpg', 'https://www.atlantico.net/media/atlantico/images/2022/04/21/2022042122385896535.jpg', 'https://img77.uenicdn.com/image/upload/v1542049007/category/shutterstock_1143871460.jpg', 'https://www.emesa-m30.es/wp-content/uploads/2020/08/1-estaciones-bici-mad.jpg', 'https://thumbs.dreamstime.com/b/fila-de-las-bicicletas-para-el-alquiler-21045173.jpg', 'https://images.immediate.co.uk/production/volatile/sites/21/2019/03/newyork_citybike_hire_bikes-1497347246680-1qog3vbc3t2zq-95645ec.jpg?quality=90&resize=960%2C540']

# Const Users
users_first_name = ['Client', 'Admin', 'Santi', 'Vicent']
users_last_name = ['', '', 'Martinez Albert', 'Esteve Ferre']
users_email = ['client@gmail.com', 'admin@gmail.com', 'santi@gmail.com', 'vicent@gmail.com']
users_password_one = ['1234', '1234', '1234', '1234']
users_type = ['client', 'admin', 'client', 'client']
users_avatar = ['https://i.postimg.cc/T3g6d9nk/image.png', 'https://i.postimg.cc/TYGdKBYz/admin.png', 'https://i.postimg.cc/4Nc0VCjD/image.jpg', 'https://i.postimg.cc/V6gn0WM2/myAvatar.png']


def create_stations(n_stations, n_slot):
    for i in range(n_stations):
        station = {
            'name': stations_name[i],
            'long': stations_long[i],
            'lat': stations_lat[i],
            'img': stations_img[i]
        }
        serializer_station = StationSerializer(data=station)
        if serializer_station.is_valid(raise_exception=True):
            current_station = serializer_station.save()
        for j in range(n_slot):
            slot_serializer = SlotSerializer(data={'station':current_station.id})
            if (slot_serializer.is_valid(raise_exception=True)):
                current_slot=slot_serializer.save()
            if current_slot:
                if j % 2 == 0:
                    bike_serializer = BikeSerializer(data={'slot':current_slot.id, 'img_bike':bike_imgs[i] })
                    if (bike_serializer.is_valid(raise_exception=True)):
                        bike_serializer.save()


def create_users():
    for i in range( len(users_first_name)):
        user = {
            'first_name' : users_first_name[i],
            'last_name' : users_last_name[i],
            'email' : users_email[i],
            'password' : users_password_one[i],
            'type' : users_type[i]
        }
        user_serializer = UserSerializer(data=user)
        if (user_serializer.is_valid(raise_exception=True)):
           user_ok = User.objects.create_user(users_first_name[i], users_last_name[i], users_email[i], users_password_one[i], users_type[i])
           if user_ok:
            profile_serializer = ProfileSerializer(data={'user': user_ok.id, 'avatar': users_avatar[i]})
            if (profile_serializer.is_valid(raise_exception=True)):
                profile_serializer.save()


if __name__ == '__main__':
    create_stations(6, 10)
    create_users()
    print('Dummies created successfully')