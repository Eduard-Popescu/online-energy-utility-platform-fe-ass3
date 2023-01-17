import React, { useEffect, useState } from "react";
import "../../pages/AdminUsers/AdminUsers.css";

import "react-dropdown/style.css";

export const FormMapping = ({ onSubmit }, props) => {
  const [devices, setDevices] = useState([]);
  
  const [state, setState] = useState({});
 
  const fetchData = async () => {
    const response = await fetch("http://localhost:8080/api/admin/device/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });

    const data = await response.json();

    setDevices(data);
    console.log(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  
  function handleChange(event) {
    sessionStorage.setItem("deviceIdMapping",event.target.value);
    setState({ value: event.target.value });
    
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label>
          Pick an Id:
          <select value={state.value} onChange={handleChange}>
            {devices.map(device => (
              <option value={device.deviceId}>{device.deviceId}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="form-group">
        <button className="form-control btn btn-primary" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};
export default FormMapping;
