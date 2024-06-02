// app.js

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { pool } from './config/db.js';
import medicoRoutes from './routes/medicoRoutes.js';

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/medicos', medicoRoutes);

// Ruta raíz
app.get('/', (req, res) => {
    res.send('Welcome to the medical app server');
});

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
