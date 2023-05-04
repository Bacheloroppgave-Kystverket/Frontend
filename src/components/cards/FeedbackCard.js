import React, { useEffect, useState } from "react";
import NormalCard from "../openBridge/NormalCard";
import Card from "../openBridge/Card";
import GraphHandler from "../graphs/GraphHandler";
import { Dropdown } from "antd";
import DropdownButton from "antd/es/dropdown/dropdown-button";
import DropdownMenu from "../menus/DropdownMenu";
import "../../css/feedbackCard.css";
import CollapseCard from "./CollapseCard";

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
    let newFeedbackMap = new Map();

    let firstPositionId = 0;
    for (let i = 0; i < sessions.length; i++) {
      let session = sessions[i];
      let key = session.sessionID + " " + session.user.userName;
      for (let x = 0; x < session.positionRecords.length; x++) {
        let record = session.positionRecords[x];
        for (let j = 0; j < record.adaptiveFeedbacks.length; j++) {
          let adaptiveFeedback = record.adaptiveFeedbacks[j];

          if (firstPositionId == 0) {
            firstPositionId = record.locationId;
          }
          let positionTime = adaptiveFeedback.positionTime;
          let feedbackList = adaptiveFeedback.feedbackList;
          let feedbackMap = new Map();
          for (let f = 0; f < feedbackList.length; f++) {
            let currentAdaptiveFeedbackMap = newFeedbackMap.get(j);
            let feedbackItem = feedbackList[f];
            let timeForFeedback = (feedbackItem.time / positionTime) * 100;

            if (currentAdaptiveFeedbackMap == null) {
              currentAdaptiveFeedbackMap = new Map();
              newFeedbackMap.set(f, currentAdaptiveFeedbackMap);
            }
            let positionMap = currentAdaptiveFeedbackMap.get(record.locationId);
            if (positionMap == null) {
              positionMap = new Map();
              currentAdaptiveFeedbackMap.set(record.locationId, positionMap);
            }
            let totalPostionMap = currentAdaptiveFeedbackMap.get(-1);
            if (totalPostionMap == null) {
              totalPostionMap = new Map();
              currentAdaptiveFeedbackMap.set(-1, totalPostionMap);
            }
            let totalDataMap = totalPostionMap.get(key);
            if (totalDataMap == null) {
              totalDataMap = new Map();
              totalPostionMap.set(key, [totalDataMap]);
            } else {
              totalDataMap = totalDataMap[0];
            }
            let value =
              totalDataMap.get(feedbackItem.trackableType) == null
                ? timeForFeedback
                : (totalDataMap.get(feedbackItem.trackableType) +
                    timeForFeedback) /
                  2;
            totalDataMap.set(feedbackItem.trackableType, value);
            feedbackMap.set(feedbackItem.trackableType, timeForFeedback);

            positionMap.set(key, [feedbackMap]);
          }
        }
      }
    }

    let amountMap = new Map();
    for (let i = 0; i < newFeedbackMap.size; i++) {
      amountMap.set(i, i + 1);
    }
    setFeedback({
      map: newFeedbackMap,
      firstKey: firstPositionId,
      amountMap: amountMap,
    });
  }

  return <CollapseCard title="Feedback timeframes" content={makeContent()} />;
}
