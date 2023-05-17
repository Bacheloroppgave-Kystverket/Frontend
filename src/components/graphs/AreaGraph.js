import React from "react";
import { Line } from "react-chartjs-2";

/**
 * Makes an area graph
 * @param {data} data data to be shown on graph
 * @param {labels} labels labels to see on graph
 * @param {int} prosentage the percentage of the graph values
 * @returns the area graph
 */
export default function AreaGraph({ data, labels, prosentage }) {
  /**
   * Adds configuration to area graph
   */
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
