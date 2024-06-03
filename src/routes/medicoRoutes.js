// medicoRoutes.js
import express from 'express';
import medicoController from '../controllers/medicoController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import loginController from '../controllers/loginController.js';

const router = express.Router();

// Ejemplo de una ruta POST con una función de callback
router.post('/login', loginController.login);

// Ejemplo de una ruta protegida que utiliza el middleware de autenticación
router.get('/info', authMiddleware, medicoController.getMedicoInfo);

export default router;
