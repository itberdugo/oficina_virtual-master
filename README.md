This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Plataforma Oficina Virtual

Este portal es para gestionar el aceso a los diferentes aseguradores que tenemos en atención primaria, de momento se reciben los usuarios de nueva eps, aliansalud y foneca, se tienen 3 framewokrs/librerias principales de referencia las cuales son:

* [NextUI](https://nextui.org/) que sirve para tener componentes visuales mas amigables y faciles de construir
* [NextAuth](https://next-auth.js.org/) la cual proporciona la gestion de las sessiones, esta se conecta a las bases de datos en mongodb para autenticar al usuario
* [NextJS ](https://nextjs.org/)el framework de infrastructura con el cual esta contruido el portal

la aplicación permite diferenciar a que EPS pertenece el usuario con su registro previo, por ende todas sus visuales son diferentes

## Variables de entorno

* NEXTAUTH_URL = URL de la autenticación de la aplicación
* NEXTAUTH_SECRET = Token para encriptar las cookies y datos de la sessión con nextAuth
* BASE_POBLACIONAL_URI = URL donde se encuentra expuesta la API de la base poblacional
* BASE_POBLACIONAL_AUTH_TOKEN = es el token ya encriptado de usuario y contraseña, brindado por la api de la base poblacional
* BASE_POBLACIONAL_ENCRYPT_KEY = El token publico para encriptar los datos que se comunicaran entre la api de la base poblacional y la aplicacion
* EMAIL_USER = Correo que se usa para validar el MFA
* EMAIL_PASS = Contraseña del correo de Office 365
* MONGO_URI = URL de mongo que contiene la autenticación y la base de datos
* PASSWORD_ENCRYPT_KEY = token para encriptar y desencriptar la contraseña de los usuarios
* ALONE_URL_ALIANSALUD = la URL de produción con la comunicación hacia ALONE
* CLIENT_ID_ALIANSALUD = La ID del cliente que se usa para redirecionar al paciente de Aliansalud desde el portal web de la oficina virtual
* PORT = Puerto por el cual se desplegara a produción la aplicación

## Archivos CERT ALONE

La aplicación esta integrada con ALONE de PANA, ellos proveen un archivo .pem para encriptar la cadena de desarrollo que proveen ellos, de momento solo esta configurado Aliansalud, por lo que, si no esta creada la carpeta crear una que se llame "alone_certs" y agregar el .pem que envia pana con el nombre "Aliansalud.pem"


## Entorno de desarrollo

Para ejecutar el modo desarrollo se debe colocar el gestor que se tenga como por ejemplo bun,npm, pnpm etc, seguido de las palabras dev, el escript esta por defecto con el modo turbo de nextjs que agiliza la compilacion en dicho entorno

```
npm run dev
```

## Entorno de producción

Para pasar la aplicación a produción es necesario ejecutar 3 pasos, los cuales son

### Agregar archivos de SSL

Se debe crear una carpeta dentro de la carpeta src llamada ssl, donde se deben colocar los archivos .key y los archivos .cert que se encuentran en el archivo server.js respectivamente, si se cambia de paradigma, modificar el archivo server.js que contiene la carga de dichos archivos

### Ejecutar el build del proyecto

Es necesario compilar los archivos y assets necesarios, esto se realiza mediante el comando

```
npm run build
```

### Inicializar desarrollo

Una vez realizados dichos pasos se puede ejecutar con node ./src/server.js el servicio, sin embargo, se recomienda usar pm2 para ejecutar este entorno en segundo plano y no abrir una session disnta de ssh

```
pm2 start ./src/server.js --name "Consentimientos Informados"
```
