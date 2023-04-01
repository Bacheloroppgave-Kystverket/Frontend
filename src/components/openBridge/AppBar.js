import { useNavigate } from "react-router-dom";
import Profile from "@mui/icons-material/AccountCircle";
import Menu from "@mui/icons-material/Menu";

/**
 * Makes an appbar
 * @returns the app bar.
 */
function AppBar() {
  const navigate = useNavigate();
  return (
    <div className="ob-nav-top-bar">
      <div className="ob-menu-container">
        <div className="ob-button ob-button--supressed ob-button--icon">
          <Menu
            className="ob-icon mdi mdi-menu"
            onClick={() => navigate("/login")}
            fontSize="30px"
          />
        </div>
        <div className="ob-divider"> </div>
        <div className="ob-title">ETIVR</div>
        <div className="ob-sub-title">Section</div>
      </div>
      <div className="ob-menu-container">
        <div className="ob-clock">14:34</div>
        <div className="ob-divider"> </div>
        <div className="ob-button ob-button--supressed ob-button--icon">
          <Profile className="ob-icon mdi mdi-account-circle" fontSize="30px" />
        </div>
      </div>
    </div>
  );
}

export default AppBar;
