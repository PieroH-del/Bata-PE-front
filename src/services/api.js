import axios from 'axios';

const API_BASE_URL = 'https://evac04bp-production.up.railway.app/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token si existe
api.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      if (userData.token) {
        config.headers.Authorization = `Bearer ${userData.token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ========== AUTENTICACIÓN ==========
export const authAPI = {
  register: (data) => api.post('/auth/registro', data),
  login: (credentials) => api.post('/auth/login', credentials),
};

// ========== PRODUCTOS ==========
export const productosAPI = {
  getAll: () => api.get('/productos'),
  getById: (id) => api.get(`/productos/${id}`),
  getByCategoria: (categoriaId) => api.get(`/productos/categoria/${categoriaId}`),
  getByGenero: (genero) => api.get(`/productos/genero/${genero}`),
  getByMarca: (marcaId) => api.get(`/productos/marca/${marcaId}`),
  create: (data) => api.post('/productos', data), // Admin
};

// ========== PEDIDOS ==========
export const pedidosAPI = {
  create: (data) => api.post('/pedidos', data),
  getByUsuario: (usuarioId) => api.get(`/pedidos/usuario/${usuarioId}`),
  getById: (id) => api.get(`/pedidos/${id}`),
  updateEstado: (id, estado) => api.put(`/pedidos/${id}/estado`, estado, {
    headers: { 'Content-Type': 'text/plain' }
  }),
};

// ========== DIRECCIONES ==========
export const direccionesAPI = {
  getByUsuario: (usuarioId) => api.get(`/direcciones/usuario/${usuarioId}`),
  create: (data) => api.post('/direcciones', data),
  delete: (id) => api.delete(`/direcciones/${id}`),
};

// ========== CATEGORÍAS ==========
export const categoriasAPI = {
  getAll: () => api.get('/categorias'),
  getById: (id) => api.get(`/categorias/${id}`),
};

// ========== MARCAS ==========
export const marcasAPI = {
  getAll: () => api.get('/marcas'),
  getById: (id) => api.get(`/marcas/${id}`),
};

// ========== VARIANTES DE PRODUCTO ==========
export const variantesAPI = {
  getByProducto: (productoId) => api.get(`/variantes/producto/${productoId}`),
  getById: (id) => api.get(`/variantes/${id}`),
};

// ========== IMÁGENES ==========
export const imagenesAPI = {
  getByProducto: (productoId) => api.get(`/imagenes/producto/${productoId}`),
};

export default api;
