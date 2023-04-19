import React, { useRef, useState } from "react";
import NormalTextField from "../input/NormalTextField";
import Card from "../openBridge/Card";
import NormalButton from "../openBridge/NormalButton";
import "../../css/loginCard.css";
import { useForm } from "react-hook-form";
import { Alert } from "@mui/material";
import { faL } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import useClikedOn from "../../useClikedOn";

export default function LoginCard({ onNavigate }) {
  let { register, handleSubmit } = useForm();
  let [loginSuccessful, setLoginSucessufl] = useState();

  let navigate = useNavigate();

  let ref = useRef();
  useClikedOn(ref, onNavigate);
  if (loginSuccessful) {
    navigate("/");
  } else if (loginSuccessful == null) {
  } else {
  }

  function login(data) {
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    };
    fetch("http://localhost:8080/authenticate", requestOptions)
      .then((response) => {
        if (response.status == 200) {
          setLoginSucessufl(true);
          return response.json();
        } else {
          setLoginSucessufl(false);
        }
      })
      .then((data) => {
        localStorage.setItem("token", data.token);
      });
  }

  function makeContent() {
    return (
      <form className="text-fields" ref={ref}>
        <NormalTextField
          placeholder={"User Name"}
          setRegister={register}
          setValue={"username"}
        />
        <NormalTextField
          placeholder={"Password"}
          setRegister={register}
          setValue={"password"}
        />
        <NormalButton
          text={"Sign in"}
          isRaised={true}
          onClick={handleSubmit(login)}
        />
      </form>
    );
  }

  return (
    <div className="login-card-container">
      <Card title={"USER"} content={makeContent()} className="login-card" />
    </div>
  );
}
