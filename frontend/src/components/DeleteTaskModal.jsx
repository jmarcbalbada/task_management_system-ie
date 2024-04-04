import * as React from "react";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined"; // Import DeleteOutlineOutlinedIcon
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import IconButton from "@mui/joy/IconButton";
import axios from "axios";
import config from "../data/configure";

// Use React.forwardRef to forward the ref to the underlying DOM element
const DeleteTaskModal = React.forwardRef(({ taskId }, ref) => {
  const [open, setOpen] = React.useState(false);

  const handleDelete = () => {
    // Send a DELETE request to delete the task
    axios
      .delete(`${config.API_URL}task/${taskId}`)
      .then((response) => {
        console.log("Task deleted successfully:", response.data);
        setOpen(false);
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };

  return (
    <React.Fragment>
      <IconButton
        onClick={() => setOpen(true)}
        color="danger"
        variant="plain"
        sx={{
          marginRight: "1%",
        }}
        ref={ref} // Forward the ref
      >
        <DeleteOutlineOutlinedIcon /> {/* Use DeleteOutlineOutlinedIcon */}
      </IconButton>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            <WarningRoundedIcon />
            Confirmation
          </DialogTitle>
          <Divider />
          <DialogContent>
            Are you sure you want to delete this task?
          </DialogContent>
          <DialogActions>
            <Button variant="solid" color="danger" onClick={handleDelete}>
              Delete task
            </Button>
            <Button
              variant="plain"
              color="neutral"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
});

export default DeleteTaskModal;
