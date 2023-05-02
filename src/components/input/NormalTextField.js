import React from "react";
import "../../css/NormalTextField.css";

export default function NormalTextField({
  placeholder,
  id,
  setRegister,
  setValue,
  setOptions,
  errorText,
  defaultText,
  isPassword,
}) {
  function makeContent() {
    let content = (
      <input placeholder={placeholder} id={id} className="input-field" />
    );
    let type = isPassword != null && isPassword ? "password" : "text";
    if (setRegister != null && setValue != null) {
      content = (
        <div style={{ width: "100%" }}>
          <input
            type={type}
            placeholder={placeholder}
            id={id}
            className="input-field"
            {...setRegister(setValue, setOptions)}
          />
          <span style={{ color: "red" }}>{defaultText}</span>
        </div>
      );
    }
    return content;
  }

  return makeContent();
}
