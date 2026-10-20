/**
 * Rutas: auth.js
 * POST /api/auth/register  -> crear cuenta
 * POST /api/auth/login     -> iniciar sesión (devuelve JWT)
 */
const express = require('express');
const router = express.Router();
const controller = require('../controllers/authController');

router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/me', controller.me); // verificar token

module.exports = router;
