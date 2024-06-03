// src/controllers/medicoController.js
import { pool } from '../config/db.js';

const medicoController = {
  getMedicoInfo: async (req, res) => {
    try {
      const { id } = req.medico;

      const [rows] = await pool.query('SELECT id, nombre, apellido, email FROM medicos WHERE id = ?', [id]);

      if (rows.length === 0) {
        return res.status(404).json({ success: false, message: 'Médico no encontrado' });
      }

      return res.status(200).json({ success: true, medico: rows[0] });
    } catch (error) {
      console.error('Error al obtener la información del médico:', error);
      return res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
  },

  // Otros métodos para actualizar o eliminar información del médico
};

export default medicoController;
