import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../stateManagement/auth-context";
import PrimaryButton from "../../components/Button/PrimaryButton";
import Header from "../../components/Header/Header";
import "./Login.css";

function Login(props) {
  const LOGIN_URL = "http://localhost:8080/api/login";
  let isLoggedIn = false;
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const { setAuth } = useContext(AuthContext);
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setErrMsg("Login Failed");
  }, [user, pwd]);

  var roleUser;
  async function componentDidMount() {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: user, password: pwd }),
      };

      const response = await fetch(LOGIN_URL, requestOptions);
      const data = await response.json();
      
      var token = data.token;
      roleUser = data.role;
      var userId = data.userId;
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("role", roleUser);
      sessionStorage.setItem("userId", userId )
      isLoggedIn = true;
      sessionStorage.setItem("logged",isLoggedIn)
      sessionStorage.setItem("userName",user)
      setAuth({ user, pwd, token });
    
      setUser("");
      setPwd("");
      const tokenFromStorage = sessionStorage.getItem("token");
       
      if (token === tokenFromStorage) {
        if (roleUser === "Admin") {
          navigate("/admin");
        } else if (roleUser === "Regular") {
          navigate("/userDevices");
        }
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 404) {
        setErrMsg("User not found");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
    }
  }
 var roleUserfromStorage = sessionStorage.getItem("role");
  return (
    <>
      <Header role={roleUserfromStorage} logged={isLoggedIn}/>

      <div className="container">
        <div className="containerLogin">
          <div className="titleSignIn">Sign In</div>
          <div className="containerInputs">
            <input
              className="input"
              placeholder="Username"
              value={user}
              id="name"
              onChange={(e) => {
                setUser(e.target.value);
              }}
            ></input>
            <input
              className="input"
              placeholder="Parola"
              value={pwd}
              id="password"
              onChange={(e) => setPwd(e.target.value)}
            ></input>
          </div>
          <PrimaryButton
            title="Login"
            type="submit"
            onClick={componentDidMount}
          />
        </div>
      </div>
    </>
  );
}

export default Login;
