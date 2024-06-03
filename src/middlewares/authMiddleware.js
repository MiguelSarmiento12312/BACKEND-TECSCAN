import bcrypt from 'bcrypt';
import { pool } from '../config/db.js';

const authMiddleware = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Buscar al usuario en la base de datos por su correo electrónico
    const [rows] = await pool.query('SELECT * FROM medicos WHERE email = ?', [email]);

    // Si no se encuentra ningún usuario con el correo electrónico proporcionado, devolver un error de autenticación
    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
    }

    // Obtener el primer usuario encontrado (debería ser único debido a la restricción UNIQUE en la columna email)
    const medico = rows[0];

    // Comparar la contraseña proporcionada con la contraseña almacenada en la base de datos
    const passwordMatch = await bcrypt.compare(password, medico.password);

    // Si las contraseñas no coinciden, devolver un error de autenticación
    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
    }

    // Agregar el objeto medico a la solicitud para usarlo en otras rutas
    req.medico = medico;

    // Continuar con el siguiente middleware en la cadena de middleware
    next();
  } catch (error) {
    console.error('Error durante la autenticación:', error);
    // Si hay un error durante el proceso de autenticación, devolver un error de servidor
    return res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
};

export default authMiddleware;
