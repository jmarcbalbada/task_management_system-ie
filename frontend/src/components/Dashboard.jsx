import React, { useEffect, useState } from "react";
import NavDrawer from "../hocs/NavDrawer";
import TaskContents from "./TaskContents";
import WriteNowImage from "../assets/write_now.png";
import useAuthentication from "../hocs/useAuthentication";
import axios from "axios";
import config from "../data/configure";

const Dashboard = () => {
  const { user } = useAuthentication();
  const [category, setCategory] = useState(null);
  const [userId, setUserId] = useState(null);

  // useEffect(() => {
  //   console.log("user", user);
  // })
  console.log("user", user);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Access the username from the user object
        const response = await axios.post(
          `${config.API_URL}user/getByUsername`,
          { username: user.username }
        );
        if (response) {
          console.log("user id", response.data.user_id);
          setUserId(response.data.user_id)
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // Call the fetchUserData function
    if (user) {
      fetchUserData();
    }
  }, [user]); // Add user as a dependency to useEffect

  const handleNavItemClick = (receivedCategory) => {
    setCategory(receivedCategory);
  };

  return (
    <div style={{ display: "flex" }}>
      <NavDrawer onListItemClick={handleNavItemClick} user_id={userId}/>
      {category === null ? (
        <div
          style={{
            textAlign: "center",
            marginTop: "8%",
            justifyContent: "center",
            position: "relative",
            flex: 1,
            paddingLeft: "300px",
            display: "inline",
            whiteSpace: "nowrap",
          }}
        >
          {/* Render the image */}
          <h1> No category selected, create or select one.</h1>
          <img src={WriteNowImage} alt="Write Now" />
        </div>
      ) : (
        <TaskContents categoryId={category.category_id} />
      )}
    </div>
  );
};

export default Dashboard;
