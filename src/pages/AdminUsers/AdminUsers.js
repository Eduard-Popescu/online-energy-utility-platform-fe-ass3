import "./AdminUsers.css";
import React, {useState, useEffect} from "react";
import Box from "../../components/Box/Box";
import Header from "../../components/Header/Header";
import "../../components/TriggerButton/TriggerButton.css";
import { Container } from '../../components/Container/Container';

function Admin() {
  
  const [users, setUsers] = useState([]);
  const fetchData = async () => {
    const response = await fetch("https://online-energy-utility-plat.herokuapp.com/api/admin/user/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });

    const data = await response.json();

    setUsers(data);
    console.log(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault(event);
    console.log(event.target.name.value);
    console.log(event.target.password.value);
    console.log(event.target.role.value);
    const response = await fetch("http://localhost:8080/api/admin/user/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: JSON.stringify({name: event.target.name.value, password: event.target.password.value, role: event.target.role.value})
    });
    window.location.reload();
    const data =await response.json();
    console.log(data);
  };
  const triggerText = 'Create user';

  return (
    <>
      <Header></Header>
     
      <div className="mainContainer">
        <div className="createContainer">
          <Container triggerText={triggerText} onSubmit={onSubmit} />
        </div>
        <div className="adminContainer">
          {users.map((user)=> (
            <Box product={user} id={user.userId}></Box>
          ))}
          
        </div>
      </div>
    </>
  );
}

export default Admin;
