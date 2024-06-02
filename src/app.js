import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { pool } from './config/db.js';
import medicoRoutes from './routes/medicoRoutes.js';
import pacienteRoutes from './routes/pacienteRoutes.js';
import citaRoutes from './routes/citaRoutes.js';
import encuestaRoutes from './routes/encuestaRoutes.js';
import reporteRoutes from './routes/reporteRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/medicos', medicoRoutes);
app.use('/pacientes', pacienteRoutes);
app.use('/citas', citaRoutes);
app.use('/encuestas', encuestaRoutes);
app.use('/reportes', reporteRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the medical app server');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
