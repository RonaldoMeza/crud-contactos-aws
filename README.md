# CRUD de Contactos con NestJS, MySQL y Frontend HTML/CSS/JS

Este es un proyecto de laboratorio desarrollado para validar el despliegue y ejecución de una aplicación web completa (Full Stack) en una instancia EC2 con Windows Server 2025 en AWS. El sistema permite gestionar una lista de contactos mediante una interfaz web sencilla que consume una API REST.

## Tecnologías Usadas

- **Backend:** NestJS, Node.js, TypeScript, TypeORM.
- **Base de Datos:** MySQL (vía XAMPP).
- **Frontend:** HTML5, CSS3, JavaScript puro (Vanilla JS).
- **Herramientas:** Git, npm, http-server.

## Estructura del Proyecto

```text
crud-contactos-aws/
├── backend/            # API REST desarrollada con NestJS
│   ├── src/            # Código fuente (módulos, controladores, servicios)
│   ├── .env.example    # Plantilla de variables de entorno
│   └── package.json    # Dependencias y scripts del backend
├── frontend/           # Interfaz de usuario (Cliente)
│   ├── index.html      # Estructura principal
│   ├── styles.css      # Estilos visuales
│   └── script.js       # Lógica del cliente y consumo de API
├── database/           # Scripts de base de datos
│   └── crud_contactos_aws.sql
└── README.md           # Documentación del proyecto
```

## Requisitos Previos

- **Node.js** (v18 o superior recomendado)
- **Git** instalado
- **XAMPP** instalado (con MySQL)
- **NPM** (incluido con Node.js)

## Pasos para Ejecutar en Máquina Local

### 1. Preparar la Base de Datos
1. Inicia **XAMPP** y activa el módulo **MySQL**.
2. Accede a **phpMyAdmin** (`http://localhost/phpmyadmin`).
3. Importa o ejecuta el contenido del archivo: `database/crud_contactos_aws.sql`. Esto creará la base de datos `crud_contactos_aws` y la tabla `contacts` con datos de prueba.

### 2. Configurar el Backend
1. Abre una terminal y navega a la carpeta `backend/`.
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Crea un archivo `.env` copiando el contenido de `.env.example`:
   ```bash
   cp .env.example .env
   ```
4. Asegúrate de que los datos en `.env` coincidan con tu configuración de MySQL en XAMPP.
5. Inicia el servidor de desarrollo:
   ```bash
   npm run start:dev
   ```
   El backend estará disponible en: `http://localhost:3000`.

### 3. Ejecutar el Frontend
1. Abre otra terminal y navega a la carpeta `frontend/`.
2. Levanta un servidor web para los archivos estáticos:
   ```bash
   npx http-server -p 8081
   ```
3. Abre tu navegador en: `http://localhost:8081`.

---

## Pasos para Ejecutar en Windows Server 2025 (AWS EC2)

Para desplegar este proyecto en una instancia EC2 con Windows Server 2025, sigue estos pasos:

1. **Conectarse a la instancia:** Usa RDP (Remote Desktop) para acceder al servidor.
2. **Instalar software necesario:** Descarga e instala Node.js, Git y XAMPP en el servidor.
3. **Configurar MySQL:** Inicia MySQL en XAMPP y ejecuta el script SQL (`database/crud_contactos_aws.sql`) mediante phpMyAdmin o la consola de MySQL.
4. **Clonar el proyecto:**
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd crud-contactos-aws
   ```
5. **Configurar y levantar Backend:**
   - Entra a `backend/`, instala dependencias (`npm install`).
   - Crea el archivo `.env` con las credenciales locales del servidor.
   - Ejecuta `npm run start` (o `npm run start:dev`).
6. **Configurar y levantar Frontend:**
   - Entra a `frontend/`.
   - Ejecuta `npx http-server -p 8081`.
7. **Acceso Externo:** Asegúrate de que los puertos **3000** (Backend) y **8081** (Frontend) estén abiertos en el **Security Group** de la instancia EC2 en la consola de AWS.

## Endpoints de la API

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET    | `/contacts` | Obtiene todos los contactos |
| GET    | `/contacts/:id` | Obtiene un contacto por su ID |
| POST   | `/contacts` | Registra un nuevo contacto |
| PUT    | `/contacts/:id` | Actualiza un contacto existente |
| DELETE | `/contacts/:id` | Elimina un contacto |

## Notas Importantes

- El backend incluye **CORS** habilitado para permitir peticiones desde el frontend en diferentes puertos.
- Se han implementado validaciones de datos (nombre y teléfono obligatorios).
- El diseño es **responsive**, adaptándose a dispositivos móviles.

## Evidencia de Funcionamiento

Este proyecto demuestra:
- Conexión exitosa entre un Frontend desacoplado y un Backend en NestJS.
- Operaciones CRUD completas sobre una base de datos MySQL.
- Capacidad de despliegue en entornos Windows Server modernos en la nube (AWS).
