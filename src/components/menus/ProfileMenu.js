import React from "react";
import FloatingMenu from "./FloatingMenu";
import Card from "../openBridge/Card";
import NormalButton from "../openBridge/NormalButton";
import Person from "@mui/icons-material/Person";
import "../../css/profilemenu.css";
import { useNavigate } from "react-router-dom";

/**
 * Makes an instance of the profile menu.
 * @param {function} onNavigate gets called when the menu is nvaigated
 * @returns the profile menu.
 */
export default function ProfileMenu({ onNavigate }) {
  const navigate = useNavigate();

  /**
   * Makes the content of the profile menu.
   * @returns the profile menu content.
   */
  function makeContent() {
    return (
      <div style={{ width: "100%" }}>
        <div className="profile-menu-header">USER</div>
        <div className="profile-content">
          <div>
            <Person style={{ fontSize: "72px" }} />
            <div className="profile-name">Arnhild</div>
          </div>
          <div className="sign-out-button bold-profile-button">
            <NormalButton
              text="Sign out"
              onClick={() => {
                navigate("/login");
                onNavigate();
              }}
            />
          </div>
        </div>
        <div className="bottom-menu" style={{ height: "48px" }}>
          <NormalButton
            text="Go to profile page"
            extraClass="bold-profile-button go-to-profile-button"
            onClick={() => {
              navigate("/profile");
              onNavigate();
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <FloatingMenu
      content={makeContent()}
      width={480}
      extraClass="profile-menu"
    />
  );
}
