import React, { useState } from "react";

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
