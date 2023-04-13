import React from "react";
import { useEffect, useState } from "react";
import AboutCard from "../components/cards/AboutCard";
import EyeMetricsCard from "../components/cards/EyeMetricsCard";
import FeedbackVisualizer from "../components/FeedbackVisualizer";
import ButtonBar from "../components/openBridge/ButtonBar";
import NormalButton from "../components/openBridge/NormalButton";
import "../css/sessionOverview.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import EyeMetricGraphHandler from "../components/graphs/EyeMetricGraphHandler";

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

  let sessions = [];
  sessions.push(location.state.session);
  let compareSession = location.state.compareSession;
  if(compareSession != null){
    sessions.push(compareSession);
  }
  

  if(compareSession != null){
    console.log("POGGGGEEERRRRSSS");
  }

  useEffect(() => {
    if (sessions[0] != null) {
      positionRecords = sessions[0].positionRecords;
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

  function compareCurrentSession(){
    navigate("/", {
      state: {
        compareSession: sessions[0],
      },
    });
  }

  function makeRightContent(){
  let compareSession = location.state.compareSession;
    let content = compareSession == null ? <NormalButton className="compare-button" text="Compare" onClick={compareCurrentSession} /> : <AboutCard className="session-info" session={sessions[1]} />;
    return content;
  }


  return (
    <section className="session-overview-page">
      {makeButtonBar()}
      <div className="compare-about-section">
        <AboutCard className="session-info" session={sessions[0]} />
        {makeRightContent()}
      </div>
      <EyeMetricsCard sessions={sessions} referencePositionId={locationId} />
      <div className="session-graph"></div>
    </section>
  );
}
