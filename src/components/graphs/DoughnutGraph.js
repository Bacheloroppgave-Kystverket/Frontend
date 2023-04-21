import React from "react";
import { Doughnut } from "react-chartjs-2";

export default function DoughnutGraph({ data, labels, prosentage }) {
  let colors = [
    "rgba(255, 99, 132, 0.2)",
    "rgba(54, 162, 235, 0.2)",
    "rgba(255, 206, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(153, 102, 255, 0.2)",
    "rgba(255, 159, 64, 0.2)",
  ];
  function addColor() {
    for (let i = 0; i < labels.length; i++) {
      for (let j = 0; j < data.length; j++) {
        let currentData = data[j];
        currentData["backgroundColor"] = colors;
        currentData["spacing"] = 2;
      }
    }
  }
  addColor();
  return (
    <Doughnut
      style={{ display: "flex", flexflow: "column" }}
      data={{
        labels: labels,
        datasets: data,
      }}
      height={450}
      width={408}
      options={{
        responsive: true,
        plugins: {
          datalabels: {
            anchor: "center",
            align: "center",
            formatter: function (value, context) {
              if (prosentage) {
                return value.toFixed(0) + " %";
              } else {
                return value.toFixed(2);
              }
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
  );
}
