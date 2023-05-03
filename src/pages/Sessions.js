import React from "react";
import SessionCard from "../components/cards/SessionCard";
import { useEffect, useState } from "react";
import NormalButton from "../components/openBridge/NormalButton";
import "../css/sessions.css";
import SessionOverview from "./SessionOverview";
import Tune from "@mui/icons-material/Tune";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import useClikedOn from "../useClikedOn";
import FilterCard from "../components/cards/FilterCard";
import { faL } from "@fortawesome/free-solid-svg-icons";
import { useCookies } from "react-cookie";

/**
 * Makes a page with all the sessions.
 * @returns the sessions page.
 */
export default function Sessions() {
  const [sessions, setSessions] = useState([]);

  const [showFilter, setShowFilter] = useState(false);

  const [parameterObject, setParameterObject] = useState({
    parameters: "",
    isFilter: false,
  });

  const [cookies, setCookie] = useCookies(["token"]);

  let location = useLocation();

  useEffect(() => {
    getSessions();
  }, [parameterObject]);

  let currentSessions =
    location.state == null
      ? []
      : location.state.sessions == null
      ? []
      : location.state.sessions;

  useEffect(() => {
    getSessions();
  }, []);

  function onSubmitFilter(newParameterString, isSubmit) {
    setParameterObject({ parameters: newParameterString, isFilter: isSubmit });
    setShowFilter(false);
    console.log(newParameterString);
  }

  /**
   * Gets the session form the server
   */
  async function getSessions() {
    let rawToken = cookies.token;
    let token = "Bearer " + rawToken;
    if (rawToken != null && rawToken != "") {
      let requestOptions = {
        method: "GET",
        headers: {
          Authorization: token,
          Accept: "application/json",
          "Content-Type": "application/json",
          "Acess-Control-Allow-Origin": "*",
        },
      };
      let path =
        parameterObject.isFilter == false
          ? "http://localhost:8080/session"
          : "http://localhost:8080/session" + "?" + parameterObject.parameters;
      await fetch(path, requestOptions)
        .then((res) => {
          return res.json();
        })
        .then((result) => {
          setSessions(result);
        });
    }
  }

  function makeSessionCards() {
    let cards = [];
    if (currentSessions != null) {
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
    }
    return cards;
  }

  function makeNormalContent() {
    return (
      <div className="sessions-page">
        <div id="filter-button-container">
          <NormalButton
            text="Filter"
            icon={<Tune fontSize="30px" />}
            onClick={() => {
              setShowFilter(!showFilter);
            }}
          />
        </div>
        <div className="sessions-container">{makeSessionCards()}</div>
        {showFilter ? (
          <FilterCard
            onExit={() => setShowFilter(!showFilter)}
            setParameter={onSubmitFilter}
            parameterString={parameterObject.parameters}
          />
        ) : (
          <></>
        )}
      </div>
    );
  }
  return cookies.token == null || cookies.token == "" ? (
    <Navigate replace to={"/login"} />
  ) : (
    makeNormalContent()
  );
}
