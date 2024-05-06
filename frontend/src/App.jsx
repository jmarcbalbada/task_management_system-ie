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
          {authenticate ? (
            <Route path="/" element={<Dashboard />} />
          ) : (
            <Route path="/" element={<Navigate to="/login" />} />
            // console.log("no user defined", user)
          )}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
