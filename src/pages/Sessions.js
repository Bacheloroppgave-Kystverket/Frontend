import React from "react";
import SessionCard from "../components/SessionCard";
import { useEffect, useState } from "react";
import NormalButton from "../components/openBridge/NormalButton";
import "../css/sessions.css";

/**
 * Makes a page with all the sessions.
 * @returns the sessions page.
 */
export default function Sessions() {
  const [sessions, setSessions] = useState([]);
  useEffect(() => {
    getSession();
  }, []);

  /**
   * Gets the session form the server
   */
  async function getSession() {
    fetch("http://localhost:8080/session")
      .then((res) => res.json())
      .then((result) => {
        setSessions(result);
        console.log(result);
      });
  }

  console.log(sessions);

  return (
    <div className="sessions-page">
      <div id="filter-button-container">
        <NormalButton text="Filter" />
      </div>
      <div className="sessions-container">
        {sessions.map((session) => (
          <SessionCard session={session} />
        ))}
      </div>
    </div>
  );
}
