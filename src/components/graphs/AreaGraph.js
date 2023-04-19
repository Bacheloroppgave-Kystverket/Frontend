import React from "react";
import { Line } from "react-chartjs-2";

export default function AreaGraph({ data, labels }) {
  function addConfiguration() {
    for (let i = 0; i < labels.length; i++) {
      for (let j = 0; j < data.length; j++) {
        let currentData = data[j];
        currentData["spacing"] = 2;
        currentData["borderCapStyle"] = "rounded";
        currentData["pointRadius"] = 4;

        currentData["showLine"] = true;
        currentData["borderWidth"] = 2;
      }
    }
  }
  addConfiguration();
  return (
    <Line
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
            anchor: "top",
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
  );
}
