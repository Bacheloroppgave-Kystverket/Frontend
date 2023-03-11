import * as React from "react";
import { useEffect, useState } from "react";
//import {Paper} from '@material-ui/core';

export default function TrackableObject() {
  const paperStyle = { padding: "50px 20px", width: 600, margin: "20px auto" };
  const [trackableObjects, setTrackableObjects] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/trackableObject")
      .then((res) => res.json())
      .then((result) => {
        setTrackableObjects(result);
      });
  });

  return (
    <div></div>

    // <Paper elevation={3} style={paperStyle}>

    //   {trackableObjects.map(trackableObject=>(
    //     <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} key={trackableObject.trackableObjectID}>
    //     NameOfObject:{trackableObject.nameOfObject}<br/>
    //     Type:{trackableObject.trackableType}<br/>
    //     ViewDistance:{trackableObject.viewDistance}<br/>
    //     TrackableObjectId:{trackableObject.trackableObjectID}

    //    </Paper>

    //    ))
    //    }
    // </Paper>
  );
}
