import React, { useEffect, useState } from "react";
import ProfileCard from "../components/cards/ProfileCard";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";

export default function UserProfile() {
  const [cookies, setCookie] = useCookies(["token"]);
  useEffect(() => {
    getUser();
  }, []);

  let [user, setUser] = useState(null);
  let [sessions, setSessions] = useState([]);

  useEffect(() => {
    getSessions();
  }, [user]);

  /**
   * Gets the session form the server
   */
  async function getSessions() {
    let rawToken = cookies.token;
    let token = "Bearer " + rawToken;
    if (rawToken != null && rawToken != "" && user != null) {
      let requestOptions = {
        method: "GET",
        headers: {
          Authorization: token,
          Accept: "application/json",
          "Content-Type": "application/json",
          "Acess-Control-Allow-Origin": "*",
        },
      };
      let path = "http://localhost:8080/session?username=" + user.userName;
      await fetch(path, requestOptions)
        .then((res) => {
          return res.json();
        })
        .then((result) => {
          setSessions(result);
        });
    }
  }

  /**
   * Gets the session form the server
   */
  async function getUser() {
    let rawToken = cookies.token;
    let token = "Bearer " + rawToken;
    if (rawToken !== null && rawToken !== "") {
      let requestOptions = {
        method: "GET",
        headers: {
          Authorization: token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      await fetch("http://localhost:8080/user/me", requestOptions)
        .then((res) => {
          return res.json();
        })
        .then((result) => {
          setUser(result);
        });
    }
  }
  return cookies.token !== null && cookies.token !== "" ? (
    user === null ? (
      <p style={{ fontsize: "2em" }}>Loading profile</p>
    ) : (
      <ProfileCard user={user} sessions={sessions} />
    )
  ) : (
    <Navigate to={"/login"} />
  );
}
