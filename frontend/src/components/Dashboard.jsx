import React, { useState } from "react";
import NavDrawer from "../hocs/NavDrawer";
import TaskContents from "./TaskContents";
import WriteNowImage from "../assets/write_now.png";

const Dashboard = () => {
  const [category, setCategory] = useState(null);

  const handleNavItemClick = (receivedCategory) => {
    setCategory(receivedCategory);
  };

  return (
    <div style={{ display: "flex" }}>
      <NavDrawer onListItemClick={handleNavItemClick} />
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
