import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import Chart from "chart.js/auto";

/**
 * Makes a bar graph
 * @param {data} data the data to be shown on graph
 * @param {labels} labels the labels to see on graph
 * @param {int} prosentage the percentage of the graph values
 * @returns bar graph
 */
export default function BarGrap({ data, labels, prosentage }) {
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
              max: prosentage ? 100 : null,
            },
          },

          plugins: {
            datalabels: {
              anchor: "end",
              align: "top",
              formatter: function (value, context) {
                return value.toFixed(0) + " %";
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
