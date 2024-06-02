import express from 'express';
import medicoRoutes from './routes/medicoRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/medicos', medicoRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
