/**
 * Makes a normal button that only has text
 * @param {string} text the text of the button.
 * @param {function} onClick the function that the button should call.
 * @param {bool} isRaised true if the button is rasied.
 * @param {extraClass} extraClass the extra class for the button.
 * @param {icon} icon the icon of the button.
 * @param {boolean} isRightIcon set to true if the icon should be on the right side.
 * @returns a normal button
 */
function NormalButton({ text, onClick, isRaised, extraClass, icon, isRightIcon }) {
  var buttonState =
    isRaised != null && isRaised ? "ob-button--raised" : "ob-button--normal";
  var classNames = "ob-button " + buttonState + " " + extraClass;
  return (
    <a
      className={classNames}
      style={{
        display: "flex",
        justifyContent: "center",
      }}
      onClick={() => onClick()}
    >
      {isRightIcon ? null : icon}
      <span className="ob-label" style={{ margin: 0 }}>
        {text}
      </span>
      {isRightIcon ? icon : null}
    </a>
  );
}

export default NormalButton;
