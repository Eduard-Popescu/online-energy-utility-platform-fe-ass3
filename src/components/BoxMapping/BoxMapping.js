import React from 'react'

function BoxMapping(props) {
    const onSubmitDelete = async (id) => {
        const response = await fetch(
          `http://localhost:8080/api/admin/user-device/`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
            body: JSON.stringify({
                userId : props.product2.userId,
                deviceId: props.product.deviceId
            })
          }
        );
        // window.location.reload();
        const data = await response.json();
        console.log(data);
      };
    return (
        <div class="all">
      <div className="containerBox">
        <div className="containerDetails">
         <div>{props.product2.userId}</div>
         <div>{props.product.deviceId}</div>
        </div>
        <div className="containerButtons">
          <button className="removeButton" onClick={onSubmitDelete}>
            <img
              className="buttonStyle"
              src={require("../../assets/images/icons8-remove-48.png")}
              alt="delete"
            />
          </button>
        </div>
      </div>
    </div>
    )
}

export default BoxMapping
