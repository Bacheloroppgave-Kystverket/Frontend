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

  const location = useLocation();

  let session = location.state.session;
  let compareSession = location.state.compareSession;

  if(compareSession != null){
    console.log("POGGGGEEERRRRSSS");
  }

  useEffect(() => {
    if (session != null) {
      positionRecords = session.positionRecords;
    }
  }, [locationId]);

  function switchLocationId(id) {
    console.log(id);
    setLocationId(id);
  }

  /**
   * Makes the button bar that holds the seats of the session.
   * @returns the button bar.
   */
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

  function compareCurrentSession(){
    navigate("/", {
      state: {
        compareSession: session,
      },
    });
  }

  function makeRightContent(){
    let content = compareSession == null ? <NormalButton className="compare-button" text="Compare" onClick={compareCurrentSession} /> : <p>Pog</p>;
    return content;
  }


  return (
    <section className="session-overview-page">
      {makeButtonBar()}
      <div className="compare-about-section">
        <AboutCard className="session-info" session={session} />
        {makeRightContent()}
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
