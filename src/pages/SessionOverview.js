import React from "react";
import { useEffect, useState } from "react";
import AboutCard from "../components/AboutCard";
import EyeMetricBarGraph from "../components/EyeMetricBarGraph";
import FeedbackVisualizer from "../components/FeedbackVisualizer";
import NormalButton from "../components/openBridge/NormalButton";
import "../sessionOverview.css";

export default function SessionOverview({ session }) {
  var username = "";
  var date = "";
  var time = "";

  var positionRecords = null;
  var referencePosition = 0;

  if (session != null) {
    username = session.user.username;
    console.log(session);
    referencePosition = session.simulationSetup.referencePositions[0];
    time = getPositionTime([referencePosition], session.positionRecords);
    positionRecords = session.positionRecords;
  }

  /**
   * Finds the time for this position(s).
   * @param {*} referencePositions the reference positions.
   * @param {*} positionRecords the position records.
   * @returns the total time for the position(s)
   */
  function getPositionTime(referencePositions, positionRecords) {
    var totalTime = 0;
    for (var referencePosition of referencePositions) {
      for (var positonRecord of positionRecords) {
        if (referencePosition.locationID == positonRecord.locationId) {
          totalTime += parseFloat(positonRecord.positionDuration);
        }
      }
    }
    return totalTime;
  }

  return (
    <div className="session-overview-page">
      <div className="compare-button">
        <NormalButton className="" text="Compare" />
      </div>
      <div className="session-info">
        <div>
          <AboutCard username={username} date={date} time={time} />
        </div>
      </div>
      <div className="session-graph">
        <EyeMetricBarGraph
          session={session}
          referencePositionId={referencePosition.referencePositionId}
        />
      </div>
      <FeedbackVisualizer
        positionRecords={positionRecords}
        referencePositionId={referencePosition.referencePositionId}
      />
    </div>
  );
}
