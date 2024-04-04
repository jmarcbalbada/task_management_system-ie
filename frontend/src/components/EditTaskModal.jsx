import * as React from "react";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import BasicDateCalendar from "./BasicDateCalendar";
import Typography from "@mui/material/Typography";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"; // Import EditOutlinedIcon
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import IconButton from "@mui/joy/IconButton";
import Stack from "@mui/joy/Stack";
import axios from "axios";
import config from "../data/configure";

// Use React.forwardRef to forward the ref to the underlying DOM element
const EditTaskModal = React.forwardRef(({ task_id }, ref) => {
  const [open, setOpen] = React.useState(false);
  //   const [editedTask, setEditedTask] = React.useState({
  //     title: task.title,
  //     description: task.description,
  //     due_date: new Date(task.due_date),
  //   });

  React.useEffect(() => {
    console.log("task id = ", task_id);
  }, []);

  //   const handleEdit = () => {
  //     // Add logic to handle editing task
  //     // This function will be called when the "Edit task" button is clicked
  //     console.log("Edited Task:", editedTask);

  //     // Add axios request to update task details
  //     axios
  //       .put(`${config.API_URL}task/${task.task_id}`, editedTask)
  //       .then((response) => {
  //         console.log("Task updated successfully:", response.data);
  //         setOpen(false);
  //       })
  //       .catch((error) => {
  //         console.error("Error updating task:", error);
  //       });
  //   };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  return (
    <React.Fragment>
      <IconButton
        onClick={() => setOpen(true)}
        color="primary" // Change color to primary for edit action
        variant="plain"
        sx={{
          marginRight: "1%",
        }}
        ref={ref} // Forward the ref
      >
        <EditOutlinedIcon /> {/* Use EditOutlinedIcon */}
      </IconButton>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            <WarningRoundedIcon />
            Edit Task
          </DialogTitle>
          <Divider />
          <DialogContent>
            {/* Forms for editing task details */}
            <form>
              {/* <Stack spacing={2}>
                <FormControl>
                  <FormLabel>Title</FormLabel>
                  <Input
                    autoFocus
                    required
                    name="title"
                    value={editedTask.title}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Input
                    required
                    name="description"
                    value={editedTask.description}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Due Date</FormLabel>
                  <BasicDateCalendar
                    value={editedTask.due_date}
                    onChange={(newValue) =>
                      setEditedTask((prevTask) => ({
                        ...prevTask,
                        due_date: newValue,
                      }))
                    }
                  />
                </FormControl>
                {showWarning && (
                  <Typography variant="body2" color="error">
                    Due date cannot be in the past.
                  </Typography>
                )}
              </Stack> */}
            </form>
          </DialogContent>
          <DialogActions>
            <Button variant="solid" color="primary">
              Edit task
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

export default EditTaskModal;
