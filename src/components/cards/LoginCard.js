import React from "react";
import NormalTextField from "../input/NormalTextField";
import Card from "../openBridge/Card";
import NormalButton from "../openBridge/NormalButton";
import "../../css/loginCard.css";
import { useForm } from "react-hook-form";

export default function LoginCard() {
  let { register, handleSubmit } = useForm();

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
        <NormalButton text={"Sign in"} isRaised={true} />
      </form>
    );
  }

  return (
    <div className="login-card-container">
      <Card title={"USER"} content={makeContent()} className="login-card" />
    </div>
  );
}
