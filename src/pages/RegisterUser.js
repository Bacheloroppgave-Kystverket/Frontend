import React from "react";
import Logo from "../boat_logo.png";
import "./registerUser.css";
import NormalTextField from "../components/NormalTextField";
import { useNavigate } from "react-router-dom";
import NormalButton from "../components/openBridge/NormalButton";

/**
 *
 * @returns
 */
export default function RegisterUser() {
  let navigate = useNavigate();
  return (
    <div className="register-container">
      <img className="picture" src={Logo} />
      <div className="register-fields">
        <h2> You need to use your work id to make a user</h2>
        <NormalTextField placeholder={"User Name"} />
        <NormalTextField placeholder={"Password"} />
        <NormalTextField placeholder={"Password again"} />
        <NormalButton text="Make user" />
        <NormalButton
          text="Back to login"
          extraClass="ob-button--supressed"
          onClick={() => {
            navigate("/Login");
          }}
        />
      </div>
    </div>
  );
}
