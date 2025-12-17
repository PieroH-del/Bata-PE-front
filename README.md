# 👟 Bata Perú - E-commerce Frontend

<div align="center">

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.8-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-7.10.1-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

**Aplicación web de comercio electrónico para la tienda Bata Perú**

[Demo en Vivo](#) • [Documentación API](./API_DOCUMENTATION.md) • [Reportar Bug](https://github.com/PieroH-del/Bata-PE-front/issues)

</div>

---

## 📋 Tabla de Contenidos

- [Descripción](#-descripción)
- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Configuración](#-configuración)
- [Scripts Disponibles](#-scripts-disponibles)
- [Funcionalidades](#-funcionalidades)
- [API Integration](#-api-integration)
- [Contextos](#-contextos)
- [Rutas](#-rutas)
- [Componentes Principales](#-componentes-principales)
- [Páginas](#-páginas)
- [Estilos](#-estilos)
- [Deploy](#-deploy)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)

---

## 🎯 Descripción

**Bata Perú E-commerce** es una aplicación web moderna desarrollada con React que replica la experiencia de compra en línea de la tienda Bata. El proyecto incluye un sistema completo de gestión de productos, carrito de compras, autenticación de usuarios y procesamiento de pedidos.

### 🎨 Demo Visual

La aplicación ofrece una interfaz intuitiva y responsiva que incluye:
- Navegación fluida entre categorías
- Carrusel de productos destacados
- Sistema de filtrado y búsqueda
- Proceso de checkout paso a paso
- Gestión de perfil y pedidos

---

## ✨ Características

### 🛍️ Funcionalidades del Cliente

- ✅ **Catálogo de Productos**: Visualización de productos con imágenes, precios y descripciones
- ✅ **Filtrado por Categorías**: Navega por diferentes categorías de calzado
- ✅ **Detalle de Producto**: Vista detallada con galería de imágenes y especificaciones
- ✅ **Carrito de Compras**: Agregar, eliminar y modificar cantidades de productos
- ✅ **Proceso de Checkout**: Flujo completo de compra con validación
- ✅ **Sistema de Autenticación**: Registro, login y gestión de sesión
- ✅ **Gestión de Perfil**: Actualizar información personal y direcciones
- ✅ **Historial de Pedidos**: Ver y rastrear pedidos anteriores
- ✅ **Confirmación de Pedido**: Página de confirmación con detalles de la orden

### 🎨 Características de UI/UX

- 📱 **Diseño Responsivo**: Totalmente adaptable a dispositivos móviles y desktop
- 🎨 **Interfaz Moderna**: Diseño limpio basado en Bootstrap 5
- ⚡ **Carga Rápida**: Optimizado con Vite para mejor rendimiento
- 🔄 **Navegación SPA**: Sin recargas de página con React Router
- 💫 **Animaciones Suaves**: Transiciones y efectos visuales

---

## 🛠️ Tecnologías

### Core

| Tecnología | Versión | Descripción |
|------------|---------|-------------|
| **React** | 19.2.0 | Librería para construir interfaces de usuario |
| **Vite** | 7.2.4 | Build tool y dev server de última generación |
| **React Router DOM** | 7.10.1 | Enrutamiento declarativo para React |

### UI/Styling

| Tecnología | Versión | Descripción |
|------------|---------|-------------|
| **Bootstrap** | 5.3.8 | Framework CSS para diseño responsivo |
| **@popperjs/core** | 2.11.8 | Librería para tooltips y popovers |
| **CSS Modules** | - | Estilos modulares y componetizados |

### HTTP Client

| Tecnología | Versión | Descripción |
|------------|---------|-------------|
| **Axios** | 1.13.2 | Cliente HTTP para consumir APIs REST |

### Development Tools

| Tecnología | Versión | Descripción |
|------------|---------|-------------|
| **ESLint** | 9.39.1 | Linter para código JavaScript/React |
| **@vitejs/plugin-react** | 5.1.1 | Plugin de Vite para React |

---

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js**: v18.0.0 o superior
- **npm**: v9.0.0 o superior (o **yarn** / **pnpm**)
- **Git**: Para clonar el repositorio
- **Navegador moderno**: Chrome, Firefox, Safari o Edge

---

## 🚀 Instalación

### 1. Clonar el Repositorio

```bash
git clone https://github.com/PieroH-del/Bata-PE-front.git
cd Bata-PE-front
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configurar Variables de Entorno

Edita el archivo [`src/services/api.js`](src/services/api.js) y configura la URL del backend:

```javascript
const API_BASE_URL = 'https://evac04bp-production.up.railway.app/api';
```

O crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_BASE_URL=https://evac04bp-production.up.railway.app/api
```

### 4. Iniciar el Servidor de Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en: **http://localhost:5173**

---

## 📁 Estructura del Proyecto

```
Bata-PE-front/
├── public/                      # Archivos públicos estáticos
│   └── vite.svg                # Logo de Vite
├── src/                        # Código fuente
│   ├── assets/                 # Recursos estáticos (imágenes, iconos)
│   │   └── react.svg
│   ├── components/             # Componentes reutilizables
│   │   ├── BrandCarousel.jsx   # Carrusel de marcas
│   │   ├── CategorySection.jsx # Sección de categorías
│   │   ├── Footer.jsx          # Pie de página
│   │   ├── Header.jsx          # Cabecera y navegación
│   │   ├── HeroSlider.jsx      # Slider principal
│   │   ├── ProductPromotion.jsx# Promociones de productos
│   │   └── PromotionalSection.jsx # Sección promocional
│   ├── context/                # Context API de React
│   │   ├── AuthContext.jsx     # Estado de autenticación
│   │   └── CartContext.jsx     # Estado del carrito
│   ├── pages/                  # Páginas de la aplicación
│   │   ├── Home.jsx            # Página principal
│   │   ├── Products.jsx        # Listado de productos
│   │   ├── ProductDetail.jsx   # Detalle de producto
│   │   ├── Cart.jsx            # Carrito de compras
│   │   ├── Checkout.jsx        # Proceso de pago
│   │   ├── Login.jsx           # Inicio de sesión
│   │   ├── Register.jsx        # Registro de usuario
│   │   ├── Profile.jsx         # Perfil de usuario
│   │   ├── Orders.jsx          # Historial de pedidos
│   │   ├── OrderDetail.jsx     # Detalle de pedido
│   │   └── OrderConfirmation.jsx # Confirmación de pedido
│   ├── services/               # Servicios y llamadas API
│   │   └── api.js              # Configuración de Axios y endpoints
│   ├── App.jsx                 # Componente raíz
│   ├── App.css                 # Estilos globales de la app
│   ├── main.jsx                # Punto de entrada de React
│   └── index.css               # Estilos base
├── .gitignore                  # Archivos ignorados por Git
├── eslint.config.js            # Configuración de ESLint
├── index.html                  # HTML principal
├── package.json                # Dependencias y scripts
├── vite.config.js              # Configuración de Vite
├── API_DOCUMENTATION.md        # Documentación de la API
├── CHANGELOG.md                # Historial de cambios
├── FRONTEND_README.md          # Documentación del frontend
├── INICIO_RAPIDO.md            # Guía de inicio rápido
├── PROYECTO_COMPLETADO.md      # Documentación del proyecto
└── README.md                   # Este archivo
```

---

## ⚙️ Configuración

### Configuración de Vite

El archivo [`vite.config.js`](vite.config.js) contiene la configuración del bundler:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  }
})
```

### Configuración de ESLint

ESLint está configurado en [`eslint.config.js`](eslint.config.js) para mantener la calidad del código.

---

## 📜 Scripts Disponibles

En el directorio del proyecto, puedes ejecutar:

### `npm run dev`

Inicia el servidor de desarrollo en modo de observación.
- URL: http://localhost:5173
- Hot Module Replacement (HMR) habilitado
- Recarga automática al guardar cambios

### `npm run build`

Construye la aplicación para producción en la carpeta `dist/`.
- Optimización de código
- Minificación de assets
- Tree-shaking de dependencias no usadas

### `npm run preview`

Previsualiza la versión de producción localmente.
- Sirve la carpeta `dist/`
- Útil para probar antes del deploy

### `npm run lint`

Ejecuta ESLint para detectar problemas en el código.
- Verifica sintaxis y estilo
- Detecta malas prácticas

---

## 🎯 Funcionalidades

### 1. Sistema de Autenticación

**Registro de Usuarios**
- Formulario de registro con validación
- Campos: nombre, apellido, email, teléfono, contraseña
- Almacenamiento seguro en localStorage

**Inicio de Sesión**
- Login con email y contraseña
- Gestión de sesión con JWT (si el backend lo implementa)
- Redirección automática después del login

**Gestión de Sesión**
- Persistencia de sesión en localStorage
- Verificación de autenticación en rutas protegidas
- Cierre de sesión

### 2. Catálogo de Productos

**Lista de Productos**
- Grid responsivo de productos
- Información: imagen, nombre, precio
- Paginación o scroll infinito

**Filtrado por Categoría**
- Navegación por categorías de calzado
- URL dinámica: `/productos/categoria/:categoriaId`

**Detalle de Producto**
- Galería de imágenes
- Descripción completa
- Selección de talla y color
- Botón de agregar al carrito

### 3. Carrito de Compras

**Gestión del Carrito**
- Agregar productos con cantidad y variantes
- Modificar cantidades
- Eliminar productos
- Cálculo automático de subtotales y total

**Persistencia**
- Almacenamiento en Context API
- Sincronización con localStorage

### 4. Proceso de Checkout

**Flujo de Compra**
1. Revisión del carrito
2. Ingreso de dirección de envío
3. Selección de método de pago
4. Confirmación de pedido

**Validaciones**
- Verificación de usuario autenticado
- Validación de campos obligatorios
- Verificación de stock

### 5. Gestión de Pedidos

**Historial de Pedidos**
- Lista de pedidos del usuario
- Estados: Pendiente, Procesando, Enviado, Entregado

**Detalle de Pedido**
- Información completa del pedido
- Productos incluidos
- Dirección de envío
- Estado de seguimiento

---

## 🔌 API Integration

El proyecto consume una API REST backend. La configuración está en [`src/services/api.js`](src/services/api.js).

### Configuración Base

```javascript
import axios from 'axios';

const API_BASE_URL = 'https://evac04bp-production.up.railway.app/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### Endpoints Disponibles

#### Autenticación
- `POST /auth/registro` - Registrar nuevo usuario
- `POST /auth/login` - Iniciar sesión

#### Productos
- `GET /productos` - Obtener todos los productos
- `GET /productos/:id` - Obtener producto por ID
- `GET /productos/categoria/:categoriaId` - Productos por categoría

#### Pedidos
- `POST /pedidos` - Crear nuevo pedido
- `GET /pedidos/usuario/:usuarioId` - Pedidos del usuario
- `GET /pedidos/:id` - Detalle de pedido

#### Categorías
- `GET /categorias` - Obtener todas las categorías

#### Direcciones
- `POST /direcciones` - Crear dirección de envío
- `GET /direcciones/usuario/:usuarioId` - Direcciones del usuario

Ver la [Documentación completa de la API](./API_DOCUMENTATION.md) para más detalles.

---

## 🧩 Contextos

### AuthContext

Maneja el estado de autenticación global.

```javascript
const { user, login, logout, register } = useAuth();
```

**Estado:**
- `user`: Información del usuario autenticado
- `isAuthenticated`: Booleano de autenticación

**Funciones:**
- `login(email, password)`: Iniciar sesión
- `logout()`: Cerrar sesión
- `register(userData)`: Registrar nuevo usuario

### CartContext

Maneja el estado del carrito de compras.

```javascript
const { cart, addToCart, removeFromCart, updateQuantity, clearCart, total } = useCart();
```

**Estado:**
- `cart`: Array de productos en el carrito
- `total`: Total calculado

**Funciones:**
- `addToCart(product, quantity)`: Agregar al carrito
- `removeFromCart(productId)`: Eliminar del carrito
- `updateQuantity(productId, quantity)`: Actualizar cantidad
- `clearCart()`: Vaciar carrito

---

## 🗺️ Rutas

La aplicación utiliza React Router DOM v7 con las siguientes rutas:

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | Home | Página principal |
| `/productos` | Products | Listado de productos |
| `/productos/categoria/:categoriaId` | Products | Productos filtrados |
| `/producto/:id` | ProductDetail | Detalle del producto |
| `/carrito` | Cart | Carrito de compras |
| `/checkout` | Checkout | Proceso de pago |
| `/login` | Login | Inicio de sesión |
| `/register` | Register | Registro de usuario |
| `/perfil` | Profile | Perfil del usuario |
| `/mis-pedidos` | Orders | Historial de pedidos |
| `/pedido/:id` | OrderDetail | Detalle de pedido |
| `/pedido-confirmado/:orderId` | OrderConfirmation | Confirmación |

---

## 🧱 Componentes Principales

### Header
Barra de navegación principal con:
- Logo de Bata
- Menú de categorías
- Buscador de productos
- Iconos de usuario y carrito
- Menú responsive para móviles

### Footer
Pie de página con:
- Enlaces institucionales
- Redes sociales
- Información de contacto
- Newsletter

### HeroSlider
Carrusel de imágenes destacadas en la página principal.

### CategorySection
Sección que muestra las categorías disponibles.

### ProductPromotion
Componente para mostrar productos en promoción.

### BrandCarousel
Carrusel de marcas asociadas.

---

## 📄 Páginas

### Home
Página principal con:
- Hero slider
- Categorías destacadas
- Productos en promoción
- Sección de marcas

### Products
Listado de productos con:
- Grid de productos
- Filtros por categoría
- Ordenamiento por precio
- Paginación

### ProductDetail
Vista detallada con:
- Galería de imágenes
- Información del producto
- Selector de talla/color
- Botón de compra

### Cart
Carrito de compras con:
- Lista de productos agregados
- Control de cantidades
- Resumen de totales
- Botón para checkout

### Checkout
Proceso de compra con:
- Formulario de dirección
- Resumen de pedido
- Método de pago
- Confirmación

### Profile
Perfil de usuario con:
- Información personal
- Direcciones guardadas
- Edición de datos

### Orders
Historial de pedidos con:
- Lista de pedidos
- Estados de seguimiento
- Acceso a detalles

---

## 🎨 Estilos

El proyecto utiliza una combinación de:

- **Bootstrap 5.3.8**: Framework CSS base
- **CSS Modules**: Estilos componetizados
- **CSS Custom**: Estilos globales en `App.css` e `index.css`

### Variables CSS Personalizadas

```css
:root {
  --primary-color: #d32f2f;
  --secondary-color: #212121;
  --accent-color: #ffa726;
  --text-color: #333;
  --background-color: #f5f5f5;
}
```

---

## 🚀 Deploy

### Opción 1: Vercel

```bash
npm install -g vercel
vercel login
vercel
```

### Opción 2: Netlify

```bash
npm run build
# Arrastra la carpeta dist/ a Netlify
```

### Opción 3: GitHub Pages

```bash
npm run build
# Configurar gh-pages en package.json
```

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la [MIT License](LICENSE).

---

## 👥 Autores

- **Piero H. del** - [GitHub](https://github.com/PieroH-del)

---

## 🙏 Agradecimientos

- Inspirado en [Bata Perú](https://www.bata.com.pe/)
- Iconos de [React Icons](https://react-icons.github.io/react-icons/)
- Imágenes de productos de Bata

---

<div align="center">

**⭐ Si este proyecto te fue útil, considera darle una estrella ⭐**

[⬆ Volver arriba](#-bata-perú---e-commerce-frontend)

</div>
