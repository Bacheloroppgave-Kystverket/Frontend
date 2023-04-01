import React from "react";
import NormalButton from "../components/openBridge/NormalButton";
import "./login.css";
import Logo from "../LogoVR.jpg";
import NormalTextField from "../components/NormalTextField";
import { useNavigate } from "react-router-dom";
import FloatingMenu from "../components/FloatingMenu";
import MainMenu from "../components/MainMenu";
import ProfileMenu from "../components/ProfileMenu";

/**
 * Makes the loginpage
 * @returns the loginpage
 */
export default function Login() {
  const naviate = useNavigate();
  return (
    <div className="login-container">
      <img className="picture" src={Logo} />
      <div className="button-container">
        <h2>You need to login to use this webpage</h2>
        <NormalButton text={"Login"} onClick={() => naviate("/")} />
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
