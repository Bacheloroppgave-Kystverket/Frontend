import React from "react";
import Card from "./openBridge/Card";
import "../css/card.css";
import NormalButton from "./openBridge/NormalButton";

/**
 * Makes a session card.
 * @param {session} session the session to make a card of.
 * @returns the session card.
 */
export default function SessionCard({ session }) {
  function makeContent() {
    let time = 0;
    //session.positionRecords
    let referencePositons = {};
    for (let i = 0; i < referencePositons.length; i++) {
      let position = referencePositons[i];
      time += parseFloat(position.positionDuration);
    }

    time = 3701;
    let timeString = "";
    let rawTime = time / 3600;
    let hour = Math.floor(rawTime);
    if (hour > 0) {
      timeString += hour + " hour(s)";
    }
    let minutes = Math.floor(time / 60 - hour * 60);
    let seconds = Math.floor(time - hour * 3600 - minutes * 60);
    if (seconds > 0 && minutes > 0) {
      timeString += ", " + minutes + " minute(s) and " + seconds + " second(s)";
    } else if (minutes > 0) {
      timeString += " and " + minutes + "minute(s)";
    }

    return (
      <div className="card-content">
        <div className="time-name-of-session">
          <span className="card-body-sub-text">{timeString}</span>
          <span className="card-body-sub-text">{session.user.username}</span>
        </div>
        <NormalButton text="See session" />
      </div>
    );
  }

  let dateArray = session.currentDate.split("T");
  let nameOfCard = dateArray[0];

  return (
    <div>
      <Card title={session.simulationSetup.setupName} content={makeContent()} />
    </div>
  );
}
