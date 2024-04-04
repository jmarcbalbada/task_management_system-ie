import React, { useState } from "react";
import NavDrawer from "../hocs/NavDrawer";
import TaskContents from "./TaskContents";

const Dashboard = () => {
  const [category, setCategory] = useState(null);

  const handleNavItemClick = (receivedCategory) => {
    setCategory(receivedCategory);
  };

  return (
    <div style={{ display: "flex" }}>
      <NavDrawer onListItemClick={handleNavItemClick} />
      {category === null ? (
        <h1
          style={{
            textAlign: "center",
            margin: "auto",
            justifyContent: "center",
            position: "relative",
            flex: 1,
            paddingLeft: "2%",
            display: "inline",
            whiteSpace: "nowrap",
          }}
        >
          No category selected.
        </h1>
      ) : (
        <TaskContents categoryId={category.category_id} />
      )}
    </div>
  );
};

export default Dashboard;
