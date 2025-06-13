# Proyecto E-commerce Fullstack

Aplicación web fullstack de e-commerce desarrollada con **React** (frontend) y **Node.js + Express + MongoDB** (backend). Permite registro de usuarios, login, visualización de productos, filtrado, sistema de carrito y gestión de pedidos.

## Tecnologías Utilizadas

### Backend:
- Node.js
- Express.js
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- CORS, dotenv, bcrypt
- Arquitectura MVC

### Frontend:
- React + Vite
- React Router DOM (ruteo y rutas protegidas)
- Zustand (estado global)
- React Bootstrap (componentes UI)
- Module.css (estilos personalizados)
- Fetch API / Axios (peticiones HTTP)

## Funcionalidades de Seguridad

- Login/registro con JWT
- Rutas protegidas por rol (admin / cliente)
- Verificación de token en frontend y backend
- Redirección automática si no está autenticado

## 🧪 Funcionalidades del Sistema

- Registro y login de usuarios
- Dashboard principal protegido
- Vista de productos
- Filtro por nombre, categoría y precio
- Barra de búsqueda y botón para limpiar filtros
- Carrito de compras