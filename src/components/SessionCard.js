import React, { useState } from "react";
import Card from "./openBridge/Card";
import "../css/card.css";
import NormalButton from "./openBridge/NormalButton";
import TimeText from "./TimeText";

/**
 * Makes a session card.
 * @param {session} session the session to make a card of.
 * @param {setFunction} setFunction the set session function..
 * @returns the session card.
 */
export default function SessionCard({ session, setFunction }) {
  /**
   * Makes the content for the session card.
   * @returns the content.
   */
  function makeContent() {
    let time = 0;
    let referencePositons = session.positionRecords;
    console.log(referencePositons);
    for (let i = 0; i < referencePositons.length; i++) {
      let position = referencePositons[i];
      console.log(position.positionDuration);
      time += parseFloat(position.positionDuration);
    }

    return (
      <div className="card-content">
        <div className="time-name-of-session">
          <TimeText positionTime={time} className="card-body-sub-text" />
          <span className="card-body-sub-text">{session.user.userName}</span>
        </div>
        <NormalButton text="See session" onClick={() => setFunction(session)} />
      </div>
    );
  }

  let dateArray = session.currentDate.split("T");
  let nameOfCard = session.simulationSetup.nameOfSetup + " - " + dateArray[0];

  return (
    <div>
      <Card title={nameOfCard} content={makeContent()} />
    </div>
  );
}
