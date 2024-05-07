import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";

const DoughnutChart = ({ data }) => {
  const [chartInstance, setChartInstance] = useState(null);
  useEffect(() => {
    if (!chartInstance) {
      const myChartRef = document
        .getElementById("doughnutChart")
        .getContext("2d");
      const newChartInstance = new Chart(myChartRef, {
        type: "doughnut",
        data: {
          labels: data.labels,
          datasets: [
            {
              label: "Tasks states",
              data: data.values,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
      setChartInstance(newChartInstance);
    } else {
      chartInstance.data.labels = data.labels;
      chartInstance.data.datasets[0].data = data.values;
      chartInstance.update();
    }
  }, [data, chartInstance]);
  return <canvas id="doughnutChart" />;
};

export default DoughnutChart;
