import { pool } from '../config/db.js';

const medicoController = {
  getMedicoInfo: async (req, res) => {
    try {
      // Obtener el ID del médico del token de autenticación
      const { id } = req.medico;

      // Buscar al médico en la base de datos por su ID
      const [rows] = await pool.query('SELECT id, nombre, apellido, email FROM medicos WHERE id = ?', [id]);

      // Si no se encuentra ningún médico con el ID proporcionado, devolver un error
      if (rows.length === 0) {
        return res.status(404).json({ success: false, message: 'Médico no encontrado' });
      }

      // Devolver la información del médico como respuesta
      const medicoInfo = rows[0];
      return res.status(200).json({ success: true, medico: medicoInfo });
    } catch (error) {
      console.error('Error al obtener la información del médico:', error);
      // Si hay un error durante el proceso, devolver un error de servidor
      return res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
  },

  updateMedicoInfo: async (req, res) => {
    // Método para actualizar la información del médico
  },

  deleteMedicoAccount: async (req, res) => {
    // Método para eliminar la cuenta del médico
  }
};

export default medicoController;
