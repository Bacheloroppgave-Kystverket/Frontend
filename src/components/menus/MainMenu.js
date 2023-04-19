import React from "react";
import FloatingMenu from "./FloatingMenu";
import NormalButton from "../openBridge/NormalButton";
import "../../css/mainmenu.css";
import Help from "@mui/icons-material/HelpOutline";
import MenuButton from "../buttons/MenuButton";
import { useNavigate } from "react-router-dom";

/**
 * Makes the main menu.
 * @param {function} onNavigate the function to call on navigate
 * @returns the main menu.
 */
export default function MainMenu({ onNavigate }) {
  const navigate = useNavigate();

  /**
   * Makes the content of the main menu.
   * @returns the content.
   */
  function makeContent() {
    return (
      <div style={{ width: "100%" }}>
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
  return (
    <FloatingMenu content={makeContent()} width={320} extraClass="main-menu" />
  );
}