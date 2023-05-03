import React, { useRef, useState } from "react";
import NormalTextField from "../input/NormalTextField";
import Card from "../openBridge/Card";
import NormalButton from "../openBridge/NormalButton";
import "../../css/loginCard.css";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import useClikedOn from "../../useClikedOn";

export default function LoginCard({ onNavigate }) {
  let { register, handleSubmit } = useForm();
  let [loginSuccessful, setLoginSucessufl] = useState({
    firstTime: true,
    loginSucess: false,
  });
  let [validPassword, setValidPassword] = useState(true);
  let [validUsername, setValidUsername] = useState(true);

  let ref = useRef();
  useClikedOn(ref, onNavigate);

  /**
   * Sends a login request if the data is valid.
   * @param {*} data the data.
   */
  function login(data) {
    let validUsername = checkUsername(data.username);
    let validPassword = checkPassword(data.password);
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
            setLoginSucessufl({
              firstTime: false,
              loginSucess: true,
            });
            return response.json();
          } else {
            setLoginSucessufl({
              firstTime: false,
              loginSucess: false,
            });
          }
        })
        .then((data) => {
          localStorage.setItem("token", data.token);
        });
      setValidPassword(validPassword);
      setValidUsername(validUsername);
    } else {
      setValidPassword(validPassword);
      setValidUsername(validUsername);
    }
  }

  /**
   * Checks if the username is of valid format.
   * @param {*} username the username.
   * @returns true if the username is valid format. False otherwise.
   */
  function checkUsername(username) {
    let regrex = new RegExp(
      "^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$"
    );
    return regrex.test(username);
  }

  /**
   * Checks if the password has the correct format.
   * @param {*} password the password.
   * @returns true if the password has the correct format. False otherwise.
   */
  function checkPassword(password) {
    let regrex = new RegExp(
      "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
    );
    return regrex.test(password);
  }

  /**
   * Makes the content of the login page.
   * @returns the content.
   */
  function makeLoginContent() {
    return (
      <form className="text-fields-and-button" onSubmit={handleSubmit(login)}>
        <div className="text-fields">
          <NormalTextField
            placeholder={"User Name"}
            setRegister={register}
            setValue={"username"}
            errorText={
              validUsername
                ? ""
                : "Username must contain 8 characters and one large letter"
            }
          />
          <NormalTextField
            placeholder={"Password"}
            setRegister={register}
            setValue={"password"}
            isPassword={true}
            errorText={
              validPassword
                ? ""
                : "Password must be 8 characters long, contain one letter, one cased letter and one number"
            }
          />
          {!loginSuccessful.firstTime ? (
            <span
              style={{
                color: "red",
                fontSize: "0.8em",
                textAlign: "center",
                padding: "0",
                margin: "0",
              }}
            >
              {"No user matches those credentials. Please try again moron"}
            </span>
          ) : null}
        </div>
        <NormalButton
          text={"Sign in"}
          isRaised={true}
          onClick={handleSubmit(login)}
        />
      </form>
    );
  }
  return !loginSuccessful.firstTime && loginSuccessful.loginSucess ? (
    <Navigate replace to={"/"} />
  ) : (
    <div className="login-card-container" ref={ref}>
      <Card
        title={"LOGIN"}
        content={makeLoginContent()}
        className="login-card"
        extraClass={"login-container"}
      />
    </div>
  );
}
