import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import BoxDevice from "../../components/BoxDevice/BoxDevice";
import "../AdminDevices/AdminDevices.css";
import ContainerDevices from "../../components/ContainerDevices/ContainerDevices";
import "../../components/TriggerButton/TriggerButton.css";

function AdminDevices() {
  const [devices, setDevices] = useState([]);
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

  const onSubmitDevices = async (event) => {
    event.preventDefault(event);
    console.log(event.target.description.value);
    console.log(event.target.street.value);
    console.log(event.target.maximumHourlyEnergyConsumption.value);
    const response = await fetch("http://localhost:8080/api/admin/device/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: JSON.stringify({
        description: event.target.description.value,
        street: event.target.street.value,
        city: event.target.city.value,
        country: event.target.country.value,
        postalCode: event.target.postalCode.value,
        maximumHourlyEnergyConsumption: event.target.maximumHourlyEnergyConsumption.value,
      }),
    });
    window.location.reload();
    const data = await response.json();
    console.log(data);
  };


  return (
    <>
      <Header></Header>
      <div className="mainContainer">
        <div className="createContainer">
          <ContainerDevices triggerText={"Create device"} onSubmit={onSubmitDevices} />
        </div>
        <div className="adminContainer">
          {sessionStorage.getItem("role") === "Admin" ? devices.map((device) => (
            <BoxDevice key={device.deviceId} product={device}></BoxDevice>
          )) : ""}
        </div>
      </div>
    </>
  );
}
export default AdminDevices;
