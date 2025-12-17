# 🛍️ Bata Perú - Frontend Clone

Este es el frontend del clon de la tienda Bata Perú, desarrollado con React + Vite para consumir la API REST del backend.

## 📋 Requisitos Previos

- Node.js (v16 o superior)
- npm o yarn
- Backend API corriendo en `http://localhost:8080` (ver API_DOCUMENTATION.md)

## 🚀 Instalación

1. **Instalar dependencias:**
```bash
npm install
```

2. **Iniciar el servidor de desarrollo:**
```bash
npm run dev
```

3. **Abrir en el navegador:**
```
http://localhost:5173
```

## 🏗️ Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Header.jsx      # Navegación principal
│   ├── Footer.jsx      # Pie de página
│   ├── HeroSlider.jsx  # Slider principal
│   └── ...
├── pages/              # Páginas de la aplicación
│   ├── Home.jsx        # Página de inicio
│   ├── Products.jsx    # Listado de productos
│   ├── ProductDetail.jsx # Detalle de producto
│   ├── Cart.jsx        # Carrito de compras
│   ├── Checkout.jsx    # Proceso de pago
│   ├── Login.jsx       # Inicio de sesión
│   ├── Register.jsx    # Registro de usuario
│   ├── Profile.jsx     # Perfil de usuario
│   ├── Orders.jsx      # Historial de pedidos
│   └── OrderDetail.jsx # Detalle de pedido
├── context/            # Contextos de React
│   ├── AuthContext.jsx # Autenticación
│   └── CartContext.jsx # Carrito de compras
├── services/           # Servicios de API
│   └── api.js          # Cliente Axios y endpoints
└── App.jsx             # Componente principal con rutas
```

## 🔗 Rutas Disponibles

### Públicas
- `/` - Página de inicio
- `/productos` - Catálogo de productos
- `/productos/categoria/:id` - Productos por categoría
- `/producto/:id` - Detalle de producto
- `/login` - Iniciar sesión
- `/register` - Registrarse

### Protegidas (requieren autenticación)
- `/carrito` - Carrito de compras
- `/checkout` - Finalizar compra
- `/perfil` - Perfil del usuario
- `/mis-pedidos` - Historial de pedidos
- `/pedido/:id` - Detalle de pedido
- `/pedido-confirmado/:id` - Confirmación de compra

## 📡 Integración con la API

El proyecto consume los siguientes endpoints del backend:

### Autenticación
- `POST /api/auth/registro` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión

### Productos
- `GET /api/productos` - Listar productos
- `GET /api/productos/:id` - Obtener producto
- `GET /api/productos/categoria/:id` - Productos por categoría

### Pedidos
- `POST /api/pedidos` - Crear pedido
- `GET /api/pedidos/usuario/:id` - Historial de pedidos
- `GET /api/pedidos/:id` - Detalle de pedido

### Direcciones
- `GET /api/direcciones/usuario/:id` - Listar direcciones
- `POST /api/direcciones` - Agregar dirección
- `DELETE /api/direcciones/:id` - Eliminar dirección

### Otros
- `GET /api/categorias` - Listar categorías
- `GET /api/marcas` - Listar marcas
- `GET /api/variantes/producto/:id` - Variantes de producto
- `GET /api/imagenes/producto/:id` - Imágenes de producto

## 🔧 Configuración

### URL de la API
Por defecto, la API está configurada en `http://localhost:8081/api`. Para cambiarla, edita:

```javascript
// src/services/api.js
const API_BASE_URL = 'http://localhost:8081/api';
```

## 🎨 Características Principales

### 1. **Autenticación de Usuario**
- Registro de nuevos usuarios
- Inicio de sesión
- Persistencia de sesión (localStorage)
- Protección de rutas privadas

### 2. **Catálogo de Productos**
- Listado con filtros por categoría
- Vista detallada de producto
- Selector de variantes (talla/color)
- Verificación de stock

### 3. **Carrito de Compras**
- Agregar/eliminar productos
- Actualizar cantidades
- Cálculo automático de totales
- Persistencia en localStorage

### 4. **Proceso de Checkout**
- Gestión de direcciones de envío
- Selección de método de pago
- Confirmación de pedido
- Descuento automático de stock

### 5. **Gestión de Pedidos**
- Historial de compras
- Detalles de cada pedido
- Estados de pedido (Pendiente, Enviado, Entregado)

## 🛠️ Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
```

## 📦 Dependencias Principales

- **react** - Librería de UI
- **react-router-dom** - Enrutamiento
- **axios** - Cliente HTTP
- **bootstrap** - Framework CSS
- **vite** - Build tool

## 🎯 Flujo de Usuario

1. **Usuario visita la página** → Ve el home con promociones
2. **Navega a productos** → Explora el catálogo con filtros
3. **Selecciona un producto** → Ve detalles, variantes y stock
4. **Agrega al carrito** → Elige talla/color y cantidad
5. **Va al checkout** → Inicia sesión (si no lo ha hecho)
6. **Completa el pedido** → Selecciona dirección y método de pago
7. **Confirmación** → Recibe número de pedido
8. **Seguimiento** → Puede ver el estado en "Mis Pedidos"

## 🔒 Seguridad

- Contraseñas nunca almacenadas en frontend
- Token de sesión en localStorage (considerar migrar a cookies httpOnly en producción)
- Validación de formularios
- Protección de rutas privadas

## 🚧 Mejoras Futuras

- [ ] Búsqueda de productos
- [ ] Filtros avanzados (precio, marca, material)
- [ ] Wishlist (favoritos)
- [ ] Valoraciones y reseñas
- [ ] Notificaciones en tiempo real
- [ ] Integración con pasarelas de pago reales
- [ ] Panel de administración

## 📝 Notas

- Este es un proyecto educativo/demo
- La API debe estar corriendo antes de iniciar el frontend
- Los datos se resetean al reiniciar el backend
- Las imágenes utilizan placeholders

## 🤝 Contribuir

Este es un proyecto de práctica. Para sugerencias o mejoras, contacta al desarrollador.

## 📄 Licencia

MIT - Proyecto educativo
