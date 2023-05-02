import React, { useState } from "react";

export default function CheckBox({
  id,
  title,
  name,
  handleChange,
  isChecked,
  register,
  registerValue,
}) {
  let styles = {};

  const [checked, setChecked] = useState(isChecked == null ? false : isChecked);

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
      />
      <label htmlFor={id}>{title}</label>
    </div>
  );
}
