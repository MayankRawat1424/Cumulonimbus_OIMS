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
          "rgba(255, 99, 132, 0.6)", // red
          "rgba(54, 162, 235, 0.6)", // blue
          "rgba(255, 206, 86, 0.6)", // yellow
          "rgba(75, 192, 192, 0.6)", // teal
          "rgba(153, 102, 255, 0.6)", // purple
          "rgba(255, 159, 64, 0.6)", // orange
          "rgba(199, 199, 199, 0.6)", // gray
          "rgba(83, 102, 255, 0.6)", // indigo
          "rgba(255, 99, 255, 0.6)", // pink
          "rgba(99, 255, 132, 0.6)", // green
          "rgba(255, 205, 210, 0.6)", // light pink
          "rgba(129, 212, 250, 0.6)", // sky blue
          "rgba(255, 241, 118, 0.6)", // light yellow
          "rgba(174, 213, 129, 0.6)", // light green
          "rgba(179, 157, 219, 0.6)", // lavender
        ],
      },
    ],
  };

  return <Pie data={data} options={options} />;
};

export default PieChart;
