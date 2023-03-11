

function NormalButton({text, onClick}) {
  return (
    <a className="ob-button ob-button--normal">
      <span className="ob-label">
        {text}
      </span>
    </a>
  );
}

export default NormalButton;
