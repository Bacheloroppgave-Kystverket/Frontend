import React, { useEffect, useRef, useState } from "react";
import Close from "@mui/icons-material/Close";
import NormalCard from "../openBridge/NormalCard";
import CheckBox from "../openBridge/CheckBox";
import "./../../css/filtercard.css";
import "./../../css/floatingMenu.css";
import NormalButton from "../openBridge/NormalButton";
import { useForm } from "react-hook-form";
import { DatePicker } from "antd";
import useClikedOn from "../../useClikedOn";
import { useCookies } from "react-cookie";
import { host } from "../../App";
const { RangePicker } = DatePicker;
const dayjs = require("dayjs");
const customParseFormat = require("dayjs/plugin/customParseFormat");

/**
 * Makes the filter card.
 * @param {func} onExit called when the card is exited.
 * @param {func} setParameter a function that sets the parameters outside this card.
 * @param {string} parameterString the parameters as string.
 * @returns the filtercard.
 */
export default function FilterCard({
  onExit,
  setParameter,
  parameterString,
  isCompare,
}) {
  const { register, handleSubmit } = useForm();

  const [simulationSetups, setSimulationSetups] = useState([]);

  const [users, setUsers] = useState([]);

  const [parameters, setParameters] = useState(new Map());

  const [dates, setCurrentDates] = useState({
    startDate: null,
    endDate: null,
  });

  const [cookies, setCookie] = useCookies(["token"]);

  dayjs.extend(customParseFormat);
  useEffect(() => {
    getParameters(parameterString);
    getSimulationSetups();
    getUsers();
  }, []);
  /**
   * Gets the parameters from a string.
   * @param {*} string the string.
   * @returns the parameters.
   */
  function getParameters(string) {
    let map = new Map();
    if (string != null && string.length > 0) {
      let array = string.split("&");
      for (let i = 0; i < array.length; i++) {
        let word = array[i];
        let splitArray = word.split("=");
        map.set(splitArray[0], splitArray[1]);
      }
    }
    setParameters(map);
  }

  /**
   * Cancels the filter card and sets the parameters to remember.
   * @param {*} data the form data.
   */
  function cancelForm(data) {
    let pog = makeParameters(data);
    setParameter(pog, false);
    onExit();
  }

  /**
   * Makes a date from the datepicker object.
   * @param {*} date the date object.
   * @returns the date as dd-mm-yyy
   */
  function makeDateString(date) {
    return date.$D + "-" + (date.$M + 1) + "-" + date.$y;
  }

  /**
   * Makes the user checkboxes.
   * @returns the user checkboxes.
   */
  function makeUserCheckBoxes() {
    let checkBoxes = [];
    let i = 0;
    for (let user of users) {
      checkBoxes.push(
        <CheckBox
          id={i}
          title={user}
          key={i}
          className="checkbox"
          register={register}
          isChecked={parameters.get(user) != null}
          registerValue={"U " + user}
        />
      );
      i++;
    }
    return checkBoxes;
  }
  /**
   * Gets the simulation setup from the server
   */
  async function getSimulationSetups() {
    let rawToken = cookies.token;
    let token = "Bearer " + rawToken;
    if (rawToken != null && rawToken != "") {
      let requestOptions = {
        method: "GET",
        headers: {
          Authorization: token,
          Accept: "application/json",
          "Content-Type": "application/json",
          "Acess-Control-Allow-Origin": "*",
        },
      };
      await fetch(host + "/simulationSetup", requestOptions)
        .then((res) => {
          return res.json();
        })
        .then((result) => {
          setSimulationSetups(result);
        });
    }
  }

  /**
   * Gets the simulation setup from the server
   */
  async function getUsers() {
    let rawToken = cookies.token;
    let token = "Bearer " + rawToken;
    if (rawToken != null && rawToken != "") {
      let requestOptions = {
        method: "GET",
        headers: {
          Authorization: token,
          Accept: "application/json",
          "Content-Type": "application/json",
          "Acess-Control-Allow-Origin": "*",
        },
      };
      await fetch(host + "/user", requestOptions)
        .then((res) => {
          return res.json();
        })
        .then((result) => {
          setUsers(result);
        });
    }
  }

  /**
   * Sends the form to the backend.
   * @param {*} data the form data.
   */
  function sendForm(data) {
    setParameter(makeParameters(data), true);
  }

  /**
   * Makes the parameters of this form.
   * @param {*} data the form data.
   * @returns the parameters as string
   */
  function makeParameters(data) {
    let parameterString = "";
    let mapData = new Map(Object.entries(data));
    for (let key of mapData.keys()) {
      let shouldBeSent = mapData.get(key);
      if (shouldBeSent) {
        let array = key.split(" ");
        let parameter = "";
        if (array[0] == "S") {
          parameter = "simulationSetupName";
        } else {
          parameter = "username";
        }
        let seperator = parameterString === "" ? "" : "&";
        parameterString =
          parameterString + seperator + parameter + "=" + array[1];
      }
    }
    if (dates.startDate != null) {
      parameterString = bakeDateIntoString(
        parameterString,
        "startDate",
        dates.startDate
      );
    }
    if (dates.endDate != null) {
      parameterString = bakeDateIntoString(
        parameterString,
        "endDate",
        dates.endDate
      );
    }
    return parameterString;
  }

  /**
   * Bakes the date of choice into the parameters string.
   * @param {*} parameters the parameter string.
   * @param {*} datePrefix the date prefix like 'endDate'
   * @param {*} date the date object itself.
   * @returns the new parameter string.
   */
  function bakeDateIntoString(parameters, datePrefix, date) {
    return parameters + "&" + datePrefix + "=" + makeDateString(date);
  }

  /**
   * Makes the simulation checkboxes.
   * @returns the simulation checkboxes.
   */
  function makeSimulationCheckBoxes() {
    let checkBoxes = [];
    for (let i = 0; i < simulationSetups.length; i++) {
      let simulationSetup = simulationSetups[i];
      checkBoxes.push(
        <CheckBox
          id={simulationSetup.simulationSetupId}
          title={simulationSetup.nameOfSetup}
          key={simulationSetup.simulationSetupId}
          className="checkbox"
          register={register}
          isChecked={parameters.get(simulationSetup.nameOfSetup) != null}
          registerValue={"S " + simulationSetup.nameOfSetup}
          disabled={isCompare}
        />
      );
    }
    return checkBoxes;
  }

  /**
   * Sets the dates of the filter card.
   * @param {[]} dates the dates as array.
   */
  function setDates(dates) {
    if (dates != null) {
      setCurrentDates({
        startDate: dates[0],
        endDate: dates[1],
      });
    }
  }

  /**
   * Changes the format from string to date
   * @param {string} text  
   * @returns a date
   */
  function changeFormat(string) {
    let date = "";
    if (string != null) {
      let array = string.split("-");
      date = array[1] + "/" + array[0] + "/" + array[2];
    }
    return date;
  }

  /**
   * Makes the content of the filter card.
   * @returns the filter card.
   */
  function makeContent() {
    return (
      <form className="card-content">
        <div className="date-section">
          <div className="ob-title" style={{ fontWeight: "600", fontSize: 20 }}>
            Date
          </div>
          <RangePicker
            onChange={(date) => setDates(date)}
            format={"DD/MM/YYYY"}
          />
        </div>
        <div className="session-type-section">
          <div className="ob-title" style={{ fontWeight: "600", fontSize: 20 }}>
            Session type
          </div>
          {makeSimulationCheckBoxes()}
        </div>
        <div className="users-section">
          <div
            className="ob-title"
            style={{ fontWeight: "600", fontSize: "20" }}
          >
            Users
          </div>
          {makeUserCheckBoxes()}
        </div>
        <div className="button-section">
          <NormalButton
            className="cancel-button"
            text="Cancel"
            onClick={handleSubmit(cancelForm)}
          />
          <NormalButton
            className="done-button"
            text="Done"
            onClick={handleSubmit(sendForm)}
          />
        </div>
      </form>
    );
  }

  /**
   * Makes the title content of the filter card.
   * @returns the title content.
   */
  function makeTitleContent() {
    return (
      <div className="filter-header-content">
        <div className="ob-card-header-title">sessions</div>
        <Close
          className={"ob-icon mdi mdi-menu"}
          fontSize="30px"
          onClick={handleSubmit(cancelForm)}
        />
      </div>
    );
  }

  return (
    <div className="filter-body">
      <NormalCard
        content={makeContent()}
        headerContent={makeTitleContent()}
        extraClass="filter-card"
      />
    </div>
  );
}
