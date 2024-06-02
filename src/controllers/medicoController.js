import { pool } from '../config/db.js';
import bcrypt from 'bcrypt';

export const loginMedico = async (req, res) => {
    const { email, password } = req.body;

    try {
        const [rows] = await pool.query('SELECT * FROM medicos WHERE email = ?', [email]);

        if (rows.length === 0) {
            return res.status(401).json({ success: false, message: 'Usuario no encontrado' });
        }

        const medico = rows[0];

        const isPasswordValid = await bcrypt.compare(password, medico.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
        }

        // Aquí puedes devolver datos adicionales del médico si es necesario
        res.status(200).json({ success: true, message: 'Inicio de sesión exitoso', medico });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
};
