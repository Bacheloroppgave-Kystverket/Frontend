import React, { useEffect } from "react";
import { Bar, Chart } from "react-chartjs-2";

export default function DoubleBarGraph({ dataAsArray, currentMetric }) {
  /**
   * Makes the datasets from input.
   * @param {array} dataAsArray the data as array.
   * @param {array} labels the labels as an array.
   * @returns the datasets.
   */
  function makeDataSets(dataAsArray, labels) {
    let datasets = [];
    if (dataAsArray != null && labels != null) {
      for (let i = 0; i < dataAsArray.length; i++) {
        let name = dataAsArray[i].keys().next().value;
        let map = dataAsArray[i].get(name)[currentMetric];
        let data = [];
        for (let j = 0; j < labels.length; j++) {
          let currentLabel = labels[j];
          data.push(map.get(currentLabel) === null ? 0 : map.get(currentLabel));
        }
        datasets.push(makeDataset(data, name, i));
      }
    }

    return datasets;
  }

  /**
   * Makes a dataset from the input data.
   * @param {array} data the array of data.
   * @param {string} labelName the name of the label or dataset.
   * @param {int} count the count so that the color can be changed.
   * @returns the dataset.
   */
  function makeDataset(data, labelName, count) {
    return {
      label: labelName,
      data: data,
      barPercentage: 0.35,
    };
  }

  /**
   * Gets the diffrent labels from the data array.
   * @param {array} dataAsArray the data as an array.
   * @returns the labels.
   */
  function getLabels(dataAsArray) {
    let labels = [];
    if (dataAsArray != null) {
      for (let i = 0; i < dataAsArray.length; i++) {
        let name = dataAsArray[i].keys().next().value;
        let map = dataAsArray[i].get(name)[currentMetric];
        let localLabels = getKeysOfMapAsArary(map.keys());
        localLabels.forEach((label) => {
          if (!labels.includes(label)) {
            labels.push(label);
          }
        });
      }
    }
    return labels;
  }

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
  let labels = getLabels(dataAsArray);

  return (
    <div style={{ width: "100%" }}>
      <Bar
        style={{ display: "flex", flexflow: "column" }}
        data={{
          labels: labels,
          datasets: makeDataSets(dataAsArray, labels),
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
