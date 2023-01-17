import React, { useEffect } from "react";
import "./Box.css";
import Container from "../Container/Container";
import ContainerMapping from "../ContainerMapping/ContainerMapping";
function Box(props) {
  const onSubmitUpdate = async (event) => {
    event.preventDefault(event);
    console.log(event.target.name.value);
    console.log(event.target.password.value);
    console.log(event.target.role.value);
    console.log(props.product.userId);
    console.log(props.product.userId)
    const response = await fetch(`http://localhost:8080/api/admin/user`, {
      method: "PUT",
      // mode: 'cors',
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: JSON.stringify({
        userId: props.product.userId,
        name: event.target.name.value,
        password: event.target.password.value,
        role: event.target.role.value,
      }),
    });
    window.location.reload();
    const data = await response.json();
    console.log(data);
  };

  

  const onSubmitDelete = async (id) => {
    const response = await fetch(
      `http://localhost:8080/api/admin/user/${props.product.userId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );
    // window.location.reload();
    const data = await response.json();
    console.log(data);
  };

  const onSubmitMapping = async (event) => {
    event.preventDefault();
    console.log(props.id)
    sessionStorage.setItem("altId",props.id)
    const response = await fetch(
      `http://localhost:8080/api/admin/user-device`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        body: JSON.stringify({
          userId: props.id,
          deviceId: sessionStorage.getItem("deviceIdMapping")
        })
      }
    );
  }

 
  return (
    <>
      <div className="containerBox">
        <div className="containerDetails">
          <div className="boxDetails">{props.product.name}</div>
          <div className="boxDetails">{props.product.role}</div>
          <div className="boxDetails">{props.product.password}</div>
        </div>
        <div className="containerButtons">
          <button className="removeButton" onClick={onSubmitDelete}>
            <img
              className="buttonStyle"
              src={require("../../assets/images/icons8-remove-48.png")}
              alt="delete"
            />
          </button>
          <Container
            triggerText={"Update"}
            onSubmit={onSubmitUpdate}
          ></Container>
        </div>
        <ContainerMapping
        triggerText={"Create mapping"}
        onSubmit={onSubmitMapping}
      ></ContainerMapping>
      </div>
    </>
  );
}

export default Box;
