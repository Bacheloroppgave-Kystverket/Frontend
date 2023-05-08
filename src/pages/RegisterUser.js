import React, { useState } from "react";
import Logo from "../boat_logo.png";
import "./registerUser.css";
import NormalTextField from "../components/input/NormalTextField";
import { Navigate, useNavigate } from "react-router-dom";
import NormalButton from "../components/openBridge/NormalButton";
import { useForm } from "react-hook-form";
import axios, { Axios } from "axios";
import { faL } from "@fortawesome/free-solid-svg-icons";

/**
 *
 * @returns
 */
export default function RegisterUser() {
  let navigate = useNavigate();
  let { register, handleSubmit } = useForm();

  let [registerUser, setRegisterUser] = useState({
    firstTime: true,
    registerSuccess: false,
  });
  let [validPassword, setValidPassword] = useState(true);
  let [validSecondPassword, setValidSecondPassword] = useState(true);
  let [validUsername, setValidUsername] = useState(true);

  async function makeUser(data) {
    let validName = checkUsername(data.username);
    let validPassword = checkPassword(data.password);
    let validSecondPassword =
      checkPassword(data.secondPassword) &&
      data.password === data.secondPassword;
    if (validPassword && validUsername && validSecondPassword) {
      data["userId"] = 0;
      let user = {
        userName: data.username,
        userId: 0,
        password: data.password,
      };
      const requestOptions = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(user),
      };
      await fetch("http://localhost:8080/user/register", requestOptions).then(
        (resp) => {
          if (resp.status == 200) {
            console.log("ok");
            setRegisterUser({
              firstTime: false,
              registerSuccess: true,
            });
          } else {
            setRegisterUser({
              firstTime: false,
              registerSuccess: false,
            });
          }
        }
      );
      setValidPassword(validPassword);
      setValidUsername(validName);
      setValidSecondPassword(validSecondPassword);
    } else {
      setValidPassword(validPassword);
      setValidUsername(validName);
      setValidSecondPassword(validSecondPassword);
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

  function makeRegisterUserPage() {
    return (
      <form className="register-container" onSubmit={handleSubmit(makeUser)}>
        <img className="picture" src={Logo} />
        <div className="register-fields">
          <h2> You need to use your work id to make a user</h2>
          <NormalTextField
            placeholder={"Username"}
            setRegister={register}
            setValue={"username"}
            errorTextClass={"register-error"}
            setOptions={{ reqired: true }}
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
            errorTextClass={"register-error"}
            setOptions={{ reqired: true }}
            isPassword={true}
            errorText={
              validPassword
                ? ""
                : "Password must be 8 characters long, contain one letter, one cased letter and one number"
            }
          />
          <NormalTextField
            placeholder={"Password again"}
            setRegister={register}
            setValue={"secondPassword"}
            errorTextClass={"register-error"}
            isPassword={true}
            errorText={validSecondPassword ? "" : "The passwords must match"}
          />
          {!registerUser.firstTime && !registerUser.registerSuccess ? (
            <span
              style={{
                color: "red",
                fontSize: "1.5em",
                textAlign: "center",
                padding: "0",
                margin: "0",
              }}
            >
              {"A user with that username already exsists"}
            </span>
          ) : null}
          <NormalButton text="Make user" onClick={handleSubmit(makeUser)} />
          <NormalButton
            text="Back to login"
            extraClass="ob-button--supressed"
            onClick={() => navigate("/login")}
          />
        </div>
      </form>
    );
  }

  if (registerUser.registerSuccess) {
    alert("User has been made");
  }
  return registerUser.registerSuccess ? (
    <Navigate replace to={"/login"} />
  ) : (
    makeRegisterUserPage()
  );
}
