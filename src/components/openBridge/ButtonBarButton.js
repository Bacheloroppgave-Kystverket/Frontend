import React, { useEffect, useState } from "react";

/**
 * Makes a button bar button.
 * @param {string} nameOfbutton name of the button.
 * @param {int} id the id of the button.
 * @param {int} selectedId the selected button.
 * @param {buttonFunction} buttonFunction the function that the button calls.
 * @returns the button that is made.
 */
export default function ButtonBarButton({
  nameOfbutton,
  id,
  selectedId,
  buttonFunction,
}) {
  useEffect(() => {}, [selectedId]);

  /**
   * Makes the selected button.
   * @returns the selected button.
   */
  function makeSelectedButton() {
    return makeButton("ob-selected");
  }

  /**
   * Makes the button object.
   * @param {string} extraClass the extra class if needed.
   * @returns the button.
   */
  function makeButton(extraClass) {
    let classNames = "ob-toggle-button-icon__item " + extraClass;
    return (
      <div className={classNames} onClick={() => buttonFunction(id)}>
        <div className="button-text">{nameOfbutton}</div>
      </div>
    );
  }

  return selectedId == id ? makeSelectedButton() : makeButton("");
}
