import { pool } from '../config/db.js';

export const getMedicos = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM medicos');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createMedico = async (req, res) => {
  const { nombre, apellido, especialidad } = req.body;
  try {
    const result = await pool.query('INSERT INTO medicos (nombre, apellido, especialidad) VALUES (?, ?, ?)', [nombre, apellido, especialidad]);
    res.json({ id: result.insertId, nombre, apellido, especialidad });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const loginMedico = async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await pool.query('SELECT * FROM medicos WHERE username = ? AND password = ?', [username, password]);
    
    if (rows.length > 0) {
      res.json({ success: true });
    } else {
      res.json({ success: false, message: 'Credenciales incorrectas' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
};
