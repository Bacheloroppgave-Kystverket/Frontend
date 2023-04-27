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

  return (
    <div style={styles}>
      <input
        id={id}
        type="checkbox"
        name={name}
        onChange={handleChange}
        style={{ padding: "10px", fontWeight: "600" }}
        {...register(registerValue)}
      />
      <label htmlFor={id}>{title}</label>
    </div>
  );
}
