import React, { useEffect } from "react";

import "./Admin.css";
import "../../components/AdminButton/AdminButton.css"
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";
function Admin() {
  let navigate = useNavigate();
  const toUsers = () => {
    navigate("/adminUsers");
  };
  const toDevices = () => {
    navigate("/adminDevices");
  };

  return (
    <>
      <Header></Header>
      <div className="headline">I want to update</div>
      <div className="containerButtonsAdmin">
        <button className="buttonAdmin" onClick={toUsers}>
          Users
        </button>
        <button className="buttonAdmin" onClick={toDevices}>
          Devices
        </button>
      </div>
    </>
  );
}

export default Admin;
