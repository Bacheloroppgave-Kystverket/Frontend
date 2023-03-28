import React from "react";
import NormalButton from "../components/openBridge/NormalButton";
import "./login.css";
import Logo from "../LogoVR.jpg";
import NormalTextField from "../components/NormalTextField";

/**
 * Makes the loginpage
 * @returns the loginpage
 */
export default function Login() {
  return (
    <div className="login-container">
      <img className="picture" src={Logo} />
      <div className="button-container">
        <h2>You need to login to use this webpage</h2>
        <NormalButton text={"Login"} />
        <NormalButton text={"Register"} />
        <NormalTextField placeholder={"Username"} />
      </div>
    </div>
  );
}
