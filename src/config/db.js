import mysql from 'mysql2/promise';

// Configuración del pool de conexiones
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

pool.on('connection', function (connection) {
  console.log('Database connection established');
  connection.on('error', function (err) {
    console.error('MySQL error', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect();
    }
  });
  connection.on('close', function (err) {
    console.error('MySQL close', err);
    handleDisconnect();
  });
});

async function handleDisconnect() {
  try {
    await pool.getConnection();
    console.log('Reconnected to the database');
  } catch (err) {
    console.error('Error reconnecting to the database:', err);
    setTimeout(handleDisconnect, 2000); // Intentar reconectar después de 2 segundos
  }
}

handleDisconnect();

export { pool };
