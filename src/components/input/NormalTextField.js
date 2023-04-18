import React from "react";
import "../../css/NormalTextField.css";

export default function NormalTextField({
  placeholder,
  id,
  onChange,
  setRegister,
  setValue,
  setOptions,
}) {
  function makeContent() {
    let content = (
      <input placeholder={placeholder} id={id} className="input-field" />
    );
    if (setRegister != null && setValue != null) {
      content = (
        <input
          placeholder={placeholder}
          id={id}
          className="input-field"
          {...setRegister(setValue, setOptions)}
        />
      );
    }
    return content;
  }

  return makeContent();
}
