import { Router } from 'express';
import { getPacientes, createPaciente } from '../controllers/pacienteController.js';

const router = Router();

router.get('/', getPacientes);
router.post('/', createPaciente);

export default router;
