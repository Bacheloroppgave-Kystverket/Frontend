import React from "react";

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
