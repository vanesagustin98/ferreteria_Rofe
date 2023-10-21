import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function Bars() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Ventas",
        data: [],
        backgroundColor: "rgba(220, 95, 0, 0.7)", 
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/sales");
        const datos = response.data;
        console.log("stock ", datos);
        mostrar(datos);
      } catch (error) {
        console.error(error);
      }
    };

    const mostrar = (datos) => {
      if (Array.isArray(datos)) {
        const labels = [];
        const data = [];
        datos.forEach((element) => {
          labels.push(element.saleDate);
          data.push(element.totalAmount);
        });
        setChartData({
          ...chartData,
          labels: labels,
          datasets: [{ ...chartData.datasets[0], data: data }],
        });
      }
    };

    fetchData();
  }, []); // useEffect se ejecuta solo una vez al montar el componente

  const misoptions = {
    responsive: true,
    animation: false,
    scales: {
      y: {
        min: 0,
        max: 500,
      },
      x: {
        ticks: { color: "rgba(220, 95, 0)" },
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

