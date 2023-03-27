import "./App.css";
import AppBar from "./components/openBridge/AppBar";
import React from "react";
import SessionOverview from "./pages/SessionOverview";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import Sessions from "./pages/Sessions";

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
      <AppBar />
      <div>
        <SessionOverview session={session} />
      </div>
    </div>
  );
}

export default App;
