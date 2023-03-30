import React from "react";
import { useEffect, useState } from "react";
import Card from "./openBridge/Card";

export default function AboutCard({ username, date, time, sessionName }) {
  function makeContent(username, date, time) {
    return (
      <div className="card-content">
        <div className="trainee-name-">
          <div className="ob-sub-title">Trainee: </div>
          <div className="ob-title">{username}</div>
        </div>
        <div className="date">
          <div className="ob-sub-title">Date of session:</div>
          <div className="ob-title">{date}</div>
        </div>
        <div className="time">
          <div className="ob-sub-title">Time of seat:</div>
          <div className="ob-title">{time}</div>
        </div>
      </div>
    );
  }

  return (
    <Card
      content={makeContent(username, date, time)}
      title={sessionName}
      className="about-card"
    />
  );
}
