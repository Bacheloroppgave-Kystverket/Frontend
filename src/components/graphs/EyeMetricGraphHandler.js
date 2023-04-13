import React, { useEffect, useState } from 'react'
import SingleGraph from './SingleGraph';
import DoubleGraph from './DoubleGraph';

export default function EyeMetricGraphHandler({sessions, currentMetric, referencePositionId}) {
    const [dataAsArray, SetDataAsArray] = useState();

    useEffect(() => {
        calculateData(sessions);
    }, [sessions])
    

    function calculateData(sessions){
        let array = [];
        for(let i = 0; i < sessions.length; i++){
            console.log(sessions[i])
            array.push(findTotalMetrics(sessions[i], referencePositionId))
        }
        SetDataAsArray(array);
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
    ///Username here must be changed
    sessionMap.set(0, [fixationsMap, fixationDurationMap, averageFixationMap]);
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

  function makeContent(){
    let number = dataAsArray != null ? dataAsArray.length : 0;
    let content = (
        <p>
            Loading
        </p>
    );
    if(dataAsArray != null && dataAsArray.length == 1){
        console.log("Data as array")
        console.log(dataAsArray[0].get(0)[currentMetric])
        content = (
            <SingleGraph map={dataAsArray[0].get(0)[currentMetric]}/>
        );
    }else if (dataAsArray != null && dataAsArray.length > 1){
        content = (
            <DoubleGraph dataAsArray={dataAsArray} currentMetric={currentMetric}/>
        );
    }
    return content
  }

  return makeContent();
}
