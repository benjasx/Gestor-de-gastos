// En tu componente React (ej. MainLayout.jsx o un componente de reporte)

import { generateTransactionsPdf } from "../utils/generatePdf"; // Importa tu función de generación
import pdfMake from "../utils/pdfFonts"; // Importa pdfMake ya configurado
import { useSelector } from "react-redux";

export const MyReport = ({ txByDate, mes, año }) => {
  // Obtén los datos necesarios de tu estado de Redux
  /* const { gastos, mainIngresos, gastosTotales, saladoDisponible } = useSelector(state => state.gastos); */

  const { saladoDisponible } = useSelector((state) => state.gastos);
  const totalIngresos = txByDate.reduce((acc, transaction) => {
    if (transaction.type === "ingreso") {
      // Convierte transaction.amount a un número flotante antes de sumar
      return acc + parseFloat(transaction.amount);
    }
    return acc;
  }, 0);

  const totalGastos = txByDate.reduce((acc, transaction) => {
    if (transaction.type === "gasto") {
      // Asumo que tienes una lógica similar para gastos
      // Convierte transaction.amount a un número flotante antes de sumar
      return acc + parseFloat(transaction.amount);
    }
    return acc;
  }, 0);

  // Ahora, el cálculo del saldo debería funcionar correctamente
  const saldo = totalIngresos - totalGastos;

  const mesConverter = () => {
    switch (mes) {
      case "01":
        return "Enero";
      case "02":
        return "Febrero";
      case "03":
        return "Marzo";
      case "04":
        return "Abril";
      case "05":
        return "Mayo";
      case "06":
        return "Junio";
      case "07":
        return "Julio";
      case "08":
        return "Agosto";
      case "09":
        return "Septiembre";
      case "10":
        return "Octubre";
      case "11":
        return "Noviembre";
      case "12":
        return "Diciembre";
      default:
        return "Mes inválido";
    }
  };

  const handleGeneratePdf = () => {
    // Llama a la función para obtener el "document definition"
    const docDefinition = generateTransactionsPdf(
      txByDate,
      totalIngresos,
      totalGastos,
      saldo,
      mesConverter(),
      año,
      saladoDisponible
    );

    // Crea el PDF y lo descarga
    pdfMake.createPdf(docDefinition).download("Reporte_Movimientos.pdf");
  };

  return (
    <div className="flex justify-end mt-1.5">
      {/* ... otros elementos de tu UI ... */}
      <button
        className="bg-blue-600 text-white px-3 py-1 rounded-md cursor-pointer"
        onClick={handleGeneratePdf}
      >
        Generar Un Reporte PDF
      </button>
    </div>
  );
};
