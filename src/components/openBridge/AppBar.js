/**
 * Makes an appbar
 * @returns the app bar.
 */
function AppBar() {
  return (
    <div className="ob-nav-top-bar">
      <div className="ob-menu-container">
        <div className="ob-button ob-button--supressed ob-button--icon">
          <span className="ob-icon mdi mdi-menu"></span>
        </div>
        <div className="ob-divider"> </div>
        <div className="ob-title">ETIVR</div>
        <div className="ob-sub-title">Section</div>
      </div>
      <div className="ob-menu-container">
        <div className="ob-clock">14:34</div>
        <div className="ob-divider"> </div>
        <div className="ob-button ob-button--supressed ob-button--icon">
        <span className="ob-icon mdi mdi-account-circle"></span></div>
      </div>
    </div>
  );
}

export default AppBar;
