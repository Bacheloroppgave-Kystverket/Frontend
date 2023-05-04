import React from "react";
import { useEffect, useState } from "react";
import AboutCard from "../components/cards/AboutCard";
import EyeMetricsCard from "../components/cards/EyeMetricsCard";
import FeedbackVisualizer from "../components/FeedbackVisualizer";
import ButtonBar from "../components/openBridge/ButtonBar";
import NormalButton from "../components/openBridge/NormalButton";
import "../css/sessionOverview.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CheckBox from "../components/openBridge/CheckBox";
import FilterCard from "../components/cards/FilterCard";
import FeedbackCard from "../components/cards/FeedbackCard";

/**
 * Makes an instansce of the sessions overview.
 * @param {boolean} compare true if you are going to compare data. False otherwise.
 * @returns the sessions overview.
 */
export default function SessionOverview() {
  var navigate = useNavigate();

  const [locationId, setLocationId] = useState(-1);
  const [sessions, setSessions] = useState([]);

  const location = useLocation();

  useEffect(() => {
    let newSessions = location.state.sessions;
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

  /**
   * Navigates to the sessions page to find a session to compare against.
   */
  function compareCurrentSession() {
    navigate("/", {
      state: {
        sessions: sessions,
      },
    });
  }

  /**
   * Makes a compare button that can be displayed.
   * @returns the compare button
   */
  function makeComparebutton() {
    return (
      <NormalButton
        className="compare-button"
        text="Compare"
        onClick={compareCurrentSession}
        key={-2}
      />
    );
  }

  /**
   * Removes a session.
   * @param {session} sessionToRemove the session to remove.
   */
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

  /**
   * Makes an about card about the input session.
   * @param {session} session the session.
   * @returns the about card with the sessions information.
   */
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

  /**
   * Makes the content that is supposed to be at the session about part of the page.
   * @returns
   */
  function makeAboutContent() {
    let aboutcards = [];

    if (sessions != null && sessions.length === 1) {
      aboutcards.push(makeAboutCard(sessions[0]));
      aboutcards.push(makeComparebutton());
    } else if (sessions != null && sessions.length > 1) {
      sessions.forEach((currentSession) =>
        aboutcards.push(makeAboutCard(currentSession))
      );
      aboutcards.push(makeComparebutton());
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
      <FeedbackCard sessions={sessions} referencePositionId={locationId} />
    </section>
  );
}
