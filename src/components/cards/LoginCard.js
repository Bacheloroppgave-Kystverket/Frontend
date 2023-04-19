import React, { useState } from "react";
import NormalTextField from "../input/NormalTextField";
import Card from "../openBridge/Card";
import NormalButton from "../openBridge/NormalButton";
import "../../css/loginCard.css";
import { useForm } from "react-hook-form";

export default function LoginCard() {
  let { register, handleSubmit } = useForm();
  let { token, setToken } = useState();

  function login(data) {
    console.log(data);
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch("http://localhost:8080/authenticate", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("token", data.token);
      })
      .then(() => console.log(localStorage.getItem("token")));
  }

  function makeContent() {
    return (
      <form className="text-fields">
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
