import React, { useRef } from "react";
import "../../css/NormalTextField.css";

export default function NormalTextField({
  placeholder,
  id,
  setRegister,
  setValue,
  setOptions,
  errorText,
  isPassword,
  onEnter,
  errorTextClass,
  handleChange,
}) {
  const ref = useRef();
  function makeContent() {
    let content = (
      <input placeholder={placeholder} id={id} className="input-field" />
    );

    let type = isPassword != null && isPassword ? "password" : "text";
    if (setRegister != null && setValue != null) {
      content = (
        <div style={{ width: "100%" }} ref={ref}>
          <input
            type={type}
            placeholder={placeholder}
            id={id}
            onChange={() => console.log("LLL")}
            className="input-field"
            {...setRegister(setValue, setOptions)}
          />
          <span
            className={errorTextClass === null ? "" : errorTextClass}
            style={{ color: "red" }}
          >
            {errorText}
          </span>
        </div>
      );
    }
    return content;
  }

  return makeContent();
}
