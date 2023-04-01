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
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppBar />
        <div className="bodyContent">
          <Routes>
            <Route path="/" element={<Sessions />} name="Sessions" />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegisterUser />} />
            <Route path="/session/overview" element={<SessionOverview />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
