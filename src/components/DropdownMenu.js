import React from "react";
import ButtonBar from "./openBridge/ButtonBar";
import NormalButton from "./openBridge/NormalButton";
import "../css/dropdownbutton.css";

export default function DropdownMenu({ map, currentChoise, buttonFunction }) {
  function makeButtonBar() {
    return (
      <div className="floating-buttton-menu">
        <ButtonBar
          namesOfButtons={map}
          activePosition={currentChoise}
          buttonFunction={buttonFunction}
          isVertical={true}
        />
      </div>
    );
  }

  return (
    <div>
      <NormalButton text={map.get(0)} />
      {makeButtonBar()}
    </div>
  );
}
