import React, { useEffect, useState } from "react";

/**
 * Makes a digital clock that refreshes each minute.
 * @returns the digital clock.
 */
export default function DigitalClock() {
  const [time, setTime] = useState();
  const [refresh, setRefresh] = useState();
  useEffect(() => {
    let localDate = new Date();
    let hour = localDate.getHours().toString();
    if (hour.length == 1) {
      hour = "0" + hour;
    }
    let minutes = localDate.getMinutes().toString();
    if (minutes.length == 1) {
      minutes = "0" + minutes;
    }
    setTime(hour + ":" + minutes);
    if (refresh == null) {
      setInterval(() => {
        setRefresh("p");
      }, 20000);
    }
  }, []);
  return <div>{time}</div>;
}
