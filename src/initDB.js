import { pool } from './config/db.js';

const createTables = async () => {
    const createDatabaseQuery = `
        CREATE DATABASE IF NOT EXISTS medical_app;
        USE medical_app;
    `;

    const createMedicosTable = `
        CREATE TABLE IF NOT EXISTS medicos (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nombre VARCHAR(100) NOT NULL,
            apellido VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL
        );
    `;

    const createPacientesTable = `
        CREATE TABLE IF NOT EXISTS pacientes (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nombre VARCHAR(100) NOT NULL,
            apellido VARCHAR(100) NOT NULL,
            fecha_nacimiento DATE,
            numero_identificacion VARCHAR(50) NOT NULL UNIQUE
        );
    `;

    const createCitasTable = `
        CREATE TABLE IF NOT EXISTS citas (
            id INT AUTO_INCREMENT PRIMARY KEY,
            id_medico INT NOT NULL,
            id_paciente INT NOT NULL,
            fecha_cita DATETIME NOT NULL,
            tipo_cita VARCHAR(100),
            FOREIGN KEY (id_medico) REFERENCES medicos(id),
            FOREIGN KEY (id_paciente) REFERENCES pacientes(id)
        );
    `;

    const createDetallesEncuestaTable = `
        CREATE TABLE IF NOT EXISTS detalles_encuesta (
            id INT AUTO_INCREMENT PRIMARY KEY,
            id_cita INT NOT NULL,
            nivel_salud ENUM('bien', 'regular', 'mal') NOT NULL,
            comentarios TEXT,
            FOREIGN KEY (id_cita) REFERENCES citas(id)
        );
    `;

    const createReportesTable = `
        CREATE TABLE IF NOT EXISTS reportes (
            id INT AUTO_INCREMENT PRIMARY KEY,
            id_cita INT NOT NULL,
            id_detalles_encuesta INT NOT NULL,
            fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            url_pdf VARCHAR(255) NOT NULL,
            FOREIGN KEY (id_cita) REFERENCES citas(id),
            FOREIGN KEY (id_detalles_encuesta) REFERENCES detalles_encuesta(id)
        );
    `;

    const createNegociosTable = `
        CREATE TABLE IF NOT EXISTS negocios (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nombre VARCHAR(100) NOT NULL,
            direccion VARCHAR(255),
            telefono VARCHAR(20)
        );
    `;

    const createContactosTable = `
        CREATE TABLE IF NOT EXISTS contactos (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nombre VARCHAR(100) NOT NULL,
            apellido VARCHAR(100),
            email VARCHAR(100),
            telefono VARCHAR(20)
        );
    `;

    try {
        const connection = await pool.getConnection();
        await connection.query(createDatabaseQuery);
        await connection.query(createMedicosTable);
        await connection.query(createPacientesTable);
        await connection.query(createCitasTable);
        await connection.query(createDetallesEncuestaTable);
        await connection.query(createReportesTable);
        await connection.query(createNegociosTable);
        await connection.query(createContactosTable);
        connection.release();
        console.log('Database and tables created successfully');
    } catch (err) {
        console.error('Error creating database and tables', err);
    }
};

createTables();
