import "./App.css";
import AppBar from "./components/openBridge/AppBar";
import Sessions from "./pages/Sessions";
import React from "react";
import SingleGraph from "./components/SingleGraph";
import DoubleGraph from "./components/DoubleGraph";
import AboutCard from "./components/AboutCard";
import SessionOverview from "./pages/SessionOverview";

function App() {
  return (
    <div className="App">
      <AppBar />
      <div>
        <SessionOverview />
      </div>
    </div>
  );
}

export default App;
