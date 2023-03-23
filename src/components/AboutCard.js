import React from 'react';
import { useEffect, useState} from 'react';

export default function AboutCard({session}) {

    function makeContent() {
        
    }
    
    return (
       <div className="card-content">
        <div className="trainee-name-">
            <span className="trainee"></span>
            <span className="trainee-name">{session}</span>
        </div>
        <div className="date">
            <span className="date-of-session"></span>
        </div>
        <div className="time">
        <span className="time-of-seat"></span>
        </div>
       </div>
    );
}