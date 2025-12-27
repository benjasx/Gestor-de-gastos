import { imageReportHeader } from "../helpers/imageReport";
import { footerSecction } from "./footer.section";

export const generateTransactionsPdf = (
  transactions,
  totalIngresos,
  totalGastos,
  saldoDisponible,
  mes,
  año,
  saladoDisponible
) => {
  const formattedTransactions = transactions.map((tx) => [
    { text: tx.date, style: "tableCell" },
    {
      text:
        tx.category.charAt(0).toUpperCase() +
        tx.category.slice(1).toLowerCase(),
      style: "tableCell",
    },
    { text: tx.description || "-", style: "tableCell" },
    {
      text: tx.type === "ingreso" ? `+$${Number(tx.amount).toFixed(2)}` : "",
      style: "incomeCell",
    },
    {
      text: tx.type === "gasto" ? `-$${Number(tx.amount).toFixed(2)}` : "",
      style: "expenseCell",
    },
  ]);

  const docDefinition = {
    pageMargins: [40, 110, 40, 60],
    header: {
      margin: [40, 20, 40, 0],
      columns: [
        {
          stack: [
            {
              text: "REPORTE MENSUAL",
              fontSize: 10,
              color: "#3498DB",
              bold: true,
            },
            {
              text: "Control de Transacciones",
              fontSize: 22,
              bold: true,
              color: "#2C3E50",
            },
            {
              text: `Periodo: ${mes} / ${año}`,
              fontSize: 12,
              color: "#7F8C8D",
            },
          ],
        },
        { image: imageReportHeader, width: 80, alignment: "right" },
      ],
    },
    footer: footerSecction,
    content: [
      // Sección de Resumen (Tarjetas horizontales)
      {
        table: {
          widths: ["*", "*", "*"],
          body: [
            [
              {
                stack: [
                  { text: "INGRESOS TOTALES DEL MES", style: "summaryTitle" },
                  {
                    text: `$${Number(totalIngresos).toFixed(2)}`,
                    style: "summaryValue",
                    color: "#27AE60",
                  },
                ],
                fillColor: "#F1F9F4",
                margin: [10, 10],
                border: [false, false, false, false],
              },
              {
                stack: [
                  { text: "GASTOS TOTALES DEL MES", style: "summaryTitle" },
                  {
                    text: `$${Number(totalGastos).toFixed(2)}`,
                    style: "summaryValue",
                    color: "#E74C3C",
                  },
                ],
                fillColor: "#FDF2F2",
                margin: [10, 10],
                border: [false, false, false, false],
              },
              {
                stack: [
                  { text: "SALDO GENERAL DISPONIBLE", style: "summaryTitle" },
                  {
                    text: `$${Number(saladoDisponible).toFixed(2)}`,
                    style: "summaryValue",
                    color: "#2C3E50",
                  },
                ],
                fillColor: "#EBf5FB",
                margin: [10, 10],
                border: [false, false, false, false],
              },
            ],
          ],
        },
        layout: { defaultBorder: false },
      },

      { text: "Detalle de Movimientos", style: "sectionHeader" },

      // Tabla Principal
      {
        style: "tableExample",
        table: {
          headerRows: 1,
          widths: ["auto", "auto", "*", "auto", "auto"],
          body: [
            [
              { text: "Fecha", style: "tableHeader" },
              { text: "Categoría", style: "tableHeader" },
              { text: "Descripción", style: "tableHeader" },
              { text: "Ingreso", style: "tableHeader", alignment: "right" },
              { text: "Gasto", style: "tableHeader", alignment: "right" },
            ],
            ...formattedTransactions,
          ],
        },
        layout: {
          hLineWidth: (i, node) =>
            i === 0 || i === node.table.body.length ? 0 : 0.5,
          vLineWidth: () => 0,
          hLineColor: () => "#BDC3C7",
          paddingLeft: () => 8,
          paddingRight: () => 8,
          paddingTop: () => 8,
          paddingBottom: () => 8,
          fillColor: (rowIndex) =>
            rowIndex % 2 === 0 && rowIndex !== 0 ? "#F9F9F9" : null,
        },
      },

      // Totales al final de la tabla
      {
        margin: [0, 10, 0, 0],
        table: {
          widths: ["*", "auto", "auto"],
          body: [
            [
              {
                text: "TOTALES ACUMULADOS",
                bold: true,
                fontSize: 10,
                alignment: "right",
                margin: [0, 5],
              },
              {
                text: `$${Number(totalIngresos).toFixed(2)}`,
                bold: true,
                color: "#27AE60",
                alignment: "right",
                margin: [0, 5],
              },
              {
                text: `$${Number(totalGastos).toFixed(2)}`,
                bold: true,
                color: "#E74C3C",
                alignment: "right",
                margin: [0, 5],
              },
            ],
          ],
        },
        layout: "noBorders",
      },
    ],

    styles: {
      tableHeader: {
        bold: true,
        fontSize: 11,
        color: "#2C3E50",
        fillColor: "#F2F4F4",
        margin: [0, 5],
      },
      tableCell: {
        fontSize: 10,
        color: "#34495E",
      },
      incomeCell: {
        fontSize: 10,
        color: "#27AE60",
        alignment: "right",
        bold: true,
      },
      expenseCell: {
        fontSize: 10,
        color: "#E74C3C",
        alignment: "right",
        bold: true,
      },
      sectionHeader: {
        fontSize: 14,
        bold: true,
        color: "#2C3E50",
        margin: [0, 25, 0, 10],
      },
      summaryTitle: {
        fontSize: 8,
        bold: true,
        color: "#7F8C8D",
      },
      summaryValue: {
        fontSize: 16,
        bold: true,
      },
    },
    defaultStyle: {
      font: "Roboto",
    },
  };

  return docDefinition;
};
