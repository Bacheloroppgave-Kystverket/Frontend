import React, { useState } from "react";
import DropdownMenu from "./DropdownMenu";
import EyeMetricBarGraph from "./EyeMetricBarGraph";
import ButtonBar from "./openBridge/ButtonBar";
import NormalCard from "./openBridge/NormalCard";

export default function EyeMetricsCard({ session, referencePositionId }) {
  const [currentMetric, setCurrentMetric] = useState(0);

  let map = new Map();
  map.set(0, "Fixations");
  map.set(1, "Average fixation");
  map.set(2, "Fixation duration");

  console.log("Current metric " + currentMetric);
  if (currentMetric == null || currentMetric.length == 0) {
    setCurrentMetric(0);
  }
  /**
   * Makes the bargraph.
   * @returns the bargraph
   */
  function makeBarGraph() {
    return (
      <EyeMetricBarGraph
        session={session}
        referencePositionId={referencePositionId}
        metrics={map}
      />
    );
  }

  function changeMetric(newMetric) {
    setCurrentMetric(newMetric);
  }

  function makeDropdown() {
    return (
      <DropdownMenu
        map={map}
        currentChoise={currentMetric}
        buttonFunction={changeMetric}
      />
    );
  }

  return <NormalCard content={makeBarGraph()} headerContent={makeDropdown()} />;
}
