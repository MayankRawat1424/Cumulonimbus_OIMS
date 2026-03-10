import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
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
          "rgba(255, 99, 132, 0.75)", // red
          "rgba(54, 162, 235, 0.75)", // blue
          "rgba(255, 206, 86, 0.75)", // yellow
          "rgba(75, 192, 192, 0.75)", // teal
          "rgba(153, 102, 255, 0.75)", // purple
          "rgba(255, 159, 64, 0.75)", // orange
          "rgba(201, 203, 207, 0.75)", // gray
          "rgba(102, 126, 255, 0.75)", // indigo
          "rgba(255, 105, 180, 0.75)", // pink
          "rgba(76, 217, 100, 0.75)", // green
          "rgba(255, 182, 193, 0.75)", // light pink
          "rgba(100, 181, 246, 0.75)", // sky blue
          "rgba(255, 235, 120, 0.75)", // light yellow
          "rgba(156, 204, 101, 0.75)", // light green
          "rgba(179, 157, 219, 0.75)", // lavender
        ],
      },
    ],
  };

  return <Pie data={data} options={options} />;
};

export default PieChart;
