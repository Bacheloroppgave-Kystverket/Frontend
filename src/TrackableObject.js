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
  );
}
