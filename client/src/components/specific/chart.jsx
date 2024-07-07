import React from "react";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart,
  Tooltip,
  Filler,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend,
} from "chart.js";

Chart.register(
  Tooltip,
  Filler,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend
);

export const LineChart = () => {
  const data = {
    labels: ["jaunary", "feburaray", "march", "aprail", "aewa", "adsfkj"],
    datasets: [],
  };

  return (
    <>
      <Line data={data} />
    </>
  );
};

export const DougnhoutChart = () => {};
