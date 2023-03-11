import "../../card.css";

/**
 * Makes a default open bridge card.
 * @param {content} content the content of the page.
 * @param {title} title the title of the card.
 * @returns the open bridge card.
 */
function Card({ content, title }) {
  let stylesCard = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  let styleBody = {};

  return (
    <div style={stylesCard}>
      <div className="ob-card card">
        <div className="ob-card-header">
          <div className="ob-card-header-title-icon">
            <span className="ob-icon mdi mdi-account-circle"></span>{" "}
          </div>
          <div className="ob-card-header-title">{title}</div>
        </div>
        <div className="ob-card-body">
          <div style={styleBody}>{content}</div>
        </div>
      </div>
    </div>
  );
}

export default Card;
