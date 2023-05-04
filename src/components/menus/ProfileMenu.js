import React, { useEffect, useRef, useState } from "react";
import FloatingMenu from "./FloatingMenu";
import NormalButton from "../openBridge/NormalButton";
import Person from "@mui/icons-material/Person";
import "../../css/profilemenu.css";
import { useNavigate } from "react-router-dom";
import useClikedOn from "../../useClikedOn";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";

/**
 * Makes an instance of the profile menu.
 * @param {function} onNavigate gets called when the menu is nvaigated
 * @returns the profile menu.
 */
export default function ProfileMenu({ onNavigate }) {
  const navigate = useNavigate();
  let ref = useRef();
  useClikedOn(ref, onNavigate);

  const [cookies, setCookie] = useCookies(["token"]);

  /**
   * Makes the content of the profile menu.
   * @returns the profile menu content.
   */
  function makeContent() {
    return (
      <div style={{ width: "100%" }}>
        <div className="profile-menu-header">USER</div>
        <div className="profile-menu-content">
          <div>
            <Person style={{ fontSize: "72px" }} />
            <div className="profile-menu-name">
              {cookies.token !== null && cookies.token !== ""
                ? jwt_decode(cookies.token).sub
                : ""}
            </div>
          </div>
          <div className="sign-out-button bold-profile-button">
            <NormalButton
              text="Sign out"
              onClick={() => {
                setCookie("token", "");
                onNavigate();
                navigate("/login");
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
      reference={ref}
    />
  );
}
