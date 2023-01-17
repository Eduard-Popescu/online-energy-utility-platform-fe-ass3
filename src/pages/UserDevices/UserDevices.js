import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import BoxDevice from "../../components/BoxDevice/BoxDevice";
import "../AdminDevices/AdminDevices.css";
function UserDevices() {
  const [devices, setDevices] = useState([]);
  const userId = sessionStorage.getItem('userId')
  const fetchData = async () => {
    const response = await fetch(`http://localhost:8080/api/user/user-device/${userId}`, {
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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Header></Header>
      <div className="mainContainer">
        <div className="adminContainer">
          {sessionStorage.getItem("role") === "Regular"
            ? devices.map((device) => (
                <BoxDevice key={device.deviceId} product={device}></BoxDevice>
              ))
            : ""}
        </div>
      </div>
    </>
  );
}

export default UserDevices;
