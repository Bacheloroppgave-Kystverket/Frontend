import React, { useState } from "react";
import Card from "../openBridge/Card";
import "../../css/card.css";
import "../../css/sessionCard.css";
import NormalButton from "../openBridge/NormalButton";
import TimeText from "../TimeText";
import { Outlet, useNavigate } from "react-router-dom";

/**
 * Makes a session card.
 * @param {session} session the session to make a card of.
 * @param {function} setFunction the set session function.
 * @param {session} sessions the current sessions
 * @returns the session card.
 */
export default function SessionCard({ session, setFunction, sessions }) {
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
    function onOpenSession() {
      sessions.push(session);
      navigate("/session/overview", {
        state: {
          sessions: sessions,
        },
      });
    }

    /**
     * Opens compare session
     */
    function onOpenComparesession() {
      sessions.push(session);
      navigate("/session/overview", {
        state: {
          sessions: sessions,
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
          text={sessions.length == 0 ? "See session" : "Compare session(s)"}
          onClick={() => {
            sessions.length == 0 ? onOpenSession() : onOpenComparesession();
          }}
        />
      </div>
    );
  }

  let nameOfCard =
    session.simulationSetup.nameOfSetup +
    " " +
    session.currentDate.split("T")[0];

  return (
    <Card
      title={nameOfCard}
      content={makeContent()}
      extraClass="session-card"
    />
  );
}
