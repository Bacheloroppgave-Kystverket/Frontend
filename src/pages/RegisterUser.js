import React from "react";
import Logo from "../LogoVR.jpg";
import "./registerUser.css";
import NormalTextField from "../components/NormalTextField";
import NormalButton from "../components/openBridge/NormalButton";

/**
 *
 * @returns
 */
export default function RegisterUser() {
  return (
    <div className="register-container">
      <img className="picture" src={Logo} />
      <div className="register-fields">
        <h2> You need to use your work id to make a user</h2>
        <NormalTextField placeholder={"User Name"} />
        <NormalTextField placeholder={"Password"} />
        <NormalTextField placeholder={"Password again"} />
        <NormalButton text="Make user" />
        <a>Back to login</a>
      </div>
    </div>
  );
}
