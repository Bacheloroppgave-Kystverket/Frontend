import React from "react";
import { useEffect, useState } from "react";
import AboutCard from "../components/AboutCard";
import EyeMetricsCard from "../components/EyeMetricsCard";
import FeedbackVisualizer from "../components/FeedbackVisualizer";
import ButtonBar from "../components/openBridge/ButtonBar";
import NormalButton from "../components/openBridge/NormalButton";
import "../css/sessionOverview.css";
import { useLocation, useParams } from "react-router-dom";

/**
 * Makes an instansce of the sessions overview.
 * @returns the sessions overview.
 */
export default function SessionOverview() {
  var positionRecords = null;
  const [locationId, setLocationId] = useState(-1);
  const location = useLocation();

  let session = location.state.session;

  console.log("Session");
  console.log(session);

  useEffect(() => {
    if (session != null) {
      positionRecords = session.positionRecords;
    }
  }, [locationId]);

  function switchLocationId(id) {
    console.log(id);
    setLocationId(id);
  }

  function makeButtonBar() {
    let names = new Map();
    if (session != null) {
      names.set(-1, "All seats");
      session.simulationSetup.referencePositionList.forEach((position) => {
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

  return (
    <section className="session-overview-page">
      {makeButtonBar()}
      <div className="compare-about-section">
        <AboutCard className="session-info" session={session} />
        <NormalButton className="compare-button" text="Compare" />
      </div>
      <EyeMetricsCard session={session} referencePositionId={locationId} />
      <div className="session-graph"></div>
      <FeedbackVisualizer
        positionRecords={positionRecords}
        referencePositionId={locationId}
      />
    </section>
  );
}
