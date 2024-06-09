import express from 'express';
import { getPacientes } from '../controllers/pacienteController.js';

const router = express.Router();

// Ruta para obtener todos los pacientes
router.get('/pacientes', getPacientes);

export default router;
