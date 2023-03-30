import { func } from "prop-types";
import React, { useEffect, useState } from "react";
import "../../css/buttonbar.css";
import ButtonBarButton from "./ButtonBarButton";

/**
 * Makes a button bar based on the input names.
 * @param {string} namesOfButtons the names of the buttons.
 * @returns the button bars
 */
export default function ButtonBar({
  namesOfButtons,
  activePosition,
  buttonFunction,
  isVertical,
}) {
  const [buttons, setButtons] = useState([]);

  useEffect(() => {
    let seats = [];
    namesOfButtons.forEach((value, key) => {
      seats.push(makeButton(value, key));
    });
    setButtons(seats);
  }, [namesOfButtons]);
  /**
   * Makes a button with the input name.
   * @param {string} nameOfSeat the name of the buttobn.
   * @param {int} id the id of the button.
   * @returns the new seat
   */
  function makeButton(nameOfSeat, id) {
    return (
      <ButtonBarButton
        nameOfbutton={nameOfSeat}
        id={id}
        selectedId={activePosition}
        buttonFunction={buttonFunction}
        isVertical={isVertical}
      />
    );
  }

  let style = {};
  if (isVertical) {
    style = { display: "flex", flexFlow: "column", borderRadius: "0" };
  }

  return (
    <div className="button-bar">
      <div className="ob-toggle-button-icon">
        <div className="ob-toggle-button-icon__container" style={style}>
          {buttons}
        </div>
      </div>
    </div>
  );
}
