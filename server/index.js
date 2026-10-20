/**
 * ============================================================
 *  PROYECTO 2: E-COMMERCE - server/index.js
 *  Semana 9 - Express + CRUD + Auth
 * ============================================================
 *  Stack:
 *  - Express para API REST
 *  - Auth con bcryptjs + jsonwebtoken (JWT)
 *  - Productos CRUD completo
 *  - Sin BD externa: usa memoria + persistencia en archivo (data/products.json)
 *  - Listo para migrar a MongoDB/Mongoose cambiando solo el Model
 * ============================================================
 */

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const productRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5001;

// Middlewares
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging simple
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Rutas
app.get('/', (req, res) => {
  res.json({
    mensaje: '✅ API E-commerce funcionando',
    version: '1.0.0',
    endpoints: {
      productos: 'GET /api/products',
      crearProducto: 'POST /api/products',
      authRegister: 'POST /api/auth/register',
      authLogin: 'POST /api/auth/login'
    }
  });
});

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

// Health
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`
  ╔══════════════════════════════════════╗
  ║  🛒 API E-commerce iniciada         ║
  ║  📡 Puerto: ${PORT}                  ║
  ║  🌐 http://localhost:${PORT}          ║
  ╚══════════════════════════════════════╝
  `);
});
