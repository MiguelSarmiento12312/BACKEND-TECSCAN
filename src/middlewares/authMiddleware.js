// authMiddleware.js
import jwt from 'jsonwebtoken';
import { pool } from '../config/db.js';

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;

  // Verificar si se proporcionó un token de autenticación
  if (!token) {
    return res.status(401).json({ success: false, message: 'Token de autenticación no proporcionado' });
  }

  try {
    // Verificar el token de autenticación usando la clave secreta
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Agregar la información del médico al objeto de solicitud para su uso posterior
    req.medico = decoded;

    // Continuar con el siguiente middleware en la cadena de middleware
    next();
  } catch (error) {
    console.error('Error durante la verificación del token de autenticación:', error);
    // Si el token no es válido, devolver un error de autenticación
    return res.status(401).json({ success: false, message: 'Token de autenticación no válido' });
  }
};

export default authMiddleware;
