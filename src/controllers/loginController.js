import bcrypt from 'bcrypt';
import { pool } from '../config/db.js';

const loginController = {
  login: async (req, res) => {
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

      return res.status(200).json({ success: true, message: 'Inicio de sesión exitoso' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
  }
};

export default loginController;
