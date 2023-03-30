import { func } from "prop-types";
import React from "react";
import { useEffect, useState } from "react";
import AboutCard from "../components/AboutCard";
import EyeMetricBarGraph from "../components/EyeMetricBarGraph";
import FeedbackVisualizer from "../components/FeedbackVisualizer";
import ButtonBar from "../components/openBridge/ButtonBar";
import Card from "../components/openBridge/Card";
import NormalButton from "../components/openBridge/NormalButton";
import "../css/sessionOverview.css";

export default function SessionOverview({ session }) {
  var username = "";
  var date = "";
  var time = "";
  var title = "";

  var positionRecords = null;
  const [locationId, setLocationId] = useState(-1);

  useEffect(() => {
    if (session != null) {
      username = session.user.username;
      positionRecords = session.positionRecords;
      title = session.simulationSetup.nameOfSetup;

      time = getPositionTime(
        session.simulationSetup.referencePositionList,
        positionRecords
      );

      date = session.currentDate.split("T")[0];

      title = session.simulationSetup.nameOfSetup;
    }
  }, [locationId]);

  function switchLocationId(id) {
    console.log("pog");
    setLocationId(id);
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

  function makeButtonBar() {
    let names = new Map();
    if (session != null) {
      names.set(-1, "All seats");
      session.simulationSetup.referencePositionList.forEach((position) => {
        names.set(position.locationId, position.locationName);
      });
    } else {
      names.set(-1, "No names");
    }
    return (
      <ButtonBar
        namesOfButtons={names}
        activePosition={locationId}
        buttonFunction={switchLocationId}
      />
    );
  }

  return (
    <section className="session-overview-page">
      {makeButtonBar()}
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
