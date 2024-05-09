// import React, { useEffect, useState } from 'react';
// import Chart from 'chart.js/auto';

// const BarChart = ({ data }) => {
//   const [chartInstance, setChartInstance] = useState(null);

//   useEffect(() => {
//     if (!chartInstance) {
//       const myChartRef = document.getElementById('barChart').getContext('2d');
//       const newChartInstance = new Chart(myChartRef, {
//         type: 'bar',
//         data: {
//           labels: data.labels,
//           datasets: [
//             {
//               label: 'Number of Tasks per project',
//               data: data.values,
//               backgroundColor: 'rgba(255, 99, 132, 0.2)',
//               borderColor: 'rgba(255, 99, 132, 1)',
//               borderWidth: 1,
//             },
//           ],
//         },
//         options: {
//           scales: {
//             y: {
//               beginAtZero: true,
//             },
//           },
//         },
//       });
//       setChartInstance(newChartInstance);
//     } else {
//       // Update chart data if it already exists
//       chartInstance.data.labels = data.labels;
//       chartInstance.data.datasets[0].data = data.values;
//       chartInstance.update();
//     }
//   }, [data, chartInstance]);

//   return <canvas id="barChart" />;
// };

// export default BarChart;
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const BarChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
      const ctx = chartRef.current.getContext('2d');
      const newChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: data.labels,
          datasets: [
            {
              label: 'Number of Tasks per project',
              data: data.values,
              backgroundColor: 'rgba(255, 99, 132, 1)',
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
      chartInstanceRef.current = newChartInstance;
    }
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default BarChart;
