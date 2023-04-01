import React from "react";

/**
 * Makes an instance of the time text. Is used to format the time correctly to hours, minutes and seconds.
 * @param {float} positionTime the time of the position.
 * @param {style} style the styles this text should have.
 * @returns the html object.
 */
export default function TimeText({ positionTime, style }) {
  let timeString = "";
  let rawTime = positionTime / 3600;
  let hour = Math.floor(rawTime);
  let minutes = Math.floor(positionTime / 60 - hour * 60);
  let seconds = Math.floor(positionTime - hour * 3600 - minutes * 60);
  let listOfWords = [];
  if (hour > 0) {
    listOfWords.push(hour + " hour(s)");
  }
  if (minutes > 0) {
    listOfWords.push(minutes + "minute(s)");
  }
  if (seconds > 0) {
    listOfWords.push(seconds + " second(s)");
  }
  switch (listOfWords.length) {
    case 2:
      timeString = listOfWords[0] + " and " + listOfWords[1];
      break;
    case 3:
      timeString =
        listOfWords[0] + ", " + listOfWords[1] + " and " + listOfWords[2];
      break;
    case 1:
      timeString = listOfWords[0];
      break;
  }
  return <span style={style}>{timeString}</span>;
}
