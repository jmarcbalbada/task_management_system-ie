import React, { useState, useEffect } from "react";
import Box from "@mui/joy/Box";
import List from "@mui/joy/List";
import Divider from "@mui/joy/Divider";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import Typography from "@mui/material/Typography";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import Tooltip from "@mui/joy/Tooltip";
import axios from "axios";
import config from "../data/configure";

const NavDrawer = ({ onListItemClick }) => {
  const [categories, setCategories] = useState([]);
  const [navDrawerHeight, setNavDrawerHeight] = useState(window.innerHeight);

  // Fetch categories from backend when component mounts
  useEffect(() => {
    axios
      .get(`${config.API_URL}categories`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  useEffect(() => {
    setNavDrawerHeight(window.innerHeight + 300);
    console.log("new height", window.innerHeight);
  }, [window.innerHeight]);

  const handleListItemClick = (category) => {
    onListItemClick(category);
  };
  return (
    <Box
      sx={{
        backgroundColor: "white",
        width: "270px",
        height: navDrawerHeight,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          paddingLeft: "9%",
          paddingTop: "12px",
          marginBottom: "16px",
          color: "#121e24", // Same color as the list items
          cursor: "default",
        }}
      >
        Task Management
        <Tooltip title="Create new category" variant="solid" size="sm">
          <DriveFileRenameOutlineOutlinedIcon
            sx={{
              paddingLeft: "15px",
              cursor: "pointer",
            }}
          />
        </Tooltip>
      </Typography>

      <List>
        {categories.map((category) => (
          <ListItem key={category.category_id}>
            <ListItemButton onClick={() => handleListItemClick(category)}>
              {category.category_name}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );
};

export default NavDrawer;
