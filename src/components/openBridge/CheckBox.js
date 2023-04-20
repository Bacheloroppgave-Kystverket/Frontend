import React, { useState } from "react";

export default function CheckBox({ id, title, name, handleChange, isChecked }) {
  const [checked, setChecked] = useState(isChecked);

  function clicked() {
    console.log("hei");
    setChecked(!checked);
  }
  let styles = {};
 

  return (
    <div style={styles} onClick={() => clicked()}>
      <input
        id={id}
        type="checkbox"
        name={name}
        onChange={handleChange}
        checked={checked}
        style={{padding: "10px", fontWeight: "600"}}
      />
      <label htmlFor={id}>{title}</label>
    </div>
  );
}
