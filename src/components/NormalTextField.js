import React from "react";
import "../css/NormalTextField.css";

export default function NormalTextField({ placeholder }) {
  return (
    <input type="textfield" placeholder={placeholder} className="input-field" />
  );
}
