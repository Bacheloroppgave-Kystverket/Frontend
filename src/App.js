import "./css/App.css";
import React, { useRef } from "react";
import SessionOverview from "./pages/SessionOverview";
import Login from "./pages/Login";
import Sessions from "./pages/Sessions";
import RegisterUser from "./pages/RegisterUser";
import "./css/openbridge.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Support from "./pages/Support";
import AppbarHandler from "./components/AppbarHandler";
import SupportCategory from "./pages/SupportCategory";
import UserProfile from "./pages/UserProfile.js";
import SupportItemPage from "./pages/SupportItemPage";
import { CookiesProvider } from "react-cookie";

export const host = "http://129.241.152.70" + ":8080";

function App() {
  return (
    <div className="App">
      <CookiesProvider>
        <BrowserRouter>
          <AppbarHandler />
          <div className="bodyContent">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<RegisterUser />} />
              <Route path="/" element={<Sessions />} />
              <Route path="/session/overview" element={<SessionOverview />} />
              <Route path="/support" element={<Support />} />
              <Route path="/support/category" element={<SupportCategory />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route
                path="/support/category/supportItem"
                element={<SupportItemPage />}
              />
            </Routes>
          </div>
        </BrowserRouter>
      </CookiesProvider>
    </div>
  );
}

export default App;
