import React from "react";
import { Radar } from "react-chartjs-2";

/**
 * Makes radar graph
 * @param {data} data data to be shown on graph
 * @param {labels} labels labels to see on graph
 * @param {int} prosentage the percentage of the graph values
 * @returns radar graph
 */
export default function RadarGraph({ data, labels, prosentage }) {
  return (
    <Radar
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
            align: "right",
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
