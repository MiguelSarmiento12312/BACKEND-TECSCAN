import express from 'express';
import { getPacientes } from '../controllers/pacienteController';

const router = express.Router();

// Ruta para obtener todos los pacientes
router.get('/pacientes', getPacientes);

export default router;
