import React, { useState } from "react";

/**
 * Makes a checkbox
 * @param {float} id id of the checkbox
 * @param {string} title a title for the checkbox
 * @param {string} name name of checkbox
 * @param {function} handleChange handles changes
 * @param {boolean} isChecked true if it is checked
 * @param {register} register 
 * @param {registerValue} registerValue registers value
 * @param {boolean} disabled checks if checkbox is disabled
 * @returns checkbox
 */
export default function CheckBox({
  id,
  title,
  name,
  handleChange,
  isChecked,
  register,
  registerValue,
  disabled,
}) {
  let styles = {};

  const [checked, setChecked] = useState(isChecked == null ? false : isChecked);

  /**
   * Toggles if the checkbox is checked.
   */
  function toggleChecked() {
    setChecked(!checked);
  }

  return (
    <div style={styles}>
      <input
        id={id}
        type="checkbox"
        name={name}
        onChange={handleChange}
        onClick={toggleChecked}
        style={{ padding: "10px", fontWeight: "600" }}
        {...register(registerValue)}
        checked={checked}
        disabled={disabled}
      />
      <label htmlFor={id}>{title}</label>
    </div>
  );
}
