import * as React from "react";
import IconButton from "@mui/joy/IconButton";
import Menu from "@mui/joy/Menu";
import Button from "@mui/joy/Button";
import MenuItem from "@mui/joy/MenuItem";
import Input from "@mui/joy/Input";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListDivider from "@mui/joy/ListDivider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import MoreVert from "@mui/icons-material/MoreVert";
import Edit from "@mui/icons-material/Edit";
import Stack from "@mui/joy/Stack";
import DeleteForever from "@mui/icons-material/DeleteForever";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import MenuButton from "@mui/joy/MenuButton";
import Dropdown from "@mui/joy/Dropdown";
import axios from "axios";
import config from "../data/configure";
import Tooltip from "@mui/joy/Tooltip";

export default function PositionedMenu(props) {
  const [open, setOpen] = React.useState(false);
  const [editCategoryOpen, setEditCategoryOpen] = React.useState(false);
  const [editedName, setEditedName] = React.useState(
    props.category.category_name
  );

  const handleEdit = () => {
    // Initialize body params
    const requestBody = {
      category_name: editedName
    };
  
    // Send PUT request to update the category name
    axios
      .put(`${config.API_URL}categories/${props.category.category_id}`, requestBody)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error updating category name:", error);
      });
  
    // Close the edit modal
    setEditCategoryOpen(false);
  };
  

  const handleDelete = () => {
    console.log("Delete");
    axios
      .delete(`${config.API_URL}categories/${props.category.category_id}`) // Use the URL from config
      .then((response) => {
        console.log(response.data);
        // Handle success, maybe show a success message or update UI accordingly
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
        // Handle error, maybe show an error message to the user
      });
  };

  const handleClose = () => {
    setEditCategoryOpen(false);
  };

  return (
    <Dropdown>
      <Tooltip title="More" variant="solid" size="sm">
        <MenuButton
          slots={{ root: MoreHorizOutlinedIcon }}
          slotProps={{ root: { variant: "outlined", color: "neutral" } }}
          sx={{ cursor: "pointer" }}
        >
          <MoreVert />
        </MenuButton>
      </Tooltip>
      <Menu placement="bottom-end">
        <MenuItem onClick={() => setEditCategoryOpen(true)}>
          <ListItemDecorator>
            <Edit />
          </ListItemDecorator>{" "}
          Edit category
        </MenuItem>
        <ListDivider />
        <MenuItem onClick={handleDelete} variant="soft" color="danger">
          <ListItemDecorator sx={{ color: "inherit" }}>
            <DeleteForever />
          </ListItemDecorator>{" "}
          Delete
        </MenuItem>
      </Menu>
      <Modal open={editCategoryOpen} onClose={handleClose}>
        <ModalDialog>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogContent>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                handleEdit();
              }}
            >
              <Stack spacing={2}>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    autoFocus
                    required
                    value={editedName}
                    onChange={(event) => setEditedName(event.target.value)}
                  />
                </FormControl>
                <Button type="submit">Submit</Button>
              </Stack>
            </form>
          </DialogContent>
        </ModalDialog>
      </Modal>
    </Dropdown>
  );
}
