import React, { useEffect, useState } from "react";
import NormalCard from "../openBridge/NormalCard";
import Card from "../openBridge/Card";
import GraphHandler from "../graphs/GraphHandler";
import { Dropdown } from "antd";
import DropdownButton from "antd/es/dropdown/dropdown-button";
import DropdownMenu from "../menus/DropdownMenu";
import "../../css/feedbackCard.css";
import CollapseCard from "./CollapseCard";

/**
 * Makes a feedback card
 * @param {sessions} sessions sessions to get feedback from
 * @param {Long} referencePositionId id of reference position
 * @returns a feedback card
 */
export default function FeedbackCard({ sessions, referencePositionId }) {
  const [feedback, setFeedback] = useState({
    map: new Map(),
    amountMap: new Map(),
    firstKey: 0,
  });

  const [currentFeedback, setCurrentFeedback] = useState(0);

  useEffect(() => {
    sortFeedback();
  }, [sessions]);

  /**
   * Sets the current number
   * @param {number} number
   */
  function setCurrent(number) {
    if (number != null) {
      setCurrentFeedback(number);
    }
  }

  /**
   * Makes the content of the feedback card.
   * @returns the feedback content.
   */
  function makeContent() {
    let loading = <p>Loading</p>;

    if (feedback.map.size > 0) {
      loading = (
        <div className="feedback-card-container">
          <DropdownMenu
            map={feedback.amountMap}
            currentChoise={currentFeedback}
            buttonFunction={setCurrent}
          />

          <GraphHandler
            dataAsArray={makeSessionUserArray(
              feedback.map.get(currentFeedback).get(referencePositionId)
            )}
            currentMetric={0}
            prosentage={true}
          />
        </div>
      );
    }
    return loading;
  }

  /**
   * Converts the feedback map to the already set format of the graph handler.
   * @param {*} map the map.
   * @returns the data as the correct array.
   */
  function makeSessionUserArray(map) {
    let array = [];
    for (let key of map.keys()) {
      let newMap = new Map();
      newMap.set(key, map.get(key));
      array.push(newMap);
    }

    return array;
  }

  /**
   * Sorts the feedback into a datastructure that might make sense.
   */
  function sortFeedback() {
    let map = new Map();
    let firstPositionId = -2;
    for (let i = 0; i < sessions.length; i++) {
      let session = sessions[i];
      let key = session.sessionID + " " + session.user.userName;

      let amountOfFeedbacks =
        session.positionRecords[0].adaptiveFeedbacks.length;
      let positionRecordsAmount = session.positionRecords.length;

      for (let x = 0; x < positionRecordsAmount; x++) {
        let postionRecord = session.positionRecords[x];
        let locationId = postionRecord.locationId;
        if (firstPositionId == -2) {
          firstPositionId = locationId;
        }
        for (let y = 0; y < amountOfFeedbacks; y++) {
          let adaptiveFeedback = postionRecord.adaptiveFeedbacks[y];
          let mapOfFeedback = convertToProsentage(
            adaptiveFeedback.feedbackList,
            adaptiveFeedback.positionTime
          );
          let currentFeedbackMap = getAndMakeMap(map, y);

          let posMap = getAndMakeMap(currentFeedbackMap, locationId);
          posMap.set(key, [mapOfFeedback]);
        }
      }
    }
    findTotalPerPosition(map);
    let amountMap = new Map();
    for (let i = 0; i < map.size; i++) {
      amountMap.set(i, i + 1);
    }
    setFeedback({
      map: map,
      firstKey: firstPositionId,
      amountMap: amountMap,
    });
  }

  /**
   * Finds the total for all the positons.
   * @param {*} map the total for all the positons per person.
   */
  function findTotalPerPosition(map) {
    let finalMap = [];
    for (let posKey of map.keys()) {
      let positionMap = map.get(posKey);
      let totalMap = new Map();
      for (let position of positionMap.keys()) {
        let userData = positionMap.get(position);
        for (let userKey of userData.keys()) {
          totalMap.set(
            userKey,
            totalMap.get(userKey) == null
              ? userData.get(userKey)
              : addTwoMetricMaps(
                  userData.get(userKey)[0],
                  totalMap.get(userKey)[0]
                )
          );
        }
      }
      positionMap.set(-1, totalMap);
      finalMap.push(totalMap);
    }
  }

  /**
   * Adds two metrics maps and returns the array in a an array.
   * @param {*} map1 the first map.
   * @param {*} map2 the second map.
   * @returns the new array with the map in it.
   */
  function addTwoMetricMaps(map1, map2) {
    let newMap = new Map();
    for (let key of map1.keys()) {
      let map1Value = map1.get(key);
      let map2Value = map2.get(key);
      newMap.set(key, (map1Value + map2Value) / 2);
    }
    return [newMap];
  }

  /**
   * Converts the arrat to a prosentage map.
   * @param {*} array the array of objects.
   * @param {*} totalTime the total time of the position.
   * @returns the map that represents the feedback.
   */
  function convertToProsentage(array, totalTime) {
    let newMap = new Map();
    for (let i = 0; i < array.length; i++) {
      let object = array[i];
      newMap.set(
        object.trackableType,
        totalTime == 0 ? 0 : (object.time / totalTime) * 100
      );
    }
    return newMap;
  }

  /**
   * Gets a map from another map. If the map is not present a new map is made.
   * @param {*} mapToGetValue the map to get the value from.
   * @param {*} key the key.
   * @returns the stored map or new map.
   */
  function getAndMakeMap(mapToGetValue, key) {
    let map = mapToGetValue.get(key);
    if (map == null) {
      map = new Map();
      mapToGetValue.set(key, map);
    }
    return map;
  }

  return <CollapseCard title="Feedback timeframes" content={makeContent()} />;
}
