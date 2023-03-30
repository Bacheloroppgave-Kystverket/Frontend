import React, { useEffect, useState } from "react";
import ButtonBar from "./openBridge/ButtonBar";
import NormalButton from "./openBridge/NormalButton";
import "../css/dropdownbutton.css";

/**
 * Makes an instance of the DropDown menu.
 * @param {map} map the menu option as a map
 * @param {currentChoise} currentChoise current choice of the menu.
 * @param {function} buttonFunction the function to change something.
 * @returns the dropdown menu.
 */
export default function DropdownMenu({ map, currentChoise, buttonFunction }) {
  const [showMenu, setShowMenu] = useState(false);
  useEffect(() => {}, [currentChoise]);

  /**
   * Makes the button bar.
   * @returns the button bar.
   */
  function makeButtonBar() {
    return (
      <div className="floating-buttton-menu">
        <ButtonBar
          namesOfButtons={map}
          activePosition={currentChoise}
          buttonFunction={toggleFunction}
          isVertical={true}
        />
      </div>
    );
  }

  /**
   * Toggles between the current page and the function. Hides the menu on action.
   * @param {*} id the id of the action to do.
   */
  function toggleFunction(id) {
    buttonFunction(id);
    toggleShowMenu();
  }

  /**
   * Toggles if the menu should be shown or not.
   */
  function toggleShowMenu() {
    setShowMenu(!showMenu);
  }

  return (
    <div className="dropdown-button-container">
      <NormalButton
        text={map.get(currentChoise) + " >"}
        className="dropdown-button"
        extraClass="ob-button--supressed"
        onClick={toggleShowMenu}
      />
      {showMenu ? makeButtonBar() : <></>}
    </div>
  );
}
