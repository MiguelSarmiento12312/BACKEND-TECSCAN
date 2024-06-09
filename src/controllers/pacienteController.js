import { pool } from '../config/db.js';

export const getPacienteByQR = async (req, res) => {
    const { numero_identificacion } = req.body;
    try {
        const [rows] = await pool.query('SELECT * FROM pacientes WHERE numero_identificacion = ?', [numero_identificacion]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Paciente no encontrado' });
        }
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
