// loginController.js

import bcrypt from 'bcrypt';
import { pool } from '../config/db.js'; // Importa el pool de conexión a MySQL si es necesario

const loginController = {
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      // Realiza la lógica de autenticación sin depender de un modelo específico
      // Por ejemplo, puedes realizar una consulta directa a la tabla de medicos en tu base de datos MySQL

      // Realiza la consulta SQL para obtener los datos del médico por correo electrónico
      const [rows] = await pool.query('SELECT * FROM medicos WHERE email = ?', [email]);

      // Verifica si se encontró un médico con ese correo electrónico
      if (rows.length === 0) {
        return res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
      }

      const medico = rows[0];

      // Verifica si la contraseña coincide utilizando bcrypt
      const isPasswordValid = await bcrypt.compare(password, medico.password);

      // Si la contraseña no coincide, devuelve un mensaje de error
      if (!isPasswordValid) {
        return res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
      }

      // Si las credenciales son válidas, devuelve un mensaje de éxito
      return res.status(200).json({ success: true, message: 'Inicio de sesión exitoso' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
  }
};

export default loginController;
