import React, { useState } from "react";
import Card from "../openBridge/Card";
import "../../css/card.css";
import NormalButton from "../openBridge/NormalButton";
import TimeText from "../TimeText";
import { Outlet, useNavigate } from "react-router-dom";

/**
 * Makes a session card.
 * @param {session} session the session to make a card of.
 * @param {setFunction} setFunction the set session function.
 * @param {session} sessionToCompareAgainst set to true if you are going to compare sessions.
 * @returns the session card.
 */
export default function SessionCard({ session, setFunction, sessionToCompareAgainst }) {
  
  let navigate = useNavigate();

  /**
   * Makes the content for the session card.
   * @returns the content.
   */
  function makeContent() {
    let time = 0;
    let referencePositons = session.positionRecords;
    for (let i = 0; i < referencePositons.length; i++) {
      let position = referencePositons[i];
      time += parseFloat(position.positionDuration);
    }

    /**
     * Opens the session.
     */
    function onOpenSession(){
      navigate("/session/overview", {
        state: {
          session: session,
        },
      });
    }

    function onOpenComparesession(){
      navigate("/session/overview", {
        state: {
          session: session,
          compareSession: sessionToCompareAgainst,
        },
      });
    }

    return (
      <div className="card-content">
        <div className="time-name-of-session">
          <TimeText positionTime={time} className="card-body-sub-text" />
          <span className="card-body-sub-text">{session.user.userName}</span>
        </div>
        <NormalButton
          text={sessionToCompareAgainst == null ? "See session" : "Compare session(s)"}
          onClick={() => {
            sessionToCompareAgainst == null ? onOpenSession() : onOpenComparesession();
          }}
        />
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
