import React from "react";
import NormalCard from "../openBridge/NormalCard";
import Expand from "@mui/icons-material/ExpandLess";

import { useState } from "react";
import RotateIcon from "../RotateIcon";

/**
 * Makes a collapsable card.
 * @param {html} content the content of the collapseable card.
 * @param {string} title the title.
 * @returns the collapse card.
 */
export default function CollapseCard({ content, title }) {
  const [open, setOpen] = useState(true);

  /**
   * Makes the header content of this card.
   * @returns the header content.
   */
  function makeHeaderContent() {
    let icon = <Expand style={{ width: "30px", height: "30px" }} />;
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          paddingRight: "1em",
        }}
      >
        <div className="ob-card-header-title">{title}</div>
        <div onClick={() => toggleOpen()} style={{ cursor: "pointer" }}>
          <RotateIcon icon={icon} degrees={180} updateState={open} />
        </div>
      </div>
    );
  }

  /**
   * Toggles the card open.
   */
  function toggleOpen() {
    setOpen(!open);
  }

  return (
    <NormalCard
      content={open ? content : <></>}
      headerContent={makeHeaderContent()}
    />
  );
}
