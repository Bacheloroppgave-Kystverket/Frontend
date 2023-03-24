import React from "react";
import { useEffect, useState } from "react";
import SingleGraph from "./SingleGraph";

const EyetrackingMetric = {
  Fixations: "Fixations",
  FixationDuration: "FixationDuration",
  AverageFixation: "AverageFixation",
};

export default function EyeMetricBarGraph({ session }) {
  const [arrayMap, setArrayMaps] = useState(null);

  var referencePositionId = 0;

  if (session != null) {
    var referencePosition = session.simulationSetup.referencePositions[0];
    referencePositionId = referencePosition.locationID;
    if (arrayMap == null) {
      findTotalMetrics(session, referencePositionId);
    }
  }

  /**
   * Finds the metrics of this session. If set to negative numbers it will find the metrics for all positions.
   * @param {*} session the session to find the metrics for.
   * @param {*} positionId the id of the position.
   */
  function findTotalMetrics(session, positionId) {
    var trackableObjects = session.simulationSetup.closeTrackableObjects;
    var trackableRecords = session.trackableRecordList;
    var fixationsMap = new Map();
    var fixationDurationMap = new Map();
    var averageFixationMap = new Map();
    for (var trackableRecord of trackableRecords) {
      var trackableObjectId = trackableRecord.trackableObjectId;
      var trackableObject = findTrackableObjectWithId(
        trackableObjects,
        trackableObjectId
      );
      for (var gazeData of trackableRecord.gazeList) {
        var typeOfObject = trackableObject.trackableType;
        if (gazeData.referencePositionId == positionId || positionId < 0) {
          var fixations = fixationsMap.get(typeOfObject);
          var newFixations = parseFloat(gazeData.fixations);
          var fixationDuration = fixationDurationMap.get(typeOfObject);
          var newFixationDuration = parseFloat(gazeData.fixationDuration);

          fixations =
            fixations == null ? newFixations : fixations + newFixations;
          fixationDuration =
            fixationDuration == null
              ? newFixationDuration
              : fixationDuration + newFixationDuration;
          fixationsMap.set(typeOfObject, fixations);
          fixationDurationMap.set(typeOfObject, fixationDuration);
        }
      }
    }
    for (var trackableType of fixationDurationMap.keys()) {
      var timeForType = fixationDurationMap.get(trackableType);
      var fixationsForType = fixationsMap.get(trackableType);
      averageFixationMap.set(trackableType, timeForType / fixationsForType);
    }
    setArrayMaps([fixationsMap, fixationDurationMap, averageFixationMap]);
  }

  /**
   * Finds the trackable object with matching id.
   * @param {*} trackableObjects the list of trackable objects.
   * @param {*} trackableObjectId the trackable object id.
   * @returns the trackable object that matches that id.
   */
  function findTrackableObjectWithId(trackableObjects, trackableObjectId) {
    var trackableObject = null;
    var i = 0;
    //Consider that we might get null here and should get protection at it yes.
    while (i < trackableObjects.length && trackableObject == null) {
      var objectToCheck = trackableObjects[i];
      if (trackableObjectId == objectToCheck.trackableObjectID) {
        trackableObject = objectToCheck;
      }
      i++;
    }
    return trackableObject;
  }

  /**
   * Gets the graph values and displays them based on what kind of metric we are using.
   * @param {*} metric the metric to use.
   * @param {*} arrayMap the array map.
   * @returns the graph or loading text to be shown.
   */
  function getGraphValues(metric, arrayMap) {
    var map = null;
    if (arrayMap != null) {
      if (EyetrackingMetric.AverageFixation == metric) {
        map = arrayMap[2];
      } else if (EyetrackingMetric.FixationDuration == metric) {
        map = arrayMap[0];
      } else if (EyetrackingMetric.Fixations) {
        map = arrayMap[1];
      }
    }
    var contentToDisplay = <p>Please wait while graphs are being made</p>;
    if (map != null) {
      contentToDisplay = <SingleGraph map={map} />;
    }
    return contentToDisplay;
  }

  return (
    <div>{getGraphValues(EyetrackingMetric.FixationDuration, arrayMap)}</div>
  );
}
