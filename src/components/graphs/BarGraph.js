import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import Chart from "chart.js/auto";

export default function BarGrap({ data, labels }) {
  Chart.register(ChartDataLabels);
  return (
    <div style={{ width: "100%" }}>
      <Bar
        style={{ display: "flex", flexflow: "column" }}
        data={{
          labels: labels,
          datasets: data,
        }}
        height={450}
        width={408}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              grid: {
                offset: true,
              },
              border: {
                dash: [2, 4],
              },
            },
            y: {
              grid: {
                offset: true,
              },
              ticks: {
                maxTicksLimit: 7,
              },
              border: {
                dash: [2, 4],
              },
            },
          },

          plugins: {
            datalabels: {
              anchor: "end",
              align: "top",
              formatter: function (value, context) {
                return value.toFixed(2);
              },
            },
            legend: {
              position: "bottom",
              labels: {
                usePointStyle: true,
              },
            },
          },
        }}
      />
    </div>
  );
}
