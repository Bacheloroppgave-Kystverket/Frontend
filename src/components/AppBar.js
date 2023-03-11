function AppBar() {
  return (
    <div className="ob-nav-top-bar">
      <div className="ob-menu-container">
        <div className="ob-button ob-button--supressed ob-button--icon">
          <span className="ob-icon mdi mdi-menu"></span>
        </div>
        <div className="ob-divider"> </div>
        <div className="ob-title">App</div>
        <div className="ob-sub-title">Section</div>
      </div>
      <div className="ob-menu-container">
        <div className="ob-clock">14:34</div>
        <div className="ob-divider"> </div>
        <div className="ob-nav-top-bar__apps">
          <a className="ob-app-btn ob-small">
            <div className="ob-btn-icon ob-icon mdi mdi-ferry"></div>
          </a>
          <a className="ob-app-btn ob-small">
            <div className="ob-btn-icon ob-icon mdi mdi-ferry"></div>
          </a>
          <a className="ob-app-btn ob-small">
            <div className="ob-btn-icon ob-icon mdi mdi-ferry"></div>
          </a>
        </div>
        <div className="ob-divider"> </div>
        <div className="ob-button ob-button--supressed ob-button--icon">
          <span className="ob-icon mdi mdi-bell"></span>
        </div>
        <div className="ob-button ob-button--supressed ob-button--icon">
          <span className="ob-icon mdi mdi-account-circle"></span>
        </div>
        <div className="ob-button ob-button--supressed ob-button--icon">
          <span className="ob-icon mdi mdi-brightness-4 mdi-rotate-180"></span>
        </div>
        <div className="ob-button ob-button--supressed ob-button--icon">
          <span className="ob-icon mdi mdi-apps"></span>
        </div>
      </div>
    </div>
  );
}

export default AppBar;
