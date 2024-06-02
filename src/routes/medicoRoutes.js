// medicoRoutes.js

import { Router } from 'express';
import { getMedicos, createMedico, loginMedico } from '../controllers/medicoController.js';

const router = Router();

// Ruta para obtener todos los médicos (solicitudes GET)
router.get('/', getMedicos);

// Ruta para crear un nuevo médico (solicitudes POST)
router.post('/', createMedico);

// Ruta para el inicio de sesión (solicitudes POST)
router.post('/login', loginMedico);

export default router;
