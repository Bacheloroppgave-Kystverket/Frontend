import React from "react";
import SessionCard from "../components/cards/SessionCard";
import { useEffect, useState } from "react";
import NormalButton from "../components/openBridge/NormalButton";
import "../css/sessions.css";
import SessionOverview from "./SessionOverview";
import Tune from "@mui/icons-material/Tune";
import { useLocation, useNavigate } from "react-router-dom";
import useClikedOn from "../useClikedOn";

/**
 * Makes a page with all the sessions.
 * @returns the sessions page.
 */
export default function Sessions() {
  /**
   * Put on top of each page. Stops the user if the token is empty.
   */
  let token = localStorage.getItem("token");
  let navigate = useNavigate();
  if (token == null || token == "") {
    navigate("/login");
  }
  //Stops here

  const [sessions, setSessions] = useState([]);

  let location = useLocation();

  let currentSessions =
    location.state == null
      ? []
      : location.state.sessions == null
      ? []
      : location.state.sessions;

  useEffect(() => {
    getSessions();
  }, []);

  /**
   * Gets the session form the server
   */
  async function getSessions() {
    let rawToken = localStorage.getItem("token");
    let token = "Bearer " + rawToken;
    let requestOptions = {
      method: "GET",
      headers: {
        Authorization: token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    await fetch("http://localhost:8080/session", requestOptions)
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setSessions(result);
      });
  }

  function makeSessionCards() {
    let cards = [];
    for (let i = 0; i < sessions.length; i++) {
      let session = sessions[i];
      let sessionCard = (
        <SessionCard
          session={session}
          key={session.sessionID}
          sessions={currentSessions}
        />
      );
      let match = false;
      currentSessions.forEach((element) => {
        if (session.sessionID === element.sessionID) {
          match = true;
        }
      });
      if (currentSessions.length > 0 && match) {
        sessionCard = null;
      }
      if (sessionCard != null) {
        cards.push(sessionCard);
      }
    }
    if (cards.length === 0) {
      let itemToadd;
      if (currentSessions.length > 1) {
        itemToadd = <p key={"error"}>No sessions left to compare against</p>;
      } else {
        itemToadd = <p key={"error"}>No sessions matched your search</p>;
      }
      cards.push(itemToadd);
    }
    return cards;
  }

  function makeNormalContent() {
    return (
      <div className="sessions-page">
        <div id="filter-button-container">
          <NormalButton text="Filter" icon={<Tune fontSize="30px" />} />
        </div>
        <div className="sessions-container">{makeSessionCards()}</div>
      </div>
    );
  }

  return makeNormalContent();
}
