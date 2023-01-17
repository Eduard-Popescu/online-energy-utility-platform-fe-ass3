import React, { useEffect } from "react";
import ContainerDevices from "../ContainerDevices/ContainerDevices";
import "../BoxDevice/BoxDevice.css";
import ContainerMapping from "../ContainerMapping/ContainerMapping";
function BoxDevice(props) {
  const onDeleteDevices = async (event) => {
    event.preventDefault(event);

    const response = await fetch(
      "https://online-energy-utility-plat.herokuapp.com/api/admin/device/" + props.product.deviceId,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          id: props.product.deviceId,
          descripton: event.target.description.value,
          street: event.target.street.value,
          city: event.target.city.value,
          country: event.target.country.value,
          postalCode: event.target.postalCode.value,
          hc: event.target.hc.value,
        }),
      }
    );
    window.location.reload();
    const data = await response.json();
    console.log(data);
  };

  const onSubmitUpdateDevice = async (event) => {
    console.log(props.product.deviceId);
    event.preventDefault(event);
    // console.log(event.target.description.value);
    // console.log(event.target.street.value);
    // console.log(event.target.city.value);
    // console.log(event.target.country.value);
    // console.log(event.target.postalCode.value);
    //console.log(event.target.hc.value);
    const response = await fetch(`http://localhost:8080/api/admin/device`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: JSON.stringify({
        deviceId: props.product.deviceId,
        description: event.target.description.value,
        street: event.target.street.value,
        city: event.target.city.value,
        country: event.target.country.value,
        postalCode: event.target.postalCode.value,
        maximumHourlyEnergyConsumption:
          event.target.maximumHourlyEnergyConsumption.value,
      }),
    });

    // window.location.reload();
    const data = await response.json();
    console.log(data);
  };

  const onSubmitDelete = async (id) => {
    const response = await fetch(
      `http://localhost:8080/api/admin/device/${props.product.deviceId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );
    window.location.reload();
    const data = await response.json();
    console.log(data);
  };

  return (
    <div class="all">
      <div className="containerBox">
        <div className="containerDetails">
          <div className="boxDetails">{props.product.description}</div>
          <div className="boxDetails">{props.product.street}</div>
          <div className="boxDetails">{props.product.city}</div>
          <div className="boxDetails">{props.product.country}</div>
          <div className="boxDetails">{props.product.postalCode}</div>
          <div className="boxDetails">
            {props.product.maximumHourlyEnergyConsumption}
          </div>
        </div>
        {sessionStorage.getItem("role") === "Admin" ? <div className="containerButtons">
          <button className="removeButton" onClick={onSubmitDelete}>
            <img
              className="buttonStyle"
              src={require("../../assets/images/icons8-remove-48.png")}
              alt="delete"
            />
          </button>
          <ContainerDevices
            triggerText={"Update device"}
            onSubmit={onSubmitUpdateDevice}
          ></ContainerDevices>
        </div> : " "}
      </div>
    </div>
  );
}

export default BoxDevice;
