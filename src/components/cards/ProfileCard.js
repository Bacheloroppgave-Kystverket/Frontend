import React, { useEffect, useState } from "react";
import Card from "../openBridge/Card";

import "../../css/profileCard.css";
import TimeText from "../TimeText";

/**
 * Makes an profile card that show the profile to an user.
 * @param {user} user the user
 * @param {sessions} sessions array of the sessions
 * @returns the profile card
 */
export default function ProfileCard({ user, sessions }) {
  let [sessionDetails, setSessionDetails] = useState({
    amountOfSessions: 0,
    totalTime: 0,
    sessionTypes: "",
  });

  useEffect(() => {
    getSessionDetails();
  }, [user, sessions]);

  /**
   * Gets the session details from sessions.
   */
  function getSessionDetails() {
    let totalTimeForSessions = 0;
    let map = new Map();
    for (let i = 0; i < sessions.length; i++) {
      let session = sessions[i];
      map.set(
        session.simulationSetup.simulationSetupId,
        session.simulationSetup.nameOfSetup
      );
      for (let j = 0; j < session.positionRecords.length; j++) {
        let positionRecord = session.positionRecords[j];
        totalTimeForSessions += positionRecord.positionDuration;
      }
    }
    let string = "";
    for (let name of map.values()) {
      string += string.length > 0 ? ", " + name : name;
    }
    setSessionDetails({
      amountOfSessions: sessions.length,
      totalTime: totalTimeForSessions,
      sessionTypes: string,
    });
  }

  /**
   * Makes the content of the profile card.
   * @returns the content.
   */
  function makeContent() {
    return (
      <div className="profile-content">
        <div className="user-name">
          <div className="ob-sub-title">Name: </div>
          <div className="ob-title" style={{ fontWeight: "600" }}>
            {user.userName}
          </div>
        </div>
        <div className="sessions-done">
          <div className="ob-sub-title"> Sessions Done: </div>
          <div className="ob-title" style={{ fontWeight: "600" }}>
            {sessionDetails.amountOfSessions}
          </div>
        </div>
        <div className="total-time">
          <div className="ob-sub-title"> Total Time In Sessions: </div>
          <div className="ob-title" style={{ fontWeight: "600" }}>
            {<TimeText positionTime={sessionDetails.totalTime} />}
          </div>
        </div>
        <div className="sessions-type">
          <div className="ob-sub-title"> Session Type Done: </div>
          <div className="ob-title" style={{ fontWeight: "600" }}>
            {sessionDetails.sessionTypes}
          </div>
        </div>
      </div>
    );
  }
  return <Card title="Profile Details" content={makeContent()} />;
}
