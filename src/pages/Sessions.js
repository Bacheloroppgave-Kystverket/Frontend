import React from "react";
import SessionCard from "../components/SessionCard";
import { useEffect, useState } from "react";
import NormalButton from "../components/openBridge/NormalButton";
import "../css/sessions.css";
import SessionOverview from "./SessionOverview";

/**
 * Makes a page with all the sessions.
 * @returns the sessions page.
 */
export default function Sessions() {
  const [sessions, setSessions] = useState([]);
  const [session, setSession] = useState(null);

  useEffect(() => {
    getSessions();
  }, []);

  /**
   * Gets the session form the server
   */
  async function getSessions() {
    fetch("http://localhost:8080/session")
      .then((res) => res.json())
      .then((result) => {
        setSessions(result);
      });
  }

  function showSession(session) {
    setSession(session);
  }

  function makeNormalContent() {
    return (
      <div className="sessions-page">
        <div id="filter-button-container">
          <NormalButton text="Filter" />
        </div>
        <div className="sessions-container">
          {sessions.map((session) => (
            <SessionCard session={session} setFunction={showSession} />
          ))}
        </div>
      </div>
    );
  }

  return session == null ? (
    makeNormalContent()
  ) : (
    <SessionOverview session={session} />
  );
}
