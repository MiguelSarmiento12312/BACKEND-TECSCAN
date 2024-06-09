import express from 'express';
import { getPacienteByQR } from '../controllers/pacientes.js';

const router = express.Router();

router.post('/scan', getPacienteByQR);

export default router;
