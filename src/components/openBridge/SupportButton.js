import "../../css/supportButton.css";
import Person from "@mui/icons-material/Person";
import Eye from "@mui/icons-material/Visibility";
import Analytics from "@mui/icons-material/Analytics";
/**
 * Makes a normal button that only has text
 * @param {string} text the text of the button.
 * @param {function} onClick the function that the button should call.
 * @returns a normal button
 */
function SupportButton({ logo, supportCategory, onClick, isRaised }) {
  function chooseIcon() {
    let icon;
    switch (supportCategory.iconNumber) {
      case 1:
        icon = <Person fontSize="40px" className="ob-logo support-logo" />;
        break;
      case 2:
        icon = <Eye fontSize="40px" className="ob-logo support-logo" />;
        break;
      case 3:
        icon = <Analytics fontSize="40px" className="ob-logo support-logo" />;
        break;
    }
    return icon;
  }
  var buttonState =
    isRaised != null && isRaised ? "ob-button--raised" : "ob-button--normal";
  var classNames = "ob-button support-button " + buttonState;

  return (
    <a className={classNames} onClick={() => onClick(supportCategory)}>
      <div className="info-button">
        <div className="support-icon-container">{chooseIcon()}</div>
        <div className="support-text-holder">
          <span className="ob-font-ui-subtitle">
            {supportCategory.categoryName}
          </span>
          <span className="ob-font-ui-label">
            {supportCategory.introduction}
          </span>
        </div>
      </div>
    </a>
  );
}

export default SupportButton;
