# 🚲 GreenWheels

## Indice:

1. ¿Que es GreenWheels?
2. Tecnologias implementadas
3. Desarrollo de los modulos

# 🔹 GreenWheels:  

Bienvenidos a GreenWheels, es un proyecto desarrollado y diseñado por [`Vicent Esteve`](https://github.com/Vicent29) y [`Santi Martinez`](https://github.com/santimaal). Fue creado para cubrir las necesidades de rentas de bicis. Por una parte, los usuarios tendrán la posibilidad de visualizar donde estan las estaciones ya que en la misma página principal tenemos un mapa, también podemos realizar rentas sobre una bici situada en un slot de una estación. Por otra parte, hemos implementado un panel de Administrador que se encarga de gestionar las incidencias, los usuarios, los slots, las estaciones y las bicis. Además de muchas mejoras, por ejemplo podrás recibir notificaciones por Telegram sobre las incidencias que has enviado e informacion sobre problemas u otras cosas de la applicación/estaciones...

# 🔹 Tecnologías:

<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"
                 alt="React" />
<img src="https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=green"
                alt="Django" />

## 🔸 Backend

- ### [Django Rest FW](https://www.django-rest-framework.org) 

  - Migrations
  - Dummies
  - Models
  - Views
  - Serializers
  - Mysql
    - Relationships
    - Schema
  - Middleware_auth
    - Header
    - Token JWT

## 🔸 Frontend

- ### [React 18](https://es.reactjs.org)
  
  - Reactive Forms
    - react-hook-form
  - Lazy load
  - Guards
  - Service with axios
  - Authentication JWT
  - Context
  - Hooks
  - Custom infinity scroll
  - Librerias:
    - Bootstrap
    - Tailwind
    - Toaster
    - FontAwesome
    - Mapbox-gl
    

## 🔸 Base de datos:

  - [MySQL](https://www.mysql.com/)

# 🔹 Desarrollo de los modulos:  

##  📌  Home
  - Es la página principal, a primera vista podemos ver un mapa con todas las estaciones marcadas y un about us que explica nuestra empresa, al seleccionar un marker del mapa mostrado [Mapbox](https://www.mapbox.com) podemos ver las bicis disponibles en esa misma estación
##  📝  Rents
  - Es la vista que al dar click sobre el marker en el mapa nos muestra las bicis disponibles en esa estación. Al darle click a una de las bicis disponibles, nos saldra la opción de poder rentarla (Cabe recalcar, que no puedes rentar dos bicis a la vez).
##  🔑   Login/Register
- Son la views que el usuario tendrá la opción de registrarse y loguearse, hemos utilizado formularios de [Boostrap](https://getbootstrap.com), [Tailwind](https://tailwindcss.com) y  [`react-hook-form`](https://react-hook-form.com) para controlar que se cumplan los requerimientos en ambas views.
## 👨🏼‍🦱  Profile
-  Encontraremos todos los datos del usuario, tendrá la opción de modificarlos. Por otra parte, hemos añadido una funcionalidad para que recibas notificaciones por [`Telegram`](https://core.telegram.org/bots/api) para poder recibir informacion sobre las incidencias realizadas e informacion externa sobre nuestro producto. Ademas, podras ver un historial de tus rentas de mas nuevas a mas antiguas y podrás cerrar una renta de una bici podiendo seleccionar cualquiera de los slots libres.
- Por la parte del administrador, podras ver todas las incidencias realizadas por el usuario y que no tienen aun una respuesta. Ese mismo administrador, puede responder una incidencia que le generara una notificación al usuario y si el usuario tiene el Telegram vinculado, también recibira la notificación

## 📩  Notifications
- En header tendremos una opción que se encargará de avisarte de cuándo tienes alguna notificación sobre las reservas y tienes un desplegable en el que visualizar las notificaciones una vez entres.

## 💭  Announce
- Es la vista que solo puede ver el usuario administrador y que realiza una notificacion mediante Telegram a todos los usuarios con el chat vinculado

## 📎 Dashboard Admin
- En la view de Dashboard podremos ver un registro de (Bicis / Slots / Estaciones / Usuarios) en los cuales el administrador podrá modificar, crear y borrar según le resulte necesario.
