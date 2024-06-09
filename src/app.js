import express from 'express';
import bodyParser from 'body-parser';
import medicoRoutes from './routes/medicoRoutes.js';
import pacientesRoutes from './routes/pacienteRoutes.js'; // Asegúrate de que la ruta es correcta
import dotenv from 'dotenv';

// Cargar variables de entorno desde el archivo .env
dotenv.config();

const app = express();

app.use(bodyParser.json()); // Para parsear JSON en las peticiones

// Usar las rutas de médicos
app.use('/medicos', medicoRoutes);

// Usar las rutas de pacientes
app.use('/pacientes', pacientesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
