import React, { useState } from "react";
import DropdownMenu from "./DropdownMenu";
import EyeMetricBarGraph from "./EyeMetricBarGraph";
import ButtonBar from "./openBridge/ButtonBar";
import NormalCard from "./openBridge/NormalCard";
/**
 * Makes an instance of the metrics card.
 * @param {session} session the current session to show.
 * @param {referencePositionId} referencePositionId the id of the reference position.
 * @returns the eye metrics card with a bargraph.
 */
export default function EyeMetricsCard({ session, referencePositionId }) {
  const [currentMetric, setCurrentMetric] = useState(0);

  let map = new Map();
  map.set(0, "Fixations");
  map.set(1, "Fixation duration");
  map.set(2, "Average fixation");
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
        currentMetric={currentMetric}
      />
    );
  }

  /**
   * Changes the metric that is focused.
   * @param {*} newMetric the new metric.
   */
  function changeMetric(newMetric) {
    setCurrentMetric(newMetric);
  }

  /**
   * Makes the dropdown menu and button.
   * @returns The dropdown.
   */
  function makeDropdown() {
    return (
      <DropdownMenu
        map={map}
        currentChoise={currentMetric}
        buttonFunction={changeMetric}
        className="ob-card-header-title"
      />
    );
  }

  return <NormalCard content={makeBarGraph()} headerContent={makeDropdown()} />;
}
