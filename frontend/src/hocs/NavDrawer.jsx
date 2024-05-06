import React, { useState, useEffect } from "react";
import Box from "@mui/joy/Box";
import List from "@mui/joy/List";
import Divider from "@mui/joy/Divider";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import Typography from "@mui/material/Typography";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import Tooltip from "@mui/joy/Tooltip";
import PositionedMenu from "../components/PositionedMenu";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Dropdown from "@mui/joy/Dropdown";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Button from "@mui/joy/Button";
import axios from "axios";
import config from "../data/configure";
import useAuthentication from "./useAuthentication";
import { useNavigate } from "react-router-dom";

const NavDrawer = ({ onListItemClick, user_id }) => {
  const [categories, setCategories] = useState([]);
  const [navDrawerHeight, setNavDrawerHeight] = useState(window.innerHeight);
  const [showModal, setShowModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(-1);
  const { user, logout } = useAuthentication();
  const navigate = useNavigate();

  // Fetch categories from backend when component mounts
  useEffect(() => {
    axios
      .get(`${config.API_URL}categories/getCategory/${user_id}`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, [categories]);

  useEffect(() => {
    setNavDrawerHeight(window.innerHeight + 300);
  }, [window.innerHeight]);

  const onLogoutClicked = () => {
    logout();
    navigate("/login");
  };

  const handleListItemClick = (category, index) => {
    onListItemClick(category);
    setSelectedCategoryIndex(index);
  };

  const handleAddCategory = () => {
    // Show modal
    setShowModal(true);
  };

  const handleCloseModal = () => {
    // Hide modal
    setShowModal(false);
    // Clear new category name
    setNewCategoryName("");
  };

  const handleCreateCategory = () => {
    // Add your logic here to create a new category
    // Send a request to the backend to add the new category
    axios
      .post(`${config.API_URL}categories`, { category_name: newCategoryName, user_id: user_id })
      .then((response) => {
        console.log("Category added successfully");
        // Reload categories
        axios
          .get(`${config.API_URL}categories`)
          .then((response) => {
            setCategories(response.data);
          })
          .catch((error) => {
            console.error("Error fetching categories:", error);
          });
      })
      .catch((error) => {
        console.error("Error adding category:", error);
      });

    // Close modal
    handleCloseModal();
  };

  const buttonStyle = {
    marginTop: "20px",
    backgroundColor: "#0b6bcb", // Button color
    color: "white", // Text color
    "&:hover": {
      backgroundColor: "#0a549f", // Darker shade for hover effect
    },
  };

  return (
    <>
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
            paddingLeft: "4%",
            paddingTop: "12px",
            // marginBottom: "16px",
            color: "#121e24", // Same color as the list items
            fontFamily:
              "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
            cursor: "default",
          }}
        >
          Task Management
          <Tooltip
            title="Create new category"
            variant="solid"
            size="sm"
            onClick={handleAddCategory}
          >
            <DriveFileRenameOutlineOutlinedIcon
              sx={{
                paddingLeft: "15px",
                cursor: "pointer",
              }}
            />
          </Tooltip>
        </Typography>

        <List>
          {categories.map((category, index) => (
            <ListItem key={category.category_id}>
              <ListItemButton
                onClick={() => handleListItemClick(category, index)}
                sx={{
                  backgroundColor:
                    selectedCategoryIndex === index
                      ? "rgba(151,151,151,0.8)"
                      : "inherit",
                  color: selectedCategoryIndex === index ? "white" : "inherit",
                  transition: "background-color 0.3s ease",
                  "&:hover": {
                    backgroundColor:
                      selectedCategoryIndex === index
                        ? "rgba(128,128,128,0.8)"
                        : "inherit",
                  },
                }}
              >
                {category.category_name}
              </ListItemButton>
              {/* Pass category_id as props to PositionedMenu */}
              <PositionedMenu category={category} />
            </ListItem>
          ))}
        </List>
        <Divider />

        {/* Modal for adding a new category */}
        <Modal open={showModal} onClose={handleCloseModal}>
          <ModalDialog>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogContent>
              <FormControl fullWidth>
                <FormLabel>Name</FormLabel>
                <Input
                  autoFocus
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                />
                <Button
                  variant="contained"
                  onClick={handleCreateCategory}
                  sx={buttonStyle}
                >
                  Create
                </Button>
              </FormControl>
              <Box mt={2}></Box>
            </DialogContent>
          </ModalDialog>
        </Modal>
      </Box>

      <Dropdown>
        <MenuButton
          sx={{
            color: "#121e24",
            position: "fixed",
            bottom: "0px",
            width: "200px",
            textAlign: "center",
          }}
        >
          Logged in as {user ? user.username : "user"}
        </MenuButton>
        <Menu>
          <MenuItem onClick={onLogoutClicked}>Logout</MenuItem>
        </Menu>
      </Dropdown>
    </>
  );
};

export default NavDrawer;
