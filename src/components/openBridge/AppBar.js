import { useLocation, useNavigate } from "react-router-dom";
import Profile from "@mui/icons-material/AccountCircle";
import Menu from "@mui/icons-material/Menu";
import Close from "@mui/icons-material/Close";
import DigitalClock from "../DigitalClock";
import { useEffect, useState } from "react";
import MainMenu from "../menus/MainMenu";
import ProfileMenu from "../menus/ProfileMenu";

/**
 * Makes an appbar
 * @returns the app bar.
 */
function AppBar() {
  const currentLocation = useLocation();
  const [title, setTitle] = useState();
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
    setProfileMenu(!profileMenu);
  }

  /**
   * Opens the menu.
   */
  function openMenu() {
    setMenu(true);
  }

  /**
   * Hides the menu.
   */
  function closeMenu() {
    setMenu(false);
  }
  return (
    <div className="ob-nav-top-bar">
      <div className="ob-menu-container">
        <div className="ob-button ob-button--supressed ob-button--icon">
          {menu ? (
            <Close
              className={"ob-icon mdi mdi-menu "}
              onClick={() => closeMenu()}
              fontSize="30px"
            />
          ) : (
            <Menu
              className={"ob-icon mdi mdi-menu "}
              onClick={() => openMenu()}
              fontSize="30px"
            />
          )}
          {menu ? (
            <MainMenu extraClass="main-menu" onNavigate={closeMenu} />
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
        <div className="ob-button ob-button--supressed ob-button--icon">
          <Profile
            className="ob-icon mdi mdi-account-circle"
            fontSize="30px"
            onClick={() => toggleProfileMenu()}
          />
          {profileMenu ? <ProfileMenu onNavigate={toggleProfileMenu} /> : <></>}
        </div>
      </div>
    </div>
  );
}

export default AppBar;
