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
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import IconButton from "@mui/joy/IconButton";
import Stack from "@mui/joy/Stack";
import axios from "axios";
import config from "../data/configure";

// Use React.forwardRef to forward the ref to the underlying DOM element
const EditTaskModal = React.forwardRef(({ task }, ref) => {
  const [open, setOpen] = React.useState(false);
  const [deadline, setDeadline] = React.useState(null);
  const [showWarning, setShowWarning] = React.useState(false);
  const [editedTask, setEditedTask] = React.useState({
    title: task.title,
    description: task.description,
    due_date: new Date(task.due_date + 1),
  });

  const handleEdit = (event) => {
    event.preventDefault();
    if (deadline && new Date(deadline) > new Date()) {
      const formattedDateTime = new Date(deadline);
      formattedDateTime.setDate(formattedDateTime.getDate() + 1);
      axios
        .put(`${config.API_URL}task/${task.task_id}`, {
          ...editedTask,
          due_date: formattedDateTime.toISOString().split("T")[0], // Convert to ISO string and extract date part
        })
        .then((response) => {
          console.log("Task updated successfully:", response.data);
          setOpen(false);
        })
        .catch((error) => {
          console.error("Error updating task:", error);
        });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleDeadlineChange = (newValue) => {
    const actualDate = newValue.$d;
    const formattedDate = actualDate.toLocaleDateString("en-PH", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
    console.log(formattedDate);
    setDeadline(newValue);
    setShowWarning(false);
    setEditedTask((prevFormData) => ({
      ...prevFormData,
      due_date: formattedDate,
    }));
  };

  return (
    <React.Fragment>
      <IconButton
        onClick={() => setOpen(true)}
        color="primary"
        variant="plain"
        sx={{
          marginRight: "1%",
        }}
        ref={ref} // Forward the ref
      >
        <EditOutlinedIcon />
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
            <form onSubmit={handleEdit}>
              <Stack spacing={2}>
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
                    value={deadline}
                    onChange={handleDeadlineChange}
                  />
                </FormControl>
              </Stack>
              <Button type="submit" variant="solid" color="primary">
                Edit task
              </Button>
              <Button
                variant="plain"
                color="neutral"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </form>
          </DialogContent>
          <DialogActions></DialogActions>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
});

export default EditTaskModal;
