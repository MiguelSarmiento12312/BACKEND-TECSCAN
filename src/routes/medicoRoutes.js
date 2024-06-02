import { Router } from 'express';
import { getMedicos, createMedico, loginMedico } from '../controllers/medicoController.js';

const router = Router();

router.get('/', getMedicos);
router.post('/', createMedico);
router.post('/login', loginMedico); // Nueva ruta para el login

export default router;
