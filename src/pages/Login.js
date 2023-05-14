import React, { useEffect, useState } from "react";
import NormalButton from "../components/openBridge/NormalButton";
import "../css/login.css";
import Logo from "../boat_logo.png";
import NormalTextField from "../components/input/NormalTextField";
import { Navigate, useNavigate } from "react-router-dom";
import FloatingMenu from "../components/menus/FloatingMenu";
import MainMenu from "../components/menus/MainMenu";
import ProfileMenu from "../components/menus/ProfileMenu";
import LoginCard from "../components/cards/LoginCard";
import { useCookies } from "react-cookie";

/**
 * Makes the loginpage
 * @returns the loginpage
 */
export default function Login() {
  let [showLogin, setShowLogin] = useState(false);
  const naviate = useNavigate();

  const [cookies, setCookie] = useCookies(["token"]);

  let token = cookies.token;
  useEffect(() => {
    if (token !== null && token !== "") {
      naviate("/");
    }
  }, []);

  /**
   * Makes the content of the login page.
   * @returns the login page content.
   */
  function makeLoginPage() {
    return (
      <div className="login-container">
        {showLogin ? (
          <LoginCard onNavigate={() => setShowLogin(false)} />
        ) : (
          <></>
        )}
        <img className="picture" src={Logo} />
        <div className="button-container">
          <h2>You need to login to use this webpage</h2>
          <NormalButton text={"Login"} onClick={() => setShowLogin(true)} />
          <NormalButton
            text={"Register"}
            onClick={() => {
              naviate("/register");
            }}
          />
        </div>
      </div>
    );
  }
  return cookies.token == null || cookies.token == "" ? (
    makeLoginPage()
  ) : (
    <Navigate replace to={"/"} />
  );
}
