import { imageReportHeader } from '../helpers/imageReport';
import { footerSecction } from './footer.section';


export const generateTransactionsPdf = (transactions, totalIngresos, totalGastos, saldoDisponible, mes, año) => {
    // Formatea tus datos de transacciones para la tabla del PDF
    const formattedTransactions = transactions.map(tx => [
        tx.date,
        tx.category.charAt(0).toUpperCase() + tx.category.slice(1).toLowerCase(),
        tx.description || '',
        tx.type === 'ingreso' ? `$${Number(tx.amount).toFixed(2)}` : '',
        tx.type === 'gasto' ? `$${Number(tx.amount).toFixed(2)}` : ''
    ]);

    // Define la estructura del documento PDF
    const docDefinition = {
        pageMargins: [40, 120, 40, 60],
        header: {

            columns: [
                { text: 'Reporte de Transacciones', margin: [40, 30, 0, 20], fontSize: 20 },
                {image: imageReportHeader, width: 120, height: 120, alignment: 'right'}
            ],
        },
        footer: footerSecction,
        content: [
        {text: `Periodo: ${mes}/${año}`, fontSize: 16, margin: [0, 0, 0, 20]},
            {
                table: {
                    widths: ['auto', 'auto'],
                    body: [
                        [
                            { text: 'Ingresos Totales:', style: 'tableHeader', fillColor: '#404040', color: 'white' },
                            { text: `$${Number(totalIngresos).toFixed(2)}`, style: 'tableHeader', color: 'black' }
                        ],
                        [
                            { text: 'Gastos Totales:', style: 'tableHeader', fillColor: '#404040', color: 'white' },
                            { text: `$${Number(totalGastos).toFixed(2)}`, style: 'tableHeader', color: 'black' }
                        ],
                        [
                            { text: 'Total Disponible:', style: 'tableHeader', fillColor: '#404040', color: 'white' },
                            { text: `$${Number(saldoDisponible).toFixed(2)}`, style: 'tableHeader', color: 'black' }
                        ]
                    ]
                },
            },

            { text: '\n\nDetalle de Movimientos', margin: [0, 10, 0, 10], color: '#2C3E50', fontSize: 20 },
            {
                table: {
                    headerRows: 1,
                    widths: ['auto', 'auto', '*', 'auto', 'auto'],
                    body: [
                        [
                            { text: 'Fecha', style: 'tableHeader', fillColor: '#34495E', color: 'white' },
                            { text: 'Categoría', style: 'tableHeader', fillColor: '#34495E', color: 'white' },
                            { text: 'Descripción', style: 'tableHeader', fillColor: '#34495E', color: 'white' },
                            { text: 'Ingreso', style: 'tableHeader', fillColor: '#34495E', color: 'white' },
                            { text: 'Gasto', style: 'tableHeader', fillColor: '#34495E', color: 'white' }
                        ],
                        ...formattedTransactions
                    ]
                },

            },
            { text: '\n' },
            {
                table: {
                    widths: ['*', 'auto', 'auto'],
                    body: [
                        [
                            { text: 'Totales', style: 'tableHeader', fillColor: '#34495E', color: 'white' },
                            { text: `$${Number(totalIngresos).toFixed(2)}`, style: 'tableHeader', fillColor: '#34495E', color: 'white' },
                            { text: `$${Number(totalGastos).toFixed(2)}`, style: 'tableHeader', fillColor: '#34495E', color: 'white' }
                        ]
                    ]
                },

            },

        ],

        defaultStyle: {
            font: 'Roboto'  // Changed from 'Helvetica' to 'Roboto' which is included in pdfmake by default
        }
    };

    return docDefinition;
};