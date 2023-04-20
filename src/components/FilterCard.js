import React, { useState } from 'react';
import Close from "@mui/icons-material/Close";
import NormalCard from "./openBridge/NormalCard";
import CheckBox from './openBridge/CheckBox';
import { DatePicker, Form } from "antd";
import "./../css/filtercard.css";
import NormalButton from './openBridge/NormalButton';
import { useNavigate } from 'react-router-dom';



export default function FilterCard() {
  const [startDate, setStartDate] = useState(new Date("2023/04/20"));
  const [endDate, setEndDate] = useState(new Date("2023/04/20"));

  var navigate = useNavigate();

  function cancelButton() {
    navigate("/")
  }

  function doneButton() {
    navigate("/")
  }

  function makeContent(date, sessionType, users) {
    return (
      <div className='card-content'>
        <div className="date-section">
          <div className="ob-title"
          style={{ fontWeight: "600", fontSize: 20 } }>Date</div>
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
          <div className='ob-title' style={{ fontWeight: "600", fontSize: 20 } }>Session type</div>
          <CheckBox
            id='1'
            title="Tugboat"
            className="checkbox"
          />
          <CheckBox
            id='2'
            title="Hurtigruta"
            className="checkbox"
          />
          <CheckBox
            id='3'
            title="Tanker"
            className="checkbox"
          />
        </div>
        <div className="users-section">
          <div className='ob-title' style={{ fontWeight: "600", fontSize: "20" } }>Users</div>
          <CheckBox
            id='1'
            title="Arnhild (You)"
            className="checkbox"
          />
          <CheckBox
            id='2'
            title="Bjarne"
            className="checkbox"
          />
          <CheckBox
            id='3'
            title="Jan"
            className="checkbox"
          />
        </div>
        <div className='button-section'>
          <NormalButton
            className="cancel-button"
            text="Cancel"
            onClick={cancelButton}
          />
          <NormalButton
            className="done-button"
            text="Done"
            onClick={doneButton}
          />
        </div>
       


      </div>
    )

  }

  function makeTitleContent() {
    return (
      <div className='filter-header-content'>
        <div className='ob-card-header-title'>
          sessions
        </div>
        <Close
          className={"ob-icon mdi mdi-menu"}
          fontSize="30px"
        />
      </div>
    )
  }
  
  return (
    <NormalCard
      style={{maxWidth:"300px"}}
      content={makeContent()}
      headerContent={makeTitleContent()}
    />
  )
}
