# Proyecto ALFI – Backend

Backend del proyecto ALFI desarrollado con Node.js, Express, Prisma y MySQL. Este proyecto utiliza Prisma 6.8.0 como ORM para la gestión de la base de datos.

## Requisitos

- Node.js v18 o superior
- Prisma v6.8.0
- MySQL

## Instalación

Despues de clonar el repositorio, navega al directorio del backend:

```
cd backend
```

Instala las dependencias del proyecto:

```
npm install
```

## Configuración

Clona el archivo `.env.example`, renómbralo a `.env` en la raíz y configura las variables de entorno necesarias.

## Base de datos

Debes crear la base de datos previamente en MySQL:

```
CREATE DATABASE alfi_db;
```

## Migraciones

Ejecuta las migraciones para crear las tablas, enums y generar Prisma Client:

```
npx prisma migrate dev
```

Si por alguna razón Prisma Client no se genera automáticamente, puedes generarlo manualmente:

```
npx prisma generate
```

## Ejecución

Para iniciar el servidor en modo desarrollo:

```
npm run dev
```

<!-- ## Estructura del proyecto

```
backend/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── src/
├── .env
├── package.json
└── README.md
``` -->

<!-- ## Notas

El proyecto utiliza Prisma 6.8.0. Las migraciones se almacenan automáticamente en la carpeta prisma/migrations. Los enums definidos en el esquema Prisma se crean directamente en MySQL como parte de las tablas.

## Flujo rápido para nuevos desarrolladores

npm install
npx prisma migrate dev
npm run dev -->
