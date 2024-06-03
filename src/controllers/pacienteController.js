import { pool } from '../config/db.js';

export const getPacientes = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM pacientes');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const createPaciente = async (req, res) => {
    const { nombre, apellido, fecha_nacimiento, numero_identificacion } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO pacientes (nombre, apellido, fecha_nacimiento, numero_identificacion) VALUES (?, ?, ?, ?)', [nombre, apellido, fecha_nacimiento, numero_identificacion]);
        res.json({ id: result.insertId, nombre, apellido, fecha_nacimiento, numero_identificacion });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
