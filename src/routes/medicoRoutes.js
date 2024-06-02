import { Router } from 'express';
import { loginMedico } from '../controllers/medicoController.js';

const router = Router();

router.post('/login', loginMedico); // Ruta para el inicio de sesión

export default router;
