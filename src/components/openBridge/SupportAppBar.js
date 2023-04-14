import { useLocation, useNavigate } from "react-router-dom";
import Profile from "@mui/icons-material/AccountCircle";
import Menu from "@mui/icons-material/Menu";
import Close from "@mui/icons-material/Close";
import RightArrow from "@mui/icons-material/ChevronRight";
import BackArrow from "@mui/icons-material/ArrowBack";
import DigitalClock from "../DigitalClock";
import { useEffect, useState } from "react";
import MainMenu from "../menus/MainMenu";
import ProfileMenu from "../menus/ProfileMenu";

/**
 * Makes an appbar
 * @returns the app bar.
 */
function SupportAppBar() {
  const currentLocation = useLocation();
  const nagivate = useNavigate();
  const [supportTextArray, setSupportTextArray] = useState([]);

  useEffect(() => {
    let newSupportArray;
    if (currentLocation.state != null) {
      newSupportArray = currentLocation.state.supportArray;
    }
    if (newSupportArray == null) {
      newSupportArray = [];
    }
    setSupportTextArray(newSupportArray);
    console.log(newSupportArray);
  }, [currentLocation]);

  function makeHeaderContent() {
    let items = [];
    supportTextArray.forEach((text) => {
      items.push(
        <RightArrow fontSize="30px" className="ob-icon mdi mdi-menu" />
      );
      items.push(
        <div className="ob-sub-title" style={{ margin: "0" }}>
          {text}
        </div>
      );
    });
    return items;
  }

  function goBack() {
    let newPath = "";
    let pathArray = currentLocation.pathname.split("/");
    for (let i = 0; i < pathArray.length - 1; i++) {
      newPath = newPath + pathArray[i];
    }
    nagivate(newPath);
  }

  let headerContent = makeHeaderContent();

  return (
    <div className="ob-nav-top-bar">
      <div className="ob-menu-container">
        <div className="ob-button ob-button--supressed ob-button--icon">
          {supportTextArray.length > 0 ? (
            <BackArrow
              className={"ob-icon mdi mdi-menu"}
              onClick={() => goBack()}
              fontSize="30px"
            />
          ) : (
            <Close
              className={"ob-icon mdi mdi-menu"}
              onClick={() => goBack()}
              fontSize="30px"
            />
          )}
        </div>
        {headerContent.length > 0 ? (
          <div className="ob-sub-title" style={{ fontWeight: "600" }}>
            Support
          </div>
        ) : (
          <div className="ob-sub-title">Support</div>
        )}
        {headerContent}
      </div>
    </div>
  );
}

export default SupportAppBar;
