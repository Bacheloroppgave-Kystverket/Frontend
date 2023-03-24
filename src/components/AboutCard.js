import React from 'react';
import { useEffect, useState} from 'react';
import "../openbridge.css";
import "../aboutcard.css"

export default function AboutCard({session}) {

    function makeContent() {
        
    }
    
    return (
       <div className="card-content">
        <div className="trainee-name-">
            <h4 className="trainee">Trainee: </h4>
                <span>trainee here</span>
            <span className="trainee-name">{session}</span>
        </div>
        <div className="date">
            <h4 className="date-of-session">Date of session</h4>
            <span>date goes here</span>
        </div>
        <div className="time">
        <h4 className="time-of-seat">Time of seat </h4>
        <span>time here</span>
        </div>
       </div>
    );
}