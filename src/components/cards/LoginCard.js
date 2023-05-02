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

  function login(data) {
    let validUsername = checkUsername(data.username);
    let validPassword = checkPassword(data.password);
    console.log("Username " + validUsername);
    console.log("Password " + validPassword);
    if (validPassword && validUsername) {
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
  }

  function checkUsername(username) {
    let regrex = new RegExp(
      "^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$"
    );
    return regrex.test(username);
  }

  function checkPassword(password) {
    let regrex = new RegExp(
      "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
    );
    console.log(password);
    return regrex.test(password);
  }

  function makeContent() {
    return (
      <form className="text-fields" onSubmit={handleSubmit(login)}>
        <NormalTextField
          placeholder={"User Name"}
          setRegister={register}
          setValue={"username"}
        />
        <NormalTextField
          placeholder={"Password"}
          setRegister={register}
          setValue={"password"}
          isPassword={true}
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
      <Card
        ref={ref}
        title={"LOGIN"}
        content={makeContent()}
        className="login-card"
      />
    </div>
  );
}
