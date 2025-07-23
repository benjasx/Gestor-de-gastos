// En tu componente React (ej. MainLayout.jsx o un componente de reporte)
import React from 'react';
import { useSelector } from 'react-redux';
import { generateTransactionsPdf } from '../utils/generatePdf'; // Importa tu función de generación
import pdfMake from '../utils/pdfFonts'; // Importa pdfMake ya configurado

export const MyReport = () => {
    // Obtén los datos necesarios de tu estado de Redux
    const { gastos, mainIngresos, gastosTotales, saladoDisponible } = useSelector(state => state.gastos);

    const handleGeneratePdf = () => {
        // Llama a la función para obtener el "document definition"
        const docDefinition = generateTransactionsPdf(gastos, mainIngresos, gastosTotales, saladoDisponible);

        // Crea el PDF y lo descarga
        pdfMake.createPdf(docDefinition).download('Reporte_Movimientos.pdf');
    };

    return (
        <div className='flex justify-end mt-1.5'>
            {/* ... otros elementos de tu UI ... */}
            <button
                className='bg-blue-600 text-white px-3 py-1 rounded-md cursor-pointer' 
                onClick={handleGeneratePdf}>
                Generar Un Reporte PDF
            </button>
        </div>
    );
};