// src/utils/pdfFonts.js
import pdfMake from 'pdfmake/build/pdfmake';
import vfsFonts from 'pdfmake/build/vfs_fonts'; // Importa directamente el objeto 'vfs'

// Asigna las fuentes a pdfMake
pdfMake.vfs = vfsFonts; // <-- ¡Esta es la línea clave y correcta!

// Exporta pdfMake ya configurado
export default pdfMake;