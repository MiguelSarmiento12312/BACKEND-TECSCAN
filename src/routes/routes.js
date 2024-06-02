// routes.js

const express = require('express');
const router = express.Router();
const loginController = require('./controllers/loginController');

// Ruta para el inicio de sesión de los médicos
router.post('/medicos/login', loginController.login);

module.exports = router;
