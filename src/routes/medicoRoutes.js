// medicoRoutes.js

import { Router } from 'express';
import { loginMedico } from '../controllers/medicoController.js';

const router = Router();

// Ruta para el inicio de sesión
router.post('/login', loginMedico);

export default router;
