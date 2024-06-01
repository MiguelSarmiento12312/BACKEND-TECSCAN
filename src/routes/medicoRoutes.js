import { Router } from 'express';
import { getMedicos, createMedico } from '../controllers/medicoController.js';

const router = Router();

router.get('/', getMedicos);
router.post('/', createMedico);

export default router;
