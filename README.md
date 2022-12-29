# User Profile API

## Configuración

Primero debemos crear un archivo en la raiz proyecto con el nombre `.env` con el siguiente contenido
```
NODE_PORT=8080
NODE_ENV=local
TIPO_PERSISTENCIA="mongodb"
EMAIL_HOST="ethereal.email"
EMAIL_PASS="passswor ethereal"
ETHEREAL_HOST="host ethereal"
TWILIO_AUTH_TOKEN="token TWILIO"
TWILIO_ACCOUNT_SID="ACCOUNT TWILIO"
CELPHONE="TELEFONO DE ENVIO"
```
Acá estamos configurando una variable de entorno para nuestro proyecto, en este caso el puerto que usará el servidor.
Configurar Config
```
MONGO_URL: {
      URI: 'URL'
    }}
```
## Ejecutar en producción


```sh
npm start
```

## Ejecutar en desarrollo con NODEMON


```sh
npm run dev:wait
```
Se encuentra archivo para ejecucion en POSTMAN.

## Variable administrador
Para las funciones que solo estan diposnibles para administradores (de productos) posee variable que por su valor true permite ingresar al procesamiento de la solicitud. se debe agregar en la URL ```/true``` en caso de ```/false``` se marca el error de Ruta. La variable no es booleana dado que la misma se obtendra en el Frontend una vez accedito a la opcion administrador. en los proximos dias se entregara la app Frontend.
