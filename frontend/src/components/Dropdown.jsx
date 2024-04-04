import * as React from "react";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { useState } from "react";

export default function Dropdown({ onSelectClick, status }) {
  const [selectedStatus, setSelectedStatus] = useState(status);

  const getBackgroundColor = (status) => {
    switch (status) {
      case "To Do":
        return "#2196f3"; // Blue
      case "In Progress":
        return "#ff9800"; // Orange
      case "Done":
        return "#4caf50"; // Green
      case "Cancelled":
        return "#f44336"; // Red
    }
  };

  const handleChange = (event, newValue) => {
    console.log(`You have chosen "${newValue}"`);
    setSelectedStatus(newValue);
    onSelectClick(newValue);
  };

  const handleClick = (event, value) => {
    console.log("Select clicked");
  };

  const backgroundColor = getBackgroundColor(selectedStatus);

  return (
    <Select
      size="sm"
      value={selectedStatus}
      onChange={handleChange}
      onClick={handleClick}
      variant="soft"
      autoFocus={false} // Disable autofocus
      sx={{
        width: "120px",
        height: "20px",
        color: "#ffffff",
        fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
        fontSize: "13px",
        backgroundColor: backgroundColor,
        "&:hover": {
          backgroundColor: backgroundColor,
        },
      }}
    >
      <Option value="To Do">To Do</Option>
      <Option value="In Progress">In Progress</Option>
      <Option value="Done">Done</Option>
      <Option value="Cancelled">Cancelled</Option>
    </Select>
  );
}
