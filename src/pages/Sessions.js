import React from "react";
import SessionCard from "../components/cards/SessionCard";
import { useEffect, useState } from "react";
import NormalButton from "../components/openBridge/NormalButton";
import "../css/sessions.css";
import SessionOverview from "./SessionOverview";
import Tune from "@mui/icons-material/Tune";
import { useLocation } from "react-router-dom";

/**
 * Makes a page with all the sessions.
 * @returns the sessions page.
 */
export default function Sessions() {
  const [sessions, setSessions] = useState([]);

  let location = useLocation();

  let compareSession = location.state == null ? null : location.state.compareSession;

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



  function makeNormalContent() {
    return (
      <div className="sessions-page">
        <div id="filter-button-container">
          <NormalButton text="Filter" icon={<Tune fontSize="30px" />} />
        </div>
        <div className="sessions-container">
          {sessions.map((session) => {
            let sessionCard = (
            
              <SessionCard session={session} key={session.sessionID} sessionToCompareAgainst={compareSession} />
            );
            if(compareSession != null && session.sessionID === compareSession.sessionID){
              sessionCard = null;
            }
            return sessionCard;
          })}
        </div>
      </div>
    );
  }

  return (
    makeNormalContent()
  );
}
