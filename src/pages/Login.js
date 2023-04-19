import React, { useEffect, useState } from "react";
import NormalButton from "../components/openBridge/NormalButton";
import "./login.css";
import Logo from "../boat_logo.png";
import NormalTextField from "../components/input/NormalTextField";
import { useNavigate } from "react-router-dom";
import FloatingMenu from "../components/menus/FloatingMenu";
import MainMenu from "../components/menus/MainMenu";
import ProfileMenu from "../components/menus/ProfileMenu";
import LoginCard from "../components/cards/LoginCard";

/**
 * Makes the loginpage
 * @returns the loginpage
 */
export default function Login() {
  let [showLogin, setShowLogin] = useState(false);
  const naviate = useNavigate();
  let token = localStorage.getItem("token");
  useEffect(() => {
    if (token !== null && token !== "") {
      console.log("has token");
      naviate("/");
    }
  }, []);
  return (
    <div className="login-container">
      {showLogin ? <LoginCard onNavigate={() => setShowLogin(false)} /> : <></>}
      <img className="picture" src={Logo} />
      <div className="button-container">
        <h2>You need to login to use this webpage</h2>
        <NormalButton text={"Login"} onClick={() => setShowLogin(true)} />
        <NormalButton
          text={"Register"}
          onClick={() => {
            naviate("/register");
          }}
        />
      </div>
    </div>
  );
}
