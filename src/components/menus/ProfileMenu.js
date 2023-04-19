import React, { useEffect, useRef } from "react";
import FloatingMenu from "./FloatingMenu";
import Card from "../openBridge/Card";
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

  useEffect(() => {
    let user = localStorage.getItem("user");
    console.log(user);
    if (user == null || user == "") {
      console.log("Gets user");
      getUser();
    }
  }, []);

  /**
   * Gets the session form the server
   */
  async function getUser() {
    let token = "Bearer " + localStorage.getItem("token");
    let requestOptions = {
      Authorization: "Bearer " + token,
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    await fetch("http://localhost:8080/user/me", requestOptions)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });
  }
  /**
   * Makes the content of the profile menu.
   * @returns the profile menu content.
   */
  function makeContent() {
    return (
      <div style={{ width: "100%" }} ref={ref}>
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
    />
  );
}
