import React, { useEffect, useRef } from "react";
import FloatingMenu from "./FloatingMenu";
import NormalButton from "../openBridge/NormalButton";
import "../../css/mainmenu.css";
import Help from "@mui/icons-material/HelpOutline";
import MenuButton from "../buttons/MenuButton";
import { useNavigate } from "react-router-dom";
import useClikedOn from "../../useClikedOn";

/**
 * Makes the main menu.
 * @param {function} onNavigate the function to call on navigate
 * @returns the main menu.
 */
export default function MainMenu({ onNavigate, parentRef }) {
  const navigate = useNavigate();
  let ref = useRef();

  useClikedOn(ref, onNavigate);
  /**
   * Makes the content of the main menu.
   * @returns the content.
   */
  function makeContent() {
    return (
      <div style={{ width: "100%" }} ref={ref}>
        <MenuButton
          text="Sessions"
          className="floating-menu-button"
          height={48}
          paddingLeft={1}
          onInteract={() => {
            navigate("/");
            onNavigate();
          }}
        />
        <MenuButton
          text="Profile"
          className="floating-menu-button"
          height={48}
          paddingLeft={1}
          onInteract={() => {
            navigate("/login");
            onNavigate();
          }}
        />
        <div className="bottom-menu">
          <MenuButton
            text="Help"
            height={64}
            className="floating-menu-button"
            icon={<Help className="ob-icon" fontSize="40px" />}
            onInteract={() => {
              navigate("/support");
              onNavigate();
            }}
          />
        </div>
      </div>
    );
  }
  let content = (
    <FloatingMenu content={makeContent()} width={320} extraClass="main-menu" />
  );

  return content;
}
