import React, { useState } from "react";
import "./Header.css";
import { useNavigate, Link } from "react-router-dom";

function Header() {
  let navigate = useNavigate();
  const [logged, setLogged] = useState(false);
  let role = sessionStorage.getItem("role");

  return (
    <>
      <div className="header">
        {role === "Admin" ? (
          <div
            className="menu"
            onClick={() => {
              navigate("/admin");
            }}
          >
            Menu
          </div>
        ) : (
          ""
        )}
        {role === "Admin" ? (
          <div
            className="menu"
            onClick={() => {
              navigate("/chat");
            }}
          >
            Chat
          </div>
          ) : (
          ""
        )}

          {role === "Regular" ? (
          <div
            className="menu"
            onClick={() => {
              navigate("/chatUser");
            }}
          >
            Chat
          </div>
          ) : (
            ""
          )}
      

        <div
          className="menu"
          onClick={() => {
            setLogged(true);
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("role");
            sessionStorage.removeItem("userId");
            sessionStorage.removeItem("altId");
            sessionStorage.removeItem("deviceId");
            navigate("/login");
          }}
        >
          {logged === true ? "Login " : "Logout"}
        </div>
        {role === "Admin" ? (
          <div
            className="menu"
            onClick={() => {
              navigate("/adminDevices");
            }}
          >
            Devices
          </div>
        ) : (
          ""
        )}
        {role === "Regular" ? (
          <div
            className="menu"
            onClick={() => {
              navigate("/userDevices");
            }}
          >
            My Devices
          </div>
        ) : (
          ""
        )}

        {role === "Regular" ? (
          <Link to="/userChart" className="menu">
            User Chart
          </Link>
        ) : (
          ""
        )}

        <div
          className="menu"
          onClick={() => {
            if (role === "Admin") {
              navigate("/adminUsers");
            }
          }}
        >
          {role === "Admin" ? "User" : ""}
        </div>
      </div>
    </>
  );
}

export default Header;
