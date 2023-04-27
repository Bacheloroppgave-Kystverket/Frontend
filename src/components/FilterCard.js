import React, { useEffect, useState } from "react";
import Close from "@mui/icons-material/Close";
import NormalCard from "./openBridge/NormalCard";
import CheckBox from "./openBridge/CheckBox";
import { DatePicker, Form } from "antd";
import "./../css/filtercard.css";
import NormalButton from "./openBridge/NormalButton";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function FilterCard({ onExit, setParameter }) {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const { register, handleSubmit } = useForm();
  const [simulationSetups, setSimulationSetups] = useState([]);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    getSimulationSetups();
    getUsers();
  }, []);

  var navigate = useNavigate();

  function cancelButton() {
    onExit();
  }

  function doneButton() {}

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
          registerValue={"U " + user}
        />
      );
      i++;
    }
    return checkBoxes;
  }

  if (startDate != null) {
    //console.log(startDate.$D);
  }
  if (endDate != null) {
    //console.log(endDate);
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

  function sendForm(data) {
    let parameterString = "";
    let mapData = new Map(Object.entries(data));
    for (let key of mapData.keys()) {
      console.log(mapData.get(key));
      console.log(key);
      let shouldBeSent = mapData.get(key);
      if (shouldBeSent) {
        let array = key.split(" ");
        console.log(array);
        let parameter = "";
        if (array[0] === "S") {
          parameter = "simulationSetupName";
        } else {
          parameter = "username";
        }
        let seperator = parameterString === "" ? "" : "&";
        parameterString =
          parameterString + seperator + parameter + "=" + array[1];
        console.log(parameterString);
      }
    }
    setParameter(parameterString);
  }

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
          registerValue={"S " + simulationSetup.nameOfSetup}
        />
      );
    }
    return checkBoxes;
  }

  function makeContent(date, sessionType, users) {
    return (
      <form className="card-content">
        <div className="date-section">
          <div className="ob-title" style={{ fontWeight: "600", fontSize: 20 }}>
            Date
          </div>
          <DatePicker
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
          />
          <DatePicker
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
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
            onClick={cancelButton}
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
