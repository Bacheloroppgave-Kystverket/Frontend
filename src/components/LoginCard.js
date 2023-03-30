import React from "react";
import NormalTextField from "./NormalTextField";
import Card from "./openBridge/Card";
import NormalButton from "./openBridge/NormalButton";
import "../css/loginCard.css";

export default function LoginCard() {
  function makeContent() {
    return (
      <div className="text-fields">
        <NormalTextField placeholder={"User Name"} />
        <NormalTextField placeholder={"Password"} />
        <NormalButton text={"Sign in"} isRaised={true} />
      </div>
    );
  }

  return (
    <div className="login-card">
      <Card title={"USER"} content={makeContent()} />
    </div>
  );
}
