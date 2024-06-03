import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';

export const generatePDF = async (id_cita, id_detalles_encuesta) => {
    const doc = new PDFDocument();
    const pdfPath = path.join('path_to_save_pdf', `reporte_${id_cita}.pdf`);
    doc.pipe(fs.createWriteStream(pdfPath));
    
    doc.text(`Reporte para Cita ID: ${id_cita}`);
    doc.text(`Detalles de Encuesta ID: ${id_detalles_encuesta}`);
    doc.end();

    return pdfPath;
};
