import { pool } from '../config/db.js';
import { generatePDF } from '../utils/pdfGenerator.js';

export const getReportes = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM reportes');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const createReporte = async (req, res) => {
    const { id_cita, id_detalles_encuesta } = req.body;
    try {
        const pdfUrl = await generatePDF(id_cita, id_detalles_encuesta); // Implementa la lógica de generar PDF
        const [result] = await pool.query('INSERT INTO reportes (id_cita, id_detalles_encuesta, url_pdf) VALUES (?, ?, ?)', [id_cita, id_detalles_encuesta, pdfUrl]);
        res.json({ id: result.insertId, id_cita, id_detalles_encuesta, url_pdf: pdfUrl });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
