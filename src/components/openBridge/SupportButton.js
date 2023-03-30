import "../../css/SupportButton.css"
/**
 * Makes a normal button that only has text
 * @param {string} text the text of the button.
 * @param {function} onClick the function that the button should call.
 * @returns a normal button
 */
function NormalButton({ logo, text, description, onClick, isRaised }) {
    var buttonState =
      isRaised != null && isRaised ? "ob-button--raised" : "ob-button--normal";
    var classNames = "ob-button " + buttonState;
    return (
      <a
        className={classNames}
      >
        <div className="info-button">
          <span className="ob-logo">{logo}</span>
          <span className="ob-font-ui-subtitle">{text}</span>
          <span className="ob-font-ui-label">{description}</span>
        </div>
      </a>
    );
  }
  
  export default NormalButton;
  