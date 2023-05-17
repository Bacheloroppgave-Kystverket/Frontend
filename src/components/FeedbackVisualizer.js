import React from "react";

/**
 * Makes a visualizer for feedback
 * @param {*} positionRecords record of position
 * @param {float} referencePositionId id of the reference position
 * @returns the visualizer for feedback
 */
export default function FeedbackVisualizer({
  positionRecords,
  referencePositionId,
}) {
  if (positionRecords != null && referencePositionId != null) {
    seperateCategories(positionRecords, referencePositionId);
  }
  function seperateCategories(positionRecords, referencePositionId) {}

  return <div></div>;
}
