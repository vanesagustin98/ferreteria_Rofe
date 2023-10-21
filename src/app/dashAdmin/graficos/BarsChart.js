import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, Filler } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, Filler);

export default function Bars() {
  // Utiliza useSelector para obtener el estado global de Redux
  const allProducts = useSelector((state) => state.products);

  // Utiliza el estado local para almacenar los datos del gráfico
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Precio por Producto",
        data: [],
        backgroundColor: "rgba(0, 220, 195, 0.5)",
      },
    ],
  });

  useEffect(() => {
    // Función para obtener los datos de productos del estado global de Redux
    const obtenerDatosDeProductos = () => {
      const labels = [];
      const data = [];
//aaaaaaa
      // Filtra los productos activos y obtiene sus nombres y costos
      allProducts.filter((product) => product.isActive).forEach((element) => {
        labels.push(element.name);
        data.push(element.costoActual);
      });

      // Actualiza el estado local del gráfico con los datos obtenidos
      setChartData({
        ...chartData,
        labels: labels,
        datasets: [{ ...chartData.datasets[0], data: data }],
      });
    };

    // Llama a la función para obtener los datos de productos
    obtenerDatosDeProductos();
  }, [allProducts]); // useEffect se ejecuta cada vez que allProducts cambia en el estado global de Redux

  const misoptions = {
    responsive: true,
    animation: false,
    scales: {
      y: {
        min: 0,
        max: 1000,
      },
      x: {
        ticks: { color: "rgba(0, 220, 195)" },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return <Bar data={chartData} options={misoptions} />;
}
