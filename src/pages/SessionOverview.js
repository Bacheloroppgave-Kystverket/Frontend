import React from "react";
import { useEffect, useState } from "react";
import AboutCard from "../components/cards/AboutCard";
import EyeMetricsCard from "../components/cards/EyeMetricsCard";
import FeedbackVisualizer from "../components/FeedbackVisualizer";
import ButtonBar from "../components/openBridge/ButtonBar";
import NormalButton from "../components/openBridge/NormalButton";
import "../css/sessionOverview.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";

/**
 * Makes an instansce of the sessions overview.
 * @param {boolean} compare true if you are going to compare data. False otherwise.
 * @returns the sessions overview.
 */
export default function SessionOverview() {
  var positionRecords = null;

  var navigate = useNavigate();

  const [locationId, setLocationId] = useState(-1);
  const [sessions, setSessions] = useState([]);

  const location = useLocation();

  useEffect(() => {
    let newSessions = [];
    newSessions.push(location.state.session);
    let compareSession = location.state.compareSession;
    if (compareSession != null) {
      newSessions.push(compareSession);
    }
    console.log(newSessions);
    setSessions(newSessions);
  }, []);

  function switchLocationId(id) {
    setLocationId(id);
  }

  /**
   * Makes the button bar that holds the seats of the session.
   * @returns the button bar.
   */
  function makeButtonBar() {
    let names = new Map();
    if (sessions[0] != null) {
      names.set(-1, "All seats");
      sessions[0].simulationSetup.referencePositionList.forEach((position) => {
        names.set(position.locationId, position.locationName);
      });
    } else {
      names.set(-1, "No names");
    }
    return (
      <ButtonBar
        namesOfButtons={names}
        activePosition={locationId}
        buttonFunction={switchLocationId}
      />
    );
  }

  function compareCurrentSession() {
    navigate("/", {
      state: {
        compareSession: sessions[0],
      },
    });
  }

  function makeComparebutton() {
    return (
      <NormalButton
        className="compare-button"
        text="Compare"
        onClick={compareCurrentSession}
      />
    );
  }

  function removeSession(sessionToRemove) {
    let data = [];
    sessions.forEach((session) => {
      if (session.sessionID != sessionToRemove.sessionID) {
        data.push(session);
      }
    });
    if (data.length > 0) {
      setSessions(data);
    } else {
      navigate("/");
    }
  }

  function makeAboutCard(session) {
    return (
      <AboutCard
        className="session-info"
        session={session}
        key={session.sessionID}
        onClick={removeSession}
      />
    );
  }

  function makeAboutContent() {
    let aboutcards = [];

    if (sessions != null && sessions.length === 1) {
      aboutcards.push(makeAboutCard(sessions[0]));
      aboutcards.push(makeComparebutton());
    } else if (sessions != null && sessions.length > 1) {
      sessions.forEach((currentSession) =>
        aboutcards.push(makeAboutCard(currentSession))
      );
    } else {
      aboutcards.push(<p>Loading data</p>);
    }
    return <div className="compare-about-section">{aboutcards}</div>;
  }

  return (
    <section className="session-overview-page">
      {makeButtonBar()}
      {makeAboutContent()}
      <EyeMetricsCard sessions={sessions} referencePositionId={locationId} />
    </section>
  );
}
