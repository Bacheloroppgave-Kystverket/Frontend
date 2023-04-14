import React from "react";
import { useEffect, useState } from "react";
import Card from "../openBridge/Card";
import NormalCard from "../openBridge/NormalCard";
import TimeText from "../TimeText";
import Close from "@mui/icons-material/Close";

import "../../css/aboutcard.css";

export default function AboutCard({ session, onClick }) {
  let username = "";
  let date = "";
  let time = "";
  let title = "";
  let positionRecords = null;

  useEffect(() => {}, [session]);

  if (session != null) {
    username = session.user.userName;
    title = session.simulationSetup.nameOfSetup;
    positionRecords = session.positionRecords;
    time = getPositionTime(
      session.simulationSetup.referencePositionList,
      positionRecords
    );

    date = session.currentDate.split("T")[0];
  } else {
    title = "no session";
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

  function makeContent(username, date, time) {
    return (
      <div className="card-content">
        <div className="trainee-name-">
          <div className="ob-sub-title">Session ID: </div>
          <div className="ob-title" style={{ fontWeight: "600" }}>
            {session.sessionID}
          </div>
        </div>
        <div className="trainee-name-">
          <div className="ob-sub-title">Trainee: </div>
          <div className="ob-title" style={{ fontWeight: "600" }}>
            {username}
          </div>
        </div>
        <div className="date">
          <div className="ob-sub-title">Date of session:</div>
          <div className="ob-title" style={{ fontWeight: "600" }}>
            {date}
          </div>
        </div>
        <div className="time">
          <div className="ob-sub-title">Time of seat:</div>
          <TimeText
            positionTime={time}
            className="ob-title"
            style={{ fontWeight: "600" }}
          />
        </div>
      </div>
    );
  }

  function makeTitleContent() {
    return (
      <div className="about-header-content">
        <div className="ob-card-header-title">{title}</div>
        <Close
          className={"ob-icon mdi mdi-menu"}
          fontSize="30px"
          onClick={() => onClick(session)}
        />
      </div>
    );
  }

  return (
    <NormalCard
      content={makeContent(username, date, time)}
      headerContent={makeTitleContent()}
      className="about-card"
    />
  );
}
