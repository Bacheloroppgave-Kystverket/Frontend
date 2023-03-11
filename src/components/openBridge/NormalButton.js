/**
 * Makes a normal button that only has text
 * @param {string} text the text of the button.
 * @param {function} onClick the function that the button should call.
 * @returns a normal button
 */
function NormalButton({ text, onClick }) {
  return (
    <a className="ob-button ob-button--normal">
      <span className="ob-label">{text}</span>
    </a>
  );
}

export default NormalButton;
