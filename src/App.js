import "./css/App.css";
import AppBar from "./components/openBridge/AppBar";
import React from "react";
import SessionOverview from "./pages/SessionOverview";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import Sessions from "./pages/Sessions";
import RegisterUser from "./pages/RegisterUser";
import LoginCard from "./components/cards/LoginCard";
import "./css/openbridge.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Support from "./pages/Support";
import AppbarHandler from "./components/AppbarHandler";
import SupportCategory from "./pages/SupportCategory";

function App() {
  let [token, setToken] = useState();

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  function makeContent() {
    let content = (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterUser />} />
      </Routes>
    );
    if (token != null && token != "") {
      content = (
        <Routes>
          <Route path="/" element={<Sessions />} />
          <Route path="/session/overview" element={<SessionOverview />} />
          <Route path="/support" element={<Support />} />
          <Route path="/support/category" element={<SupportCategory />} />
        </Routes>
      );
    }
    return content;
  }
  return (
    <div className="App">
      <BrowserRouter>
        <AppbarHandler />

        <div className="bodyContent">{makeContent()}</div>
      </BrowserRouter>
    </div>
  );
}

export default App;
