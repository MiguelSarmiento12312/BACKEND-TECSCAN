// app.js

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { sequelize } from './config/db.js'; // Importa la instancia de Sequelize
import medicoRoutes from './routes/medicoRoutes.js';
import pacienteRoutes from './routes/pacienteRoutes.js';
import citaRoutes from './routes/citaRoutes.js';
import encuestaRoutes from './routes/encuestaRoutes.js';
import reporteRoutes from './routes/reporteRoutes.js';
import loginController from './controllers/loginController.js'; // Importa el controlador de inicio de sesión

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

// Sincroniza los modelos con la base de datos
sequelize.sync().then(() => {
  console.log('Models synchronized with database');
  // Inicia el servidor
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Error synchronizing models with database:', err);
});
