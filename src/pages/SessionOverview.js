import React from 'react';
import { useEffect, useState } from "react";
import AboutCard from '../components/AboutCard';
import NormalButton from '../components/openBridge/NormalButton';
import SingleGraph from '../components/SingleGraph';
import "../sessionOverview.css";
import "../openbridge.css";

export default function SessionOverview() {
    const [sessions, setSessions] = useState([]);
    useEffect(() => {
      fetch("http://localhost:8080/session")
        .then((res) => res.json())
        .then((result) => {
          setSessions(result);
          console.log(result);
        });
    }, []);
    console.log(sessions);

    return (
        <div className='session-overview-page'>
            <div className="compare-button-and-session-info">
                <span>{<AboutCard/>}</span>
                <span><NormalButton text="Compare"/></span>
            </div>
            <div className="session-graph">
                { <SingleGraph session/>}
            </div>
        
        </div>
    );
}