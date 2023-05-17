import React, { useEffect, useState } from "react";
import GraphHandler from "./GraphHandler";
import { func } from "prop-types";

/**
 * Handles the eye metrics and has the posibility to change graphs.
 * @param {session[]} sessions the sessions as an array.
 * @param {currentMetric} currentMetric the current metric to show data for.
 * @param {referencePositionId} referencePositionId the reference position id to show data for.
 * @returns the eye metric graph handler.
 */
export default function EyeMetricGraphCalculator({
  sessions,
  currentMetric,
  referencePositionId,
}) {
  const [dataAsArray, SetDataAsArray] = useState(new Map());

  useEffect(() => {
    calculateData(sessions);
  }, [sessions]);

  useEffect(() => {}, [referencePositionId]);

  /**
   * Calculates the data for the sessions.
   * @param {session[]} sessions the sessions.
   */
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
    sessionMap.set(session.sessionID + " by " + session.user.userName + " ", [
      calculateProsentage(fixationsMap),
      calculateProsentage(fixationDurationMap),
      calculateProsentage(averageFixationMap),
    ]);

    return sessionMap;
  }

  /**
   * Calculates the prosentage of the diffrent categories for each person.
   * @param {*} map the map.
   * @returns the new map with prosentages.
   */
  function calculateProsentage(map) {
    let it = map.keys();
    let key = it.next().value;
    let keys = [];
    let values = [];
    let total = 0;
    while (key != null) {
      keys.push(key);
      let value = map.get(key);
      values.push(value);
      total += value;
      key = it.next().value;
    }
    let prosentageMap = new Map();
    for (let i = 0; i < keys.length; i++) {
      if (total > 0) {
        prosentageMap.set(keys[i], (values[i] / total) * 100);
      } else {
        prosentageMap.set(keys[i], 0);
      }
    }
    return prosentageMap;
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
      let dataToPass = dataAsArray.get(referencePositionId);
      content = (
        <GraphHandler
          dataAsArray={dataToPass}
          currentMetric={currentMetric}
          prosentage={true}
        />
      );
    }

    return content;
  }

  return makeContent();
}
