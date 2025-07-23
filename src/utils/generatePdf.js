import pdfMake from './pdfFonts'; // Importa pdfMake ya configurado con las fuentes


export const generateTransactionsPdf = (transactions, totalIngresos, totalGastos, saldoDisponible) => {
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
 pageMargins:[40,200,40,60], 
header: {
            image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QC8RXhpZgAASUkqAAgAAAAGABIBAwABAAAAAQAAABoBBQABAAAAVgAAABsBBQABAAAAXgAAACgBAwABAAAAAgAAABMCAwABAAAAAQAAAGmHBAABAAAAZgAAAAAAAABgAAAAAQAAAGAAAAABAAAABgAAkAcABAAAADAyMTABkQcABAAAAAECAwAAoAcABAAAADAxMDABoAMAAQAAAP//AAACoAMAAQAAANwFAAADoAMAAQAAAPQBAAAAAAAA/+EOkGh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSfvu78nIGlkPSdXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQnPz4KPHg6eG1wbWV0YSB4bWxuczp4PSdhZG9iZTpuczptZXRhLyc+CjxyZGY6UkRGIHhtbG5zOnJkZj0naHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyc+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczpBdHRyaWI9J2h0dHA6Ly9ucy5hdHRyaWJ1dGlvbi5jb20vYWRzLzEuMC8nPgogIDxBdHRyaWI6QWRzPgogICA8cmRmOlNlcX4KICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0nUmVzb3VyY2UnPgogICAgIDxBdHRyaWI6Q3JlYXRlZD4yMDI1LTA3LTIzPC9BdHRyaWI6Q3JlYXRlZD4KICAgICA8QXR0cmliOkV4dElkPmEzNWQ3NjlkLTRjMTMtNGU4YS1hYjhiLWNmNWEwY2MyYWNhOTwvQXR0cmliOkV4dElkPgogICAgIDxBdHRyaWI6RmJJZD41MjUyNjU5MTQxNzk1ODA8L0F0dHJpYjpGYklkPgogICAgIDxBdHRyaWI6VG91Y2hUeXBlPjI8L0F0dHJpYjpUb3VjaFR5cGU+CiAgICA8L3JkZjpsaT4KICAgPC9yZGY6U2VxPgogIDwvQXR0cmliOkFkcz4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpZXRpb24gcmRmMmFib3V0PScnCiAgeG1sbnM6ZGM9J2h0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvJz4KICA8ZGM6dGl0bGU+CiAgIDxyZGY6QWx0PgogICAgPHJkZjpsaSB4bWw6bGFuZz0neC1kZWZhdWx0Jz5XaGl0ZSBNaW5pbWFsaXN0IFNpbXBsZSBBZXN0aGV0aWMgTmFtZSBUd2l0dGVyIEhlYWRlciAtIDE8L29kZjpsaT4KICAgPC9yZGY6QWx0PgogIDwvZGM6dGl0bGU+CiA8L3JkZjpEZXNjcmlwdGlvbj4KCiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogIHhtbG5zOnBkZj0naHR0cDovL25zLmFkb2JlLmNvbS9wZGYvMS4zLyc+CiAgPHBkZjpBdXRob3I+QmVuamE8L3BkZjpBdXRob3I+CiA8L3JkZjpEZXNjcmlwdGlvbj4KCiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogIHhtbG5zOnhtcD0naHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyc+CiAgPHhtcDpDcmVhdG9yVG9vbD5DYW52YSAoUmVuZGVyZWQpIGRvYz1EQUd0OGR1OEhhMCB1c2VyPVVBRnJDVEhmcno4IGJyYW5kPUJBRnJDYTd5dW1JIHRlbXBsYXRlPVdoaXRlIE1pbmltYWxpc3QgU2ltcGxlIEFlc3RoZXRpYyBOYW1lIFR3aXR0ZXIgSGVhZGVyPC94bXA6Q3JlYXRvclRvb2w+CiA8L3JkZjpEZXNjcmlwdGlvbj4KPC9yZGY6UkRGPgo8L3g6eG1wbWV0YSBpbGxlZ2FsY2hhcnM+ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICICAgICAgICAgAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICICAgICAgICAgAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICICAgICAgICAgAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICICAgICAgICAgAK/9k='
            , width: 600,
            height: 130
        },

},
        content: [

            {
                margin: [0, 0, 20, 0],

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
        footer: {
            text: 'Reporte Financiero',
            alignment: 'center',
            fontSize: 12,
            margin: [0, 0, 0, 0]
        },

        defaultStyle: {
            font: 'Roboto'  // Changed from 'Helvetica' to 'Roboto' which is included in pdfmake by default
        }
    };

    return docDefinition;
};