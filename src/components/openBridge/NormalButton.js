/**
 * Makes a normal button that only has text
 * @param {string} text the text of the button.
 * @param {function} onClick the function that the button should call.
 * @returns a normal button
 */
function NormalButton({ text, onClick, isRaised }) {
  var buttonState =
    isRaised != null && isRaised ? "ob-button--raised" : "ob-button--normal";
  var classNames = "ob-button " + buttonState;
  return (
    <a
      className={classNames}
      style={{ display: "flex", justifyContent: "center" }}
    >
      <span className="ob-label">{text}</span>
    </a>
  );
}

export default NormalButton;
