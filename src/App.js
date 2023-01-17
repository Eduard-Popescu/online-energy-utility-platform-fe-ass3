import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Admin from "./pages/Admin/Admin";
import Login from "./pages/Login/Login";
import AdminUsers from "./pages/AdminUsers/AdminUsers";
import AdminDevices from "./pages/AdminDevices/AdminDevices";
import UserChart from "./pages/UserChart/UserChart";
import { useState } from "react";
import UserDevices from "./pages/UserDevices/UserDevices";
import ChatRoom from "./components/Chat/ChatRoom";

function App() {
  const [user, setUser] = useState({
    role: sessionStorage.getItem("role"),
  });

  const ProtectedRoute = ({
    isAllowed,
    user,
    redirectPath = "/login",
    children,
  }) => {
    if (!isAllowed) {
      return <Navigate to={redirectPath} replace />;
    }

    return children ? children : <Outlet />;
  };
  const ProtectedRouteSecond = ({
    isAllowed,
    user,
    redirectPath = "/",
    children,
  }) => {
    if (!isAllowed) {
      return <Navigate to={redirectPath} replace />;
    }

    return children ? children : <Outlet />;
  };

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Login />}></Route>
        <Route element={<ProtectedRoute isAllowed={user.role === "Admin"} />}>
          <Route path="/chat" element = {<ChatRoom />}></Route>
          <Route path="/admin" element={<Admin />} />
          <Route path="adminUsers" element={<AdminUsers />} />
          <Route path="/adminDevices" element={<AdminDevices />}></Route>
        </Route>
        <Route element={<ProtectedRouteSecond isAllowed={user.role === "Regular"} />}>
          <Route path="/chatUser" element = {<ChatRoom />}></Route>
          <Route path="/userChart" element={<UserChart />}></Route>
          <Route path="/userDevices" element={<UserDevices />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
