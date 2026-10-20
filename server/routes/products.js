/**
 * Rutas: products.js
 * CRUD completo de productos
 * Base: /api/products
 */
const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');

// GET /api/products          -> listar todos (+ filtro ?search=...)
// GET /api/products/:id      -> obtener uno
// POST /api/products         -> crear
// PUT /api/products/:id      -> actualizar
// DELETE /api/products/:id   -> eliminar

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
