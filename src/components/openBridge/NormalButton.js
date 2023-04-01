/**
 * Makes a normal button that only has text
 * @param {string} text the text of the button.
 * @param {function} onClick the function that the button should call.
 * @param {bool} isRaised true if the button is rasied.
 * @param {extraClass} extraClass the extra class for the button.
 * @param {icon} icon the icon of the button.
 * @returns a normal button
 */
function NormalButton({ text, onClick, isRaised, extraClass, icon }) {
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
      {icon}
      <span className="ob-label" style={{ margin: 0 }}>
        {text}
      </span>
    </a>
  );
}

export default NormalButton;
