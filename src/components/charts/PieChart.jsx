import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom", // 🔥 This moves labels below
    },
  },
};

const PieChart = ({ chartData }) => {
  if (!chartData || !chartData.labels) {
    return <p>Loading chart...</p>;
  }

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        data: chartData.values,
        label: "Distribution",
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
      },
    ],
  };

  return <Pie data={data} options={options} />;
};

export default PieChart;
