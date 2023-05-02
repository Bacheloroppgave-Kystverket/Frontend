import React, { useEffect, useState } from "react";
import Close from "@mui/icons-material/Close";
import NormalCard from "./openBridge/NormalCard";
import CheckBox from "./openBridge/CheckBox";
import { DatePicker, Form } from "antd";
import "./../css/filtercard.css";
import "./../css/floatingMenu.css";
import NormalButton from "./openBridge/NormalButton";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { faL } from "@fortawesome/free-solid-svg-icons";

export default function FilterCard({ onExit, setParameter, parameterString }) {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState(new Date());
  const { register, handleSubmit } = useForm();
  const [simulationSetups, setSimulationSetups] = useState([]);

  const [users, setUsers] = useState([]);

  let parameters = getParameters(parameterString);

  useEffect(() => {
    getSimulationSetups();
    getUsers();
  }, []);

  var navigate = useNavigate();

  /**
   * Gets the parameters from a string.
   * @param {*} string the string.
   * @returns the parameters.
   */
  function getParameters(string) {
    return string != null && string.length > 0
      ? string.split("&").map((word) => word.split("=")[1])
      : [];
  }

  /**
   * Cancels the filter card and sets the parameters to remember.
   * @param {*} data the form data.
   */
  function cancelButton(data) {
    let pog = makeParameters(data);
    setParameter(pog, false);
    console.log(pog);
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
          isChecked={parameters.some((param) => param == user)}
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
    let rawToken = localStorage.getItem("token");
    let token = "Bearer " + rawToken;
    let requestOptions = {
      method: "GET",
      headers: {
        Authorization: token,
        Accept: "application/json",
        "Content-Type": "application/json",
        "Acess-Control-Allow-Origin": "*",
      },
    };
    await fetch("http://localhost:8080/simulationSetup", requestOptions)
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setSimulationSetups(result);
      });
  }

  /**
   * Gets the simulation setup from the server
   */
  async function getUsers() {
    let rawToken = localStorage.getItem("token");
    let token = "Bearer " + rawToken;
    let requestOptions = {
      method: "GET",
      headers: {
        Authorization: token,
        Accept: "application/json",
        "Content-Type": "application/json",
        "Acess-Control-Allow-Origin": "*",
      },
    };
    await fetch("http://localhost:8080/user", requestOptions)
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setUsers(result);
      });
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
        if (array[0] === "S") {
          parameter = "simulationSetupName";
        } else {
          parameter = "username";
        }
        let seperator = parameterString === "" ? "" : "&";
        parameterString =
          parameterString + seperator + parameter + "=" + array[1];
      }
    }
    if (startDate != null) {
      parameterString = bakeDateIntoString(
        parameterString,
        "startDate",
        startDate
      );
    }
    if (endDate != null) {
      parameterString = bakeDateIntoString(parameterString, "endDate", endDate);
    }
    return parameterString;
  }

  function bakeDateIntoString(parameters, datePrefix, date) {
    let string = "";
    if (parameters === "") {
      string = parameters + "?" + datePrefix + "=" + makeDateString(date);
    } else {
      string = parameters + "&" + datePrefix + "=" + makeDateString(date);
    }
    return string;
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
          isChecked={parameters.some(
            (param) => param == simulationSetup.nameOfSetup
          )}
          registerValue={"S " + simulationSetup.nameOfSetup}
        />
      );
    }
    return checkBoxes;
  }

  function setBeginningDate(date) {
    console.log(date.toDate().getTime() < endDate.toDate().getTime());
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
          <DatePicker
            onChange={(date) => setBeginningDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            format={"DD/MM/YYYY"}
          />
          <DatePicker
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
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
            onClick={handleSubmit(cancelButton)}
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

  function makeTitleContent() {
    return (
      <div className="filter-header-content">
        <div className="ob-card-header-title">sessions</div>
        <Close
          className={"ob-icon mdi mdi-menu"}
          fontSize="30px"
          onClick={() => onExit()}
        />
      </div>
    );
  }

  return (
    <div className="filter-body">
      <NormalCard
        style={{ maxWidth: "300px" }}
        content={makeContent()}
        headerContent={makeTitleContent()}
      />
    </div>
  );
}
