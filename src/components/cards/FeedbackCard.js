import React, { useEffect, useState } from "react";
import NormalCard from "../openBridge/NormalCard";
import Card from "../openBridge/Card";
import GraphHandler from "../graphs/GraphHandler";
import { Dropdown } from "antd";
import DropdownButton from "antd/es/dropdown/dropdown-button";
import DropdownMenu from "../menus/DropdownMenu";
import "../../css/feedbackCard.css";

export default function FeedbackCard({ sessions, referencePositionId }) {
  const [feedback, setFeedback] = useState({
    map: new Map(),
    amountMap: new Map(),
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
              feedback.map.get(currentFeedback)
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
    let lastFeedback = new Map();

    for (let i = 0; i < sessions.length; i++) {
      let session = sessions[i];
      let key = session.sessionID + " " + session.user.userName;
      for (let x = 0; x < session.positionRecords.length; x++) {
        let record = session.positionRecords[x];

        for (let j = 0; j < record.adaptiveFeedbacks.length; j++) {
          let adaptiveFeedback = record.adaptiveFeedbacks[j];

          let positionTime = adaptiveFeedback.positionTime;
          let feedbackList = adaptiveFeedback.feedbackList;
          let feedbackMap = new Map();
          for (let f = 0; f < feedbackList.length; f++) {
            let feedbackItem = feedbackList[f];
            feedbackMap.set(
              feedbackItem.trackableType,

              (feedbackItem.time / positionTime) * 100
            );
            let feed = lastFeedback.get(j);
            if (feed == null) {
              feed = new Map();
              lastFeedback.set(f, feed);
            }
            feed.set(key, [feedbackMap]);
          }
        }
      }
    }

    let amountMap = new Map();
    for (let i = 0; i < lastFeedback.size; i++) {
      amountMap.set(i, i + 1);
    }
    setFeedback({
      map: lastFeedback,
      amountMap: amountMap,
    });
  }

  return <Card title="Feedback timeframes" content={makeContent()} />;
}
