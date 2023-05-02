import "../../css/card.css";

/**
 * Makes a default open bridge card.
 * @param {content} content the content of the page.
 * @param {content} headerContent the content of the header.
 * @returns the open bridge card.
 */
function NormalCard({ content, headerContent }) {
  let stylesCard = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
  };

  let styleBody = {};

  return (
    <div style={stylesCard} className="login-container">
      <div className="ob-card card">
        <div className="ob-card-header">
          <div className="ob-card-header-title-icon">
            <span className="ob-icon mdi mdi-account-circle"></span>{" "}
          </div>
          {headerContent}
        </div>
        <div className="ob-card-body">
          <div style={styleBody} className="card-content">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NormalCard;
