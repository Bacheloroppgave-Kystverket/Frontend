import React, { useRef } from "react";
import ButtonBar from "../openBridge/ButtonBar";
import useClikedOn from "../../useClikedOn";

/**
 * Makes a floatin button menu
 * @param {map} map
 * @param {currentChoise} currentChoice
 * @param {toggleFunction} toggleFunction
 * @returns
 */
export default function FloatingButtonMenu({
  map,
  currentChoise,
  toggleFunction,
}) {
  let ref = useRef();

  useClikedOn(ref, toggleFunction);

  return (
    <div className="floating-buttton-menu" ref={ref}>
      <ButtonBar
        namesOfButtons={map}
        activePosition={currentChoise}
        buttonFunction={toggleFunction}
        isVertical={true}
      />
    </div>
  );
}
