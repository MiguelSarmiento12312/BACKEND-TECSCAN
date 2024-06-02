import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { pool } from './config/db.js'; // Utilizamos pool en lugar de sequelize para MySQL
import medicoRoutes from './routes/medicoRoutes.js';
import pacienteRoutes from './routes/pacienteRoutes.js';
import citaRoutes from './routes/citaRoutes.js';
import encuestaRoutes from './routes/encuestaRoutes.js';
import reporteRoutes from './routes/reporteRoutes.js';
import loginController from './controllers/loginController.js';

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/medicos', medicoRoutes);
app.use('/pacientes', pacienteRoutes);
app.use('/citas', citaRoutes);
app.use('/encuestas', encuestaRoutes);
app.use('/reportes', reporteRoutes);

// Ruta para el inicio de sesión
app.post('/medicos/login', loginController.login);

app.get('/', (req, res) => {
    res.send('Welcome to the medical app server');
});

const PORT = process.env.PORT || 3000;

// El pool de conexión para MySQL ya está configurado en db.js, así que no necesitamos sincronizar modelos
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
