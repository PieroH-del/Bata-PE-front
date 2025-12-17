# 🚀 Inicio Rápido - Bata Perú Clone

## ⚡ Pasos para Ejecutar el Proyecto

### 1️⃣ Verificar que el Backend está corriendo
```bash
# El backend debe estar disponible en:
http://localhost:8081

# Verificar con:
curl http://localhost:8081/api/productos
```

### 2️⃣ Instalar Dependencias (solo la primera vez)
```bash
npm install
```

### 3️⃣ Iniciar el Proyecto
```bash
npm run dev
```

### 4️⃣ Abrir en el Navegador
```
http://localhost:5174
```

---

## 🎯 Prueba Rápida del Flujo

### Opción A: Usuario Nuevo
1. Ir a http://localhost:5174
2. Click en "Productos" en el menú
3. Click en cualquier producto
4. Seleccionar talla y color
5. Click en "Agregar al Carrito"
6. Click en el ícono del carrito (arriba derecha)
7. Click en "Proceder al Checkout"
8. Te redirigirá a Login
9. Click en "Regístrate aquí"
10. Llenar formulario y registrarse
11. Completar checkout con dirección y método de pago
12. ¡Ver confirmación de pedido!

### Opción B: Con Cuenta Existente
1. Click en el ícono de usuario → Login
2. Ingresar credenciales
3. Explorar productos
4. Agregar al carrito
5. Hacer checkout directo
6. Ver pedidos en "Mi Perfil" → "Mis Pedidos"

---

## 🔍 Endpoints del Backend que Debes Tener

Para que el frontend funcione correctamente, tu backend debe tener:

**Mínimo Indispensable:**
- ✅ `GET /api/productos` - Listar productos
- ✅ `GET /api/productos/:id` - Detalle de producto
- ✅ `POST /api/auth/registro` - Crear usuario
- ✅ `POST /api/auth/login` - Iniciar sesión
- ✅ `POST /api/pedidos` - Crear pedido

**Recomendado:**
- ✅ `GET /api/categorias` - Categorías
- ✅ `GET /api/variantes/producto/:id` - Variantes (tallas/colores)
- ✅ `GET /api/imagenes/producto/:id` - Imágenes del producto
- ✅ `GET /api/direcciones/usuario/:id` - Direcciones del usuario
- ✅ `POST /api/direcciones` - Crear dirección
- ✅ `GET /api/pedidos/usuario/:id` - Historial de pedidos

---

## 🐛 Solución de Problemas

### El frontend no carga los productos
- Verifica que el backend esté corriendo
- Verifica la URL de la API en `src/services/api.js`
- Revisa la consola del navegador (F12)

### Error 404 al hacer login
- El backend debe tener el endpoint `/api/auth/login`
- Verifica las credenciales

### El carrito no funciona
- Limpia el localStorage del navegador
- Verifica que los productos tengan variantes

### Error al hacer checkout
- Verifica que el usuario esté autenticado
- Verifica que haya productos con stock disponible

---

## 📂 Archivos Importantes

- `src/services/api.js` - Configuración de endpoints
- `src/context/AuthContext.jsx` - Gestión de autenticación
- `src/context/CartContext.jsx` - Gestión del carrito
- `API_DOCUMENTATION.md` - Documentación de la API
- `PROYECTO_COMPLETADO.md` - Resumen completo del proyecto

---

## 🎨 Páginas Disponibles

| Ruta | Descripción | Requiere Auth |
|------|-------------|---------------|
| `/` | Home | No |
| `/productos` | Catálogo | No |
| `/producto/:id` | Detalle | No |
| `/login` | Iniciar sesión | No |
| `/register` | Registrarse | No |
| `/carrito` | Carrito | No |
| `/checkout` | Pagar | Sí |
| `/perfil` | Mi perfil | Sí |
| `/mis-pedidos` | Mis pedidos | Sí |
| `/pedido/:id` | Detalle pedido | Sí |

---

## 💡 Tips

1. **Para probar rápido:** Crea una cuenta con datos simples
2. **Si algo falla:** Revisa la consola del navegador (F12) y la terminal del backend
3. **LocalStorage:** El carrito y la sesión se guardan ahí, puedes limpiarlos desde DevTools
4. **Hot Reload:** Los cambios se reflejan automáticamente al guardar

---

## 📞 ¿Necesitas Ayuda?

1. Revisa `PROYECTO_COMPLETADO.md` para entender la estructura
2. Revisa `API_DOCUMENTATION.md` para entender los endpoints
3. Revisa `FRONTEND_README.md` para documentación técnica completa

---

**¡Disfruta desarrollando! 🚀**
