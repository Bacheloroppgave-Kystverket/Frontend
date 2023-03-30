import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { useEffect, useState } from "react";
import ChartDataLabels from "chartjs-plugin-datalabels";

export default function SingleGraph({ map }) {
  // register chart data labels to all graph
  Chart.register(ChartDataLabels);

  /**
   * Gets the keys or values of a map and turns it into an array.
   * @param {map} iterator the iterator of the map.
   * @returns the map as an array.
   */
  function getKeysOfMapAsArary(iterator) {
    var array = [];
    for (var value of iterator) {
      array.push(value);
    }
    return array;
  }

  var labels = map != null ? getKeysOfMapAsArary(map.keys()) : [];

  var data = map != null ? getKeysOfMapAsArary(map.values()) : [];

  return (
    <div className="graph-values">
      <Bar
        data={{
          // Name of the variables on x-axies for each bar
          labels: labels,
          datasets: [
            {
              // Data or value of your each variable
              data: data,
              barPercentage: 0.3,
              // Color of each bar
              backgroundColor: ["#0263FF", "#FF7723", "#8E30FF", "#530B27"],
            },
          ],
        }}
        // Height of graph
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
              ticks: {
                maxTicksLimit: 7,
              },
              border: {
                dash: [2, 4],
              },
              grid: {
                dash: [2, 4],
              },
              max: 2.5,
            },
          },
          plugins: {
            datalabels: {
              anchor: "end",
              align: "top",
              formatter: Math.round,
            },
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
}
