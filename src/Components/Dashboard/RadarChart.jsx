import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

const RadarChart = ({ data }) => {
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    if (!chartInstance) {
      const myChartRef = document.getElementById('myChart').getContext('2d');
      const newChartInstance = new Chart(myChartRef, {
        type: 'radar',
        data: {
          labels: data.labels,
          datasets: [
            {
              label: 'My First Dataset',
              data: data.values,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            r: {
              beginAtZero: true,
            },
          },
        },
      });
      setChartInstance(newChartInstance);
    } else {
      // Update chart data if it already exists
      chartInstance.data.labels = data.labels;
      chartInstance.data.datasets[0].data = data.values;
      chartInstance.update();
    }
  }, [data, chartInstance]);

  return <canvas id="myChart" />;
};

export default RadarChart;
