// src/controllers/loginController.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../config/db.js';

const loginController = {
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const [rows] = await pool.query('SELECT * FROM medicos WHERE email = ?', [email]);

      if (rows.length === 0) {
        return res.status(401).json({ success: false, message: 'Email incorrecto' });
      }

      const medico = rows[0];
      const passwordMatch = await bcrypt.compare(password, medico.password);

      if (!passwordMatch) {
        return res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
      }

      const token = jwt.sign({ id: medico.id, email: medico.email }, process.env.JWT_SECRET, {
        expiresIn: '1h'
      });

      return res.status(200).json({ success: true, token });
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error);
      return res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
  }
};

export default loginController;
