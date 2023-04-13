import { findByLabelText } from "@testing-library/react";
import React from "react";
import NormalTextField from "../components/input/NormalTextField";
import NormalButton from "../components/openBridge/NormalButton";
import SupportButton from "../components/openBridge/SupportButton";
import "./support.css";

export default function Support() {
  return (
    <div className="support-page">
      <NormalTextField
        placeholder={"search"}
        style={{ display: "flex", justifyContent: "center" }}
      />
      <div className="support-page-buttons">
        <SupportButton
          text={"Eye tracking metrics"}
          description={"Introduction into the metrics"}
        />
        <SupportButton
          text={"Sessions"}
          description={"Basic introduction to sessions"}
        />
        <SupportButton
          text={"Profile"}
          description={"Information about your profile"}
        />
        <SupportButton
          text={"Profile"}
          description={"Information about your profile"}
        />
        <SupportButton
          text={"Graphs basic"}
          description={"Example of bargraphs"}
        />
        <SupportButton
          text={"Graphs basic"}
          description={"Example of bargraphs"}
        />
      </div>
    </div>
  );
}
