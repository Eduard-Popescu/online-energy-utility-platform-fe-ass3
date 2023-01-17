import React from "react";
import "./PrimaryButton.css";

function PrimaryButton(props) {
  const title = props.title;
  const type = props.type;
  const click = props.onClick;
 
  return (
    <div className="containerFirst">
      <button className="containerButton" onClick={click} type={type}>
        {title}
      </button>
    </div>
  );
}

export default PrimaryButton;
