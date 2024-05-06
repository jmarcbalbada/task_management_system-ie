import { useState, useEffect } from "react";

// Define your custom hook for user authentication
function useAuthentication() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [authenticate, setAuthenticate] = useState(false);

  // Function to perform login
  const login = (username, password) => {
    // You can implement your authentication logic here
    if (username && password) {
      localStorage.setItem("user", JSON.stringify({ username }));
      setUser({ username }); // Set the user object with username
      setError(null);
      setAuthenticate(true);
      // Store user information in localStorage
    } else {
      setAuthenticate(false);
      setUser(null);
      setError("Invalid username or password");
    }
  };

  // Function to perform logout
  const logout = () => {
    // Clear user state and remove from localStorage
    setUser(null);
    setError(null);
    setAuthenticate(false);
    localStorage.removeItem("user");
  };

  // // Set user data in localStorage whenever it changes
  // useEffect(() => {
  //   localStorage.setItem("user", JSON.stringify(user));
  // }, []);

  // Check localStorage on component mount for user information
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log("local", storedUser);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setAuthenticate(true);
    }
  }, []);

  // Return state and functions for authentication
  return { user, error, login, logout, authenticate };
}

export default useAuthentication;
