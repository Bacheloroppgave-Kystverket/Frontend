import React, { useEffect, useState } from "react";
import SingleGraph from "./SingleGraph";
import DoubleBarGraph, { DoubleGraph } from "./DoubleBarGraph";

export default function EyeMetricGraphHandler({
  sessions,
  currentMetric,
  referencePositionId,
}) {
  const [dataAsArray, SetDataAsArray] = useState(new Map());

  useEffect(() => {
    calculateData(sessions);
  }, [sessions]);

  useEffect(() => {}, [referencePositionId]);

  function calculateData(sessions) {
    let map = new Map();
    if (sessions.length > 0) {
      let referencePositions =
        sessions[0].simulationSetup.referencePositionList;
      for (let j = -1; j < referencePositions.length; j++) {
        let position = j < 0 ? j : referencePositions[j].locationId;
        let positionArray = [];
        for (let i = 0; i < sessions.length; i++) {
          positionArray.push(findTotalMetrics(sessions[i], position));
        }
        map.set(position, positionArray);
      }
    }

    SetDataAsArray(map);
  }

  function findTotalTime() {}

  /*
  
    */

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
          var newFixations =
            parseFloat(gazeData.fixations) == null
              ? 0
              : parseFloat(gazeData.fixations);
          var fixationDuration = fixationDurationMap.get(typeOfObject);
          var newFixationDuration =
            parseFloat(gazeData.fixationDuration) == null
              ? 0
              : parseFloat(gazeData.fixationDuration);

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
    let sessionMap = new Map();
    sessionMap.set(session.sessionID + " by " + session.user.userName, [
      fixationsMap,
      fixationDurationMap,
      averageFixationMap,
    ]);
    return sessionMap;
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
   * Makes the content of the eye metric graph handler.
   * @returns the content.
   */
  function makeContent() {
    let content = <p>Loading</p>;

    if (dataAsArray.size > 0) {
      if (dataAsArray.get(referencePositionId).length == 1) {
        console.log(
          dataAsArray.get(referencePositionId)[0].keys().next().value
        );
        let key = dataAsArray.get(referencePositionId)[0].keys().next().value;
        content = (
          <SingleGraph
            map={
              dataAsArray.get(referencePositionId)[0].get(key)[currentMetric]
            }
          />
        );
      } else if (dataAsArray.get(referencePositionId).length > 1) {
        let dataToPass = dataAsArray.get(referencePositionId);
        content = (
          <DoubleBarGraph
            dataAsArray={dataToPass}
            currentMetric={currentMetric}
          />
        );
      }
    }

    return content;
  }

  return makeContent();
}
