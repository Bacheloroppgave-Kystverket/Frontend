import React from "react";
import { useEffect, useState } from "react";
import AboutCard from "../components/AboutCard";
import NormalButton from "../components/openBridge/NormalButton";
import SingleGraph from "../components/SingleGraph";
import "../sessionOverview.css";

export default function SessionOverview() {
  const [session, setSession] = useState(null);
  var username = "";
  var date = "";
  var time = "";
  if (session != null) {
    console.log(session);
    username = session.user.username;
  }
  useEffect(() => {
    fetch("http://localhost:8080/session/8")
      .then((res) => res.json())
      .then((result) => {
        setSession(result);
      });
  }, []);

  var map = new Map();
  map.set("Hei", 10);
  map.set("Ball", 15);


  function findTotalTimeForCategory(){
    
  }

  return (
    <div className="session-overview-page">
      <div className="compare-button">
        <NormalButton className="" text="Compare" />
      </div>
      <div className="session-info">
        <div>
          <AboutCard username={username} date={date} time={time} />
        </div>
      </div>
      <div className="session-graph">
        <SingleGraph map={map} />
      </div>
    </div>
  );
}
