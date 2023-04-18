import React from "react";
import "../../css/NormalTextField.css";

export default function NormalTextField({ placeholder, id, onChange}) {
  return (
    <input type="textfield" 
    placeholder={placeholder} 
    id={id} className="input-field"
    />
  );
}
