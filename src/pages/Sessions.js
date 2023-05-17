import React, { useRef } from "react";
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
import { Button } from "antd";
import { host } from "../App";

/**
 * Makes a page with all the sessions.
 * @returns the sessions page.
 */
export default function Sessions() {
  const [sessions, setSessions] = useState([]);

  const [showFilter, setShowFilter] = useState(false);

  const [refreshParameter, setRefreshParameter] = useState(null);

  const [loadingRef, setLoadingRef] = useState(false);

  const [parameterObject, setParameterObject] = useState({
    parameters: refreshParameter == null ? "" : refreshParameter,
    isFilter: false,
  });

  const navigate = useNavigate();

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
  let compareMode = currentSessions != null && currentSessions.length > 0;

  function onSubmitFilter(newParameterString, isSubmit) {
    setParameterObject({ parameters: newParameterString, isFilter: isSubmit });
    setShowFilter(false);
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
      let path = "";

      if (!compareMode) {
        path =
          parameterObject.isFilter == false
            ? host + "/session"
            : host + "/session" + "?" + parameterObject.parameters;
      } else {
        path =
          host +
          "/session" +
          "?simulationSetupName=" +
          currentSessions[0].simulationSetup.nameOfSetup;
      }

      setLoadingRef(true);
      await fetch(path, requestOptions)
        .then((res) => {
          return res.json();
        })
        .then((result) => {
          setSessions(result);
          setRefreshParameter(parameterObject.parameters);
          setLoadingRef(false);
        });
    }
  }

  /**
   * Makes the session cards.
   * @returns the session cards.
   */
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
      if (cards.length === 0 && !loadingRef) {
        let itemToadd;
        if (currentSessions.length > 0 && compareMode) {
          itemToadd = (
            <div>
              <p key={"error"} className="sessions-error-text">
                No sessions left to compare against
              </p>
              <NormalButton
                text={"Back to session overview"}
                className="back-to-session-overview"
                onClick={() => {
                  navigate("/session/overview", {
                    state: {
                      sessions: currentSessions,
                    },
                  });
                }}
              />
            </div>
          );
        } else {
          itemToadd = (
            <p key={"error"} className="sessions-error-text">
              No sessions matched your search
            </p>
          );
        }
        cards.push(itemToadd);
      } else if (loadingRef) {
        let loading = (
          <p key={"error"} className="sessions-error-text">
            Loading sessions
          </p>
        );
        cards.push(loading);
      }
    }
    return cards;
  }

  /**
   * Makes the normal content of the page if there is session cards.
   * @returns the nomral content.
   */
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
            isCompare={compareMode}
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
