import React, {useState} from "react";
import BoxMapping from "../../components/BoxMapping/BoxMapping";
import ContainerMapping from "../../components/ContainerMapping/ContainerMapping";


function Mapping() {
    const [devicesMapping, setDevicesMapping] = useState([]);
    const [usersMapping, setUsersMapping] = useState([]);
  const onSubmitMapping = async (event) => {
    event.preventDefault(event);
    console.log(event.target.userId.value);
    console.log(event.target.deviceId.value);
    const response = await fetch("http://localhost:8080/api/admin/user-device/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: JSON.stringify({
        userId : event.target.userId.value,
        deviceId: event.target.deviceId.value
      }),
    });
    // window.location.reload();
    const data = await response.json();
    console.log(data);
  };

  const fetchDataDevice = async () => {
    const response = await fetch("http://localhost:8080/api/admin/device/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
    const response2 = await fetch("http://localhost:8080/api/admin/user/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
//////////get la user-device alt id pentru mapare
    const data = await response.json();
    const data2 = await response.json();

    setDevicesMapping(data);
    setUsersMapping(data2);
    console.log(data);
  };

  return (
    <>
      <ContainerMapping
        triggerText={"Create mapping"}
        onSubmit={onSubmitMapping}
      ></ContainerMapping>
      <BoxMapping product={devicesMapping} product2={usersMapping}></BoxMapping>
    </>
  );
}

export default Mapping;
