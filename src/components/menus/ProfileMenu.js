import React, { useEffect, useRef, useState } from "react";
import FloatingMenu from "./FloatingMenu";
import NormalButton from "../openBridge/NormalButton";
import Person from "@mui/icons-material/Person";
import "../../css/profilemenu.css";
import { useNavigate } from "react-router-dom";
import useClikedOn from "../../useClikedOn";

/**
 * Makes an instance of the profile menu.
 * @param {function} onNavigate gets called when the menu is nvaigated
 * @returns the profile menu.
 */
export default function ProfileMenu({ onNavigate }) {
  const navigate = useNavigate();
  let ref = useRef();
  useClikedOn(ref, onNavigate);

  let [user, setUser] = useState(null);

  useEffect(() => {
    getUser();
  }, []);

  /**
   * Gets the session form the server
   */
  async function getUser() {
    let rawToken = localStorage.getItem("token");
    let token = "Bearer " + rawToken;
    let requestOptions = {
      method: "GET",
      headers: {
        Authorization: token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    await fetch("http://localhost:8080/user/me", requestOptions)
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setUser(result);
      });
  }
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
              {user == null ? "" : user.userName}
            </div>
          </div>
          <div className="sign-out-button bold-profile-button">
            <NormalButton
              text="Sign out"
              onClick={() => {
                onNavigate();
                localStorage.setItem("token", "");
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
      ref={ref}
    />
  );
}
