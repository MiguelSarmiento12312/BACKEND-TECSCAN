import { pool } from '../config/db.js';

export const getPacientes = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM pacientes');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
