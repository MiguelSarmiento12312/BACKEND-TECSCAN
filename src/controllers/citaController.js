import { pool } from '../config/db.js';

export const getCitas = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM citas');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const createCita = async (req, res) => {
    const { id_medico, id_paciente, fecha_cita, tipo_cita } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO citas (id_medico, id_paciente, fecha_cita, tipo_cita) VALUES (?, ?, ?, ?)', [id_medico, id_paciente, fecha_cita, tipo_cita]);
        res.json({ id: result.insertId, id_medico, id_paciente, fecha_cita, tipo_cita });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
