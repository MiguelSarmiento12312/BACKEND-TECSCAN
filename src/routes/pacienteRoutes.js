import express from 'express';
import { getPacienteByNumeroIdentificacion } from '../controllers/pacienteController';

const router = express.Router();

// Ruta para escanear un código QR y obtener los datos del paciente
router.post('/pacientes/scan', getPacienteByNumeroIdentificacion);

export default router;
