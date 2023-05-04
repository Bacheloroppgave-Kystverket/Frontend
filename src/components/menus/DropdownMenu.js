import React, { useEffect, useRef, useState } from "react";
import ExpandMore from "@mui/icons-material/ExpandMore";
import NormalButton from "../openBridge/NormalButton";
import "../../css/dropdownbutton.css";
import RotateIcon from "../RotateIcon";
import FloatingButtonMenu from "../buttons/FloatingButtonMenu";

/**
 * Makes an instance of the DropDown menu.
 * @param {map} map the menu option as a map
 * @param {currentChoise} currentChoise current choice of the menu.
 * @param {function} buttonFunction the function to change something.
 * @returns the dropdown menu.
 */
export default function DropdownMenu({
  map,
  currentChoise,
  buttonFunction,
  menuClass,
}) {
  const [showMenu, setShowMenu] = useState(false);
  useEffect(() => {}, [currentChoise]);

  /**
   * Makes the button bar.
   * @returns the button bar.
   */
  function makeButtonBar() {
    return (
      <FloatingButtonMenu
        map={map}
        currentChoise={currentChoise}
        toggleFunction={toggleFunction}
      />
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
    <div className="dropdown-button-container" style={{ position: "relative" }}>
      <NormalButton
        text={map.get(currentChoise)}
        className="dropdown-button"
        extraClass="ob-button--supressed"
        onClick={toggleShowMenu}
        icon={
          <RotateIcon
            icon={<ExpandMore style={{ width: "20px", height: "20px" }} />}
            updateState={showMenu}
            degrees={180}
          />
        }
        isRightIcon={true}
      />
      {showMenu ? makeButtonBar() : <></>}
    </div>
  );
}
