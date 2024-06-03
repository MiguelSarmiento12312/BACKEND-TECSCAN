import express from 'express';
import bodyParser from 'body-parser';
import medicoRoutes from './routes/medicoRoutes.js'; // Asegúrate de que la ruta es correcta

const app = express();

app.use(bodyParser.json()); // Para parsear JSON en las peticiones

// Usar las rutas de médicos
app.use('/medicos', medicoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
