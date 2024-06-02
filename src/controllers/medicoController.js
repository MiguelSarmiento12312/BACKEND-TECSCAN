// medicoController.js

import bcrypt from 'bcrypt';
import { pool } from '../config/db.js';

// Controlador de inicio de sesión
export const loginMedico = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Busca al médico por correo electrónico en la base de datos
        const [rows] = await pool.query('SELECT * FROM medicos WHERE email = ?', [email]);

        // Si no se encuentra ningún médico con el correo electrónico proporcionado, devuelve un mensaje de error
        if (rows.length === 0) {
            return res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
        }

        // Compara la contraseña proporcionada con la contraseña almacenada en la base de datos utilizando bcrypt
        const medico = rows[0];
        const passwordMatch = await bcrypt.compare(password, medico.password);

        // Si las contraseñas no coinciden, devuelve un mensaje de error
        if (!passwordMatch) {
            return res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
        }

        // Si las credenciales son válidas, devuelve un mensaje de éxito
        return res.status(200).json({ success: true, message: 'Inicio de sesión exitoso' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
};
