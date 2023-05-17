import React, { useEffect, useState } from "react";
import AppBar from "./openBridge/AppBar";
import SupportAppBar from "./openBridge/SupportAppBar";
import { useLocation } from "react-router-dom";

/**
 * Makes a handler for the application bar
 * @returns app bar handler
 */
export default function AppbarHandler() {
  const currentLocation = useLocation();
  useEffect(() => {}, [currentLocation]);

  /**
   * Makes the support appbar
   * @returns  the support
   */
  function makeSupportAppBar() {
    return <SupportAppBar />;
  }
  return (
    <>
      {currentLocation.pathname.split("/")[1] != "support" ? (
        <AppBar />
      ) : (
        makeSupportAppBar()
      )}
    </>
  );
}
