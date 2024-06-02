// loginController.js

import bcrypt from 'bcrypt';
import Medico from '../models/Medico.js';

const loginController = {
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      // Busca al médico por correo electrónico en la base de datos
      const medico = await Medico.findOne({ where: { email } });

      // Si el médico no existe, devolver un mensaje de error
      if (!medico) {
        return res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
      }

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
