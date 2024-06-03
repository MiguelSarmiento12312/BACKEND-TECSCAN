// src/app.js
import express from 'express';
import bodyParser from 'body-parser';
import medicoRoutes from './routes/medicoRoutes.js';

const app = express();

app.use(bodyParser.json());
app.use('/medicos', medicoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
