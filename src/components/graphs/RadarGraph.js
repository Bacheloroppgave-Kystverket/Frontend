import React from "react";
import { Radar } from "react-chartjs-2";

export default function RadarGraph({ data, labels }) {
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
