import React from "react";
import "../../css/floatingMenu.css";
import NormalButton from "../openBridge/NormalButton";

export default function FloatingMenu({ width, content, extraClass }) {
  return (
    <div
      className={"floating-menu" + " " + extraClass}
      style={{ width: width + "px" }}
    >
      {content}
    </div>
  );
}
