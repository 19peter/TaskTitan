import React, { useState, useEffect } from "react";
import Chart from 'chart.js/auto';

const LineChart = ({ data }) => {
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    if (!chartInstance) {
        const myChartRef = document.getElementById('lineChart').getContext('2d');
        const newChartInstance = new Chart(myChartRef, {
          type: 'line',
          data: {
            labels: data.labels,
            datasets: [
              {
                label: 'Number of Members per project',
                data: data.values,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
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
  

  return<canvas id="lineChart" />;
};

export default LineChart;
