import React from "react";
import TextField from "@mui/material/TextField";
import "../NormalTextField.css";

export default function NormalTextField({ placeholder }) {
  return (
    <input type="textfield" placeholder={placeholder} className="input-field" />
  );
}
