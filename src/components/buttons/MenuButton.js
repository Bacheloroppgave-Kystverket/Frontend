import React from "react";

/**
 * MAkes a main menu button.
 * @param {string} text the text of the button
 * @param {icon} icon the icon.
 * @param {height} height the height of the button.
 * @param {paddingLeft} paddingLeft the left padding.
 * @param {onInteract} onInteract a function that is called on interaction.
 * @returns the main menu button.
 */
export default function MenuButton({
  text,
  icon,
  height,
  paddingLeft,
  onInteract,
}) {
  return (
    <a
      className="menu-icon-button"
      style={{ height: height + "px", paddingLeft: paddingLeft + "em" }}
      onClick={() => onInteract()}
    >
      {icon}
      <div>{text}</div>
    </a>
  );
}
