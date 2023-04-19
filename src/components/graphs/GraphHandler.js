import React, { useState } from "react";
import BarGraph from "./BarGraph";
import DoughnutGraph from "./DoughnutGraph";
import PieGraph from "./PieGraph";
import DropdownMenu from "../menus/DropdownMenu";
import ButtonBar from "../openBridge/ButtonBar";
import BarGrap from "./BarGraph";
import PloarGraph from "./PloarGraph";
import RadarGraph from "./RadarGraph";
import AreaGraph from "./AreaGraph";

export default function GraphHandler({ dataAsArray, currentMetric }) {
  let [graphChoise, setGraphChoise] = useState(0);

  let graphMap = new Map();
  graphMap.set(0, "Bar");
  graphMap.set(1, "Pie");
  graphMap.set(2, "Donught");
  graphMap.set(3, "Polar");
  graphMap.set(4, "Radar");
  graphMap.set(5, "Area");
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
   * @returns the dataset.
   */
  function makeDataset(data, labelName) {
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

  function findGraph() {
    let labels = getLabels(dataAsArray);
    let data = makeDataSets(dataAsArray, labels);
    let graph = null;
    switch (graphChoise) {
      case 1:
        graph = <PieGraph data={data} labels={labels} />;
        break;
      case 2:
        graph = <DoughnutGraph data={data} labels={labels} />;
        break;
      case 3:
        graph = <PloarGraph data={data} labels={labels} />;
        break;
      case 4:
        graph = <RadarGraph data={data} labels={labels} />;
        break;
      case 5:
        graph = <AreaGraph data={data} labels={labels} />;
        break;
      default:
        graph = <BarGraph data={data} labels={labels} />;
        break;
    }
    return graph;
  }

  function changeGraph(value) {
    setGraphChoise(value);
  }

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexFlow: "column",
      }}
    >
      {findGraph()}
      <ButtonBar
        namesOfButtons={graphMap}
        activePosition={graphChoise}
        buttonFunction={changeGraph}
      />
    </div>
  );
}
