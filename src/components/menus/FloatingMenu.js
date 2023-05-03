import React from "react";
import "../../css/floatingMenu.css";
import NormalButton from "../openBridge/NormalButton";

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
