import React, { useRef } from "react";
import "../../css/NormalTextField.css";

/**
 * Makes normal text field
 * @param {string, int, float} placeholder placeholder in text field
 * @param {float} id id of the text field
 * @param {function} setRegister function that sets the text field as a register
 * @param {function} setValue sets value
 * @param {function} setOption sets an option
 * @param {string} errorText makes a error text
 * @param {boolean} isPassword true if its password
 * @param {function} onEnter gets submitted if enter button is pushed
 * @param {function} errorTextClass error text class
 * @param {function} handleChange handles changes
 * @returns the textfield.
 */
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
