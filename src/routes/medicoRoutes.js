import express from 'express';
import medicoController from '../controllers/medicoController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Ruta para iniciar sesión de médico
router.post('/login', authMiddleware, medicoController.login);

export default router;
