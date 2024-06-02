import express from 'express';
import loginController from '../controllers/loginController.js';

const router = express.Router();

// Ruta para el inicio de sesión
router.post('/login', loginController.login);

export default router;
