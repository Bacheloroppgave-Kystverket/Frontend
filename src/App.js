import "./css/App.css";
import AppBar from "./components/openBridge/AppBar";
import React from "react";
import SessionOverview from "./pages/SessionOverview";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import Sessions from "./pages/Sessions";
import RegisterUser from "./pages/RegisterUser";
import LoginCard from "./components/LoginCard";
import "./css/openbridge.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [session, setSession] = useState(null);
  useEffect(() => {
    fetch("http://localhost:8080/session/9")
      .then((res) => res.json())
      .then((result) => {
        setSession(result);
      });
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <AppBar />
        <div className="bodyContent">
          <Routes>
            <Route path="/" element={<Sessions />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registerUser" element={<RegisterUser />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
