import bcrypt from 'bcrypt';
import { pool } from '../config/db.js';

const authMiddleware = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const [rows] = await pool.query('SELECT * FROM medicos WHERE email = ?', [email]);

    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
    }

    const medico = rows[0];
    const passwordMatch = await bcrypt.compare(password, medico.password);

    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
    }

    // Agregar el objeto medico a la solicitud para usarlo en otras rutas
    req.medico = medico;
    next();
  } catch (error) {
    console.error('Error durante la autenticación:', error);
    return res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
};

export default authMiddleware;
