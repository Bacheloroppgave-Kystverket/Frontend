import React from "react";
import Logo from "../boat_logo.png";
import "./registerUser.css";
import NormalTextField from "../components/input/NormalTextField";
import { useNavigate } from "react-router-dom";
import NormalButton from "../components/openBridge/NormalButton";
import { useForm } from "react-hook-form";
import axios, { Axios } from "axios";

/**
 *
 * @returns
 */
export default function RegisterUser() {
  let navigate = useNavigate();
  let { register, handleSubmit } = useForm();

  async function logValues(data) {
    console.log(data);
    data["userId"] = 0;
    const requestOptions = {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain",
      },
      body: JSON.stringify(data),
    };
    await fetch("http://localhost:8080/user/register", requestOptions);
  }
  return (
    <form className="register-container" onSubmit={handleSubmit(logValues)}>
      <img className="picture" src={Logo} />
      <div className="register-fields">
        <h2> You need to use your work id to make a user</h2>
        <NormalTextField
          placeholder={"User Name"}
          setRegister={register}
          setValue={"username"}
          setOptions={{ reqired: true }}
        />
        <NormalTextField
          placeholder={"Password"}
          setRegister={register}
          setValue={"password"}
          setOptions={{ reqired: true }}
        />
        <NormalTextField placeholder={"Password again"} />
        <NormalButton text="Make user" onClick={handleSubmit(logValues)} />
        <NormalButton
          text="Back to login"
          extraClass="ob-button--supressed"
          onClick={() => navigate("/login")}
        />
      </div>
    </form>
  );
}

