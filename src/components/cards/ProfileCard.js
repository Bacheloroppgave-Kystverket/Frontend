import React from "react";
import Card from "../openBridge/Card";

import "../../css/profileCard.css";

/**
 * Makes an profile card that show the profile to an user.
 * @param {*} profile
 * @returns
 */
export default function ProfileCard(profile) {
  /**
   *
   * @param {*} username
   * @param {*} sessionsDone
   * @param {*} totalTime
   * @param {*} sessionType
   * @returns
   */
  function makeContent(username, sessionsDone, totalTime, sessionType) {
    return (
      <div className="profile-content">
        <div className="user-name">
          <div className="ob-sub-title">Name: </div>
          <div className="ob-title" style={{ fontWeight: "600" }}>
            {username}
          </div>
        </div>
        <div className="sessions-done">
          <div className="ob-sub-title"> Sessions Done: </div>
          <div className="ob-title" style={{ fontWeight: "600" }}>
            {sessionsDone}
          </div>
        </div>
        <div className="total-time">
          <div className="ob-sub-title"> Total Time In Sessions: </div>
          <div className="ob-title" style={{ fontWeight: "600" }}>
            {totalTime}
          </div>
        </div>
        <div className="sessions-type">
          <div className="ob-sub-title"> Session Type Done: </div>
          <div className="ob-title" style={{ fontWeight: "600" }}>
            {sessionType}
          </div>
        </div>
      </div>
    );
  }
  return (
    <Card
      title="Profile Details"
      content={makeContent("Hei0", 4, 4, "tugboat")}
    />
  );
}
