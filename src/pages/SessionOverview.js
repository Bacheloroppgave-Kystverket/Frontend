import { func } from "prop-types";
import React from "react";
import { useEffect, useState } from "react";
import AboutCard from "../components/AboutCard";
import EyeMetricBarGraph from "../components/EyeMetricBarGraph";
import FeedbackVisualizer from "../components/FeedbackVisualizer";
import Card from "../components/openBridge/Card";
import NormalButton from "../components/openBridge/NormalButton";
import "../css/sessionOverview.css";

export default function SessionOverview({ session }) {
  var username = "";
  var date = "";
  var time = "";
  var title = "";

  var positionRecords = null;
  var referencePosition;

  var locationId = 0;

  if (session != null) {
    username = session.user.username;

    referencePosition = session.simulationSetup.referencePositionList[0];
    locationId = referencePosition.locationId;
    positionRecords = session.positionRecords;
    title = session.simulationSetup.nameOfSetup;

    time = getPositionTime([referencePosition], positionRecords);

    date = session.currentDate.split("T")[0];

    title = session.simulationSetup.nameOfSetup;
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
        if (referencePosition.locationId == positonRecord.locationId) {
          totalTime += parseFloat(positonRecord.positionDuration);
        }
      }
    }
    return totalTime;
  }

  /**
   * Makes the bargraph.
   * @returns the bargraph
   */
  function makeBarGraph() {
    return (
      <EyeMetricBarGraph session={session} referencePositionId={locationId} />
    );
  }

  return (
    <section className="session-overview-page">
      <div className="compare-about-section">
        <AboutCard
          className="session-info"
          username={username}
          date={date}
          time={time}
          sessionName={title}
        />
        <NormalButton className="compare-button" text="Compare" />
      </div>
      <Card content={makeBarGraph()} title={"hei"} className="gra" />
      <div className="session-graph"></div>
      <FeedbackVisualizer
        positionRecords={positionRecords}
        referencePositionId={locationId}
      />
    </section>
  );
}
