import bcrypt from 'bcrypt';
import { pool } from '../config/db.js';

const loginController = {
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      // Realiza la consulta SQL para obtener los datos del médico por correo electrónico
      const [rows] = await pool.query('SELECT * FROM medicos WHERE email = ?', [email]);

      // Si el médico no existe, devolver un mensaje de error
      if (rows.length === 0) {
        return res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
      }

      const medico = rows[0];

      // Verifica si la contraseña coincide utilizando bcrypt
      const passwordMatch = await bcrypt.compare(password, medico.password);

      // Si la contraseña no coincide, devolver un mensaje de error
      if (!passwordMatch) {
        return res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
      }

      // Si las credenciales son válidas, devolver un mensaje de éxito
      return res.status(200).json({ success: true, message: 'Inicio de sesión exitoso' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
  }
};

export default loginController;
