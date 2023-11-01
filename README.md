# Test | Cargo de Dev backend
Este proyecto es una implementación básica de un sistema de registro y login de usuario utilizando NodeJS y Express. El diseño es sencillo y directo, enfocándose en la funcionalidad principal.

## Descripción del Proyecto
El objetivo principal de este proyecto es permitir a los usuarios registrarse e iniciar sesión en una aplicación. Una vez que un usuario inicia sesión, tiene la opción de modificar su información personal. La información que se almacena para cada usuario incluye:
- Nombre
-  Apellido
-  Usuario
-  Email
- Contraseña
  
Se proporciona un aviso al usuario después de actualizar su información, indicando si la actualización fue exitosa o no. De manera similar, si ocurre un error al iniciar sesión, se notifica al usuario.

## Cómo Ejecutar el Código
1. Clonar el repositorio desde https://github.com/victorbolivar12/TestDevBackend.git
2. Navegar hasta el directorio del proyecto
3. Instala las dependencias del proyecto con <code>npm install</code>
4. Iniciar el servidor con <code>npm run dev</code>


## Base de datos
Este proyecto utiliza PostgreSQL como sistema de base de datos.
Para configurar PostgreSQL para este proyecto, sigue los pasos a continuación:
1. Instala PostgreSQL en tu máquina local. Puedes descargarlo desde el sitio oficial de PostgreSQL.
2. Una vez instalado, crea una nueva base de datos para el proyecto.
3. Configura las credenciales de la base de datos en tu archivo de configuración del proyecto Esto incluirá el nombre de la base de datos, el usuario, la contraseña y el host.

## Archivo de configuracion
Los elementos que se incluirar en el archivo de configuracion del proyecto son los siguientes:
- PORT = puerto en el que se ejecutará tu aplicación NodeJS
- DATABASE = nombre de la base de datos PostgreSQL
- PASSWORD = contraseña que la aplicación utilizará para autenticarse con la base de datos PostgreSQL
- USER =  nombre de usuario que la aplicación utilizará para autenticarse con la base de datos PostgreSQL
- HOST = host donde se encuentra la base de datos PostgreSQL
- JWT_SECRET =  secreto que la aplicación utilizará para firmar y verificar los tokens JWT
