import React, { useState, forwardRef, useEffect } from "react";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Stack from "@mui/joy/Stack";
import Add from "@mui/icons-material/Add";
import BasicDateCalendar from "./BasicDateCalendar";
import Typography from "@mui/material/Typography";
import axios from "axios";
import config from "../data/configure";
import "../styles/modals.css";

const BasicModalDialog = forwardRef(({ category_id }, ref) => {
  const [open, setOpen] = useState(false);
  const [deadline, setDeadline] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    due_date: null,
  });

  useEffect(() => {
    // Expose methods via ref
    if (ref) {
      ref.current = {
        openModal: () => setOpen(true),
        closeModal: () => setOpen(false),
      };
    }
  }, [ref]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (deadline && new Date(deadline) > new Date()) {
      // Convert formatted date string to datetime format
      const formattedDateTime = new Date(formData.due_date);
      formattedDateTime.setDate(formattedDateTime.getDate() + 1); // Add 1 day to the date
      // Handle form submission with valid deadline
      axios
        .post(`${config.API_URL}task`, {
          ...formData,
          due_date: formattedDateTime.toISOString().split("T")[0],
          category_id,
        })
        .then((response) => {
          console.log("Task created successfully:", response.data);
          setOpen(false);
          setFormData({ title: "", description: "", due_date: null });
        })
        .catch((error) => {
          console.error("Error creating task:", error);
        });
    } else {
      // Show warning message if deadline is not set or is in the past
      setShowWarning(true);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500); // Reset shaking after 500ms
    }
  };

  const handleDeadlineChange = (newValue) => {
    const actualDate = newValue.$d;
    const formattedDate = actualDate.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
    console.log(formattedDate);
    setDeadline(newValue);
    setShowWarning(false);
    setFormData((prevFormData) => ({
      ...prevFormData,
      due_date: formattedDate,
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <>
      <Button
        variant="soft"
        startDecorator={<Add />}
        onClick={() => setOpen(true)}
        sx={{
          color: "#FFFFFF",
          backgroundColor: "#006400",
          "&:hover": {
            backgroundColor: "#006400",
          },
        }}
      >
        New task
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog className={isShaking ? "shake" : ""}>
          <DialogTitle>Create new task</DialogTitle>
          <DialogContent>Fill in the information of the task.</DialogContent>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  autoFocus
                  required
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input
                  required
                  name="description"
                  value={formData.description}
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
              {showWarning && (
                <Typography variant="body2" color="error">
                  Due date cannot be in the past.
                </Typography>
              )}
              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </>
  );
});

export default BasicModalDialog;
