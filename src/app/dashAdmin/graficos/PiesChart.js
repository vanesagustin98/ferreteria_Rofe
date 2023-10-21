import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useSelector } from "react-redux"; // Importa useSelector para acceder al estado global de Redux

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Pies() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Stock de productos",
        data: [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });

  // Obtén los datos de productos del estado global de Redux
  const products = useSelector((state) => state.products);

  useEffect(() => {
    const mostrar = (datos) => {
      if (Array.isArray(datos)) {
        const labels = [];
        const data = [];
        datos.filter((product) => product.isActive).forEach((element) => {
          labels.push(element.name);
          data.push(element.stock);
        });
        setChartData({
          ...chartData,
          labels: labels,
          datasets: [
            {
              ...chartData.datasets[0],
              data: data,
            },
          ],
        });
      }
    };


    mostrar(products);
  }, [products]); 

  let misoptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return <Pie data={chartData} options={misoptions} />;
}
