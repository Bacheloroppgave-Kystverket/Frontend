import { useLocation, useNavigate } from "react-router-dom";
import Profile from "@mui/icons-material/AccountCircle";
import Menu from "@mui/icons-material/Menu";
import Close from "@mui/icons-material/Close";
import DigitalClock from "../DigitalClock";
import { useEffect, useRef, useState } from "react";
import MainMenu from "../menus/MainMenu";
import ProfileMenu from "../menus/ProfileMenu";

/**
 * Makes an appbar
 * @returns the app bar.
 */
function AppBar() {
  const currentLocation = useLocation();
  const [title, setTitle] = useState();
  let menuRef = useRef();

  useEffect(() => {
    let currentTitle = "No title";
    let path = currentLocation.pathname;
    if (path === "/") {
      currentTitle = "Sessions";
    } else {
      let array = path.split("/");

      let newTitle = array[1];
      newTitle =
        newTitle.charAt(0).toUpperCase() + newTitle.slice(1, newTitle.length);
      for (let i = 2; i < array.length; i++) {
        newTitle = newTitle + " " + array[i];
      }
      currentTitle = newTitle;
    }

    setTitle(currentTitle);
  }, [currentLocation]);

  const [menu, setMenu] = useState(false);

  const [profileMenu, setProfileMenu] = useState(false);

  /**
   * Toggles the profile menu.
   */
  function toggleProfileMenu() {
    let token = localStorage.getItem("token");
    if (token != null && token != "") {
      setProfileMenu(!profileMenu);
    }
  }

  function toggleMenu() {
    setMenu(!menu);
  }
  return (
    <div className="ob-nav-top-bar">
      <div className="ob-menu-container">
        <div
          className="ob-button ob-button--supressed ob-button--icon"
          ref={menuRef}
          onClick={() => toggleMenu()}
        >
          {menu ? (
            <Close className={"ob-icon mdi mdi-menu "} fontSize="30px" />
          ) : (
            <Menu className={"ob-icon mdi mdi-menu "} fontSize="30px" />
          )}
          {menu ? (
            <MainMenu
              extraClass="main-menu"
              onNavigate={toggleMenu}
              parentRef={menuRef}
            />
          ) : (
            <></>
          )}
        </div>
        <div className="ob-divider"> </div>
        <div className="ob-title">ETIVR</div>
        <div className="ob-sub-title">{title}</div>
      </div>
      <div className="ob-menu-container">
        <div className="ob-clock">
          <DigitalClock />
        </div>
        <div className="ob-divider"> </div>
        <div
          className="ob-button ob-button--supressed ob-button--icon"
          onClick={() => toggleProfileMenu()}
        >
          <Profile className="ob-icon mdi mdi-account-circle" fontSize="30px" />
          {profileMenu ? <ProfileMenu onNavigate={toggleProfileMenu} /> : <></>}
        </div>
      </div>
    </div>
  );
}

export default AppBar;
