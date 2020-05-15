import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const ReminderView = ({time, setReminder, saveReminder, isLoading}) => {
  return (
    <>
      <div
        onClick={() => setReminder( "Off" )}
        className={
          time === "Off" ? "reminder-option_active" : "reminder-option"
        }
      >
        <h2>Turn Off </h2>
        <FontAwesomeIcon
          className="icon"
          style={time === "Off" ? "" : { display: "none" }}
          icon="check"
        />
      </div>
      <div
        onClick={() => setReminder("*/30 * * * * *" )}
        className={
          time === "*/30 * * * * *"
            ? "reminder-option_active"
            : "reminder-option"
        }
      >
        <h2>Every 30 seconds(For testing only)</h2>
        <FontAwesomeIcon
          className="icon"
          style={time === "*/30 * * * * *" ? "" : { display: "none" }}
          icon="check"
        />
      </div>
      <div
        onClick={() =>
          setReminder("* */30 * * * *" )
        }
        className={
          time === "* */30 * * * *"
            ? "reminder-option_active"
            : "reminder-option"
        }
      >
        <h2>Every 30 Minutes</h2>
        <FontAwesomeIcon
          className="icon"
          style={time === "* */30 * * * *" ? "" : { display: "none" }}
          icon="check"
        />
      </div>
      <div
        onClick={() =>
          setReminder("* * */12 * * *" )
        }
        className={
          time === "* * */12 * * *"
            ? "reminder-option_active"
            : "reminder-option"
        }
      >
        <h2>Every 12 hours</h2>
        <FontAwesomeIcon
          className="icon"
          style={time === "* * */12 * * *"? "" : { display: "none" }}
          icon="check"
        />
      </div>
      <div
        onClick={() =>
          setReminder("* * */24 * * *")
        }
        className={
          time === "* * */24 * * *"? "reminder-option_active" : "reminder-option"
        }
      >
        <h2>Once in a day</h2>
        <FontAwesomeIcon
          className="icon"
          style={time === "* * */24 * * *" ? "" : { display: "none" }}
          icon="check"
        />
      </div>
      <div
        onClick={() =>
          setReminder("* * * * * */6" )
        }
        className={
          time === "* * * * * */6"? "reminder-option_active" : "reminder-option"
        }
      >
        <h2>Once in a week</h2>
        <FontAwesomeIcon
          className="icon"
          style={time === "* * * * * */6" ? "" : { display: "none" }}
          icon="check"
        />
      </div>
     <div className="center mt-1"><button className="medium" onClick={saveReminder}>{isLoading?'Saving...':'Save Reminder'}</button></div> 
    </>
  );
};
export default ReminderView;
