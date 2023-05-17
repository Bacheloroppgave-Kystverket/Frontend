import React from "react";
import "../../css/floatingMenu.css";
import NormalButton from "../openBridge/NormalButton";

/**
 * Makes a floating menu
 * @param {*} width width of the floating menu
 * @param {*} content content that should be inside the floating menu
 * @param {*} extraClass the extra class in the floating menu
 * @param {*} reference reference to a floating menu
 * @returns 
 */
export default function FloatingMenu({
  width,
  content,
  extraClass,
  reference,
}) {
  return (
    <div
      className={"floating-menu" + " " + extraClass}
      style={{ width: width + "px" }}
      ref={reference}
    >
      {content}
    </div>
  );
}
