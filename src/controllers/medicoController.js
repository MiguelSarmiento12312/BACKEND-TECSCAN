import { pool } from '../config/db.js';
import bcrypt from 'bcrypt';

// Controlador existente
export const getMedicos = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM medicos');
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Controlador existente
export const createMedico = async (req, res) => {
    const { nombre, apellido, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Encriptar la contraseña
        const [result] = await pool.query('INSERT INTO medicos (nombre, apellido, email, password) VALUES (?, ?, ?, ?)', [nombre, apellido, email, hashedPassword]);
        res.status(201).json({ id: result.insertId, nombre, apellido, email });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Nueva función para el inicio de sesión
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

        res.status(200).json({ success: true, message: 'Inicio de sesión exitoso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
};
