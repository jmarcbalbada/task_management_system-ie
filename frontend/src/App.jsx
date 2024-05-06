import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/pages/Login.tsx";
import Signup from "./components/pages/Signup.tsx";
import useAuthentication from "./hocs/useAuthentication";

function App() {
  const { user, authenticate } = useAuthentication();

  console.log("authenticate", authenticate);

  return (
    <Router>
      <>
        <Routes>
          <Route
            path="/"
            element={user ? <Dashboard /> : <Navigate to={"/login"} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
