import { pool } from '../config/db.js';

export const getMedicos = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM medicos');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const createMedico = async (req, res) => {
    const { nombre, apellido, email, password } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO medicos (nombre, apellido, email, password) VALUES (?, ?, ?, ?)', [nombre, apellido, email, password]);
        res.json({ id: result.insertId, nombre, apellido, email });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
