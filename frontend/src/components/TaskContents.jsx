import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/joy/Box";
import Dropdown from "./Dropdown";
import Tooltip from "@mui/joy/Tooltip";
import BasicModalDialog from "./BasicModalDialog";
import DeleteTaskModal from "./DeleteTaskModal";
import axios from "axios";
import config from "../data/configure";
import EditTaskModal from "./EditTaskModal";
import Forbidden from "../assets/forbidden.png";

const TaskContents = ({ categoryId }) => {
  const [tasks, setTasks] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState(null); // State to track selected task ID
  const [categoryExists, setCategoryExists] = useState(true);

  const handleStatusClick = (selectedValue, taskId) => {
    // Update the task status locally first
    const updatedTasks = tasks.map((task) =>
      task.task_id === taskId ? { ...task, status: selectedValue } : task
    );
    setTasks(updatedTasks);

    // Send a PUT request to update the task status in the backend
    axios
      .put(`${config.API_URL}task/${taskId}/status`, { status: selectedValue })
      .then((response) => {
        console.log("Task status updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating task status:", error);
        // If there's an error, revert the local state change
        setTasks(tasks);
      });
  };

  const handleDeleteClick = (taskId) => {
    setSelectedTaskId(taskId);
  };

  const handleBoxClick = (task) => {
    console.log("Task box clicked with:", task);
  };

  const formatDate = (dateString) => {
    const options = { month: "short", day: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Function to fetch tasks based on category
  const fetchTasksByCategory = () => {
    axios
      .get(`${config.API_URL}task/category/${categoryId}`)
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  };

  // Initial fetch for tasks based on category
  useEffect(() => {
    fetchTasksByCategory();
  }, [categoryId, tasks]);

  // Function to check category existence at intervals
  const checkCategoryExistence = () => {
    //console.log("category existence: id", categoryExists, categoryId);
    axios
      .get(`${config.API_URL}categories/${categoryId}`)
      .then((response) => {
        //console.log("response", response.data.exists);
        setCategoryExists(response.data.exists);
      })
      .catch((error) => {
        setCategoryExists(response.data.exists);
        console.error("Error checking category existence:", error);
      });
  };

  // Initial check for category existence
  useEffect(() => {
    checkCategoryExistence();
  }, []);

  // Interval to check category existence every second
  useEffect(() => {
    const intervalId = setInterval(checkCategoryExistence, 1000);
    return () => clearInterval(intervalId); // Cleanup function to clear the interval when component unmounts
  }, []);

  // If the category doesn't exist, render a message indicating no tasks available
  if (!categoryExists) {
    return (
      <div
        style={{ textAlign: "center", marginTop: "8%", paddingLeft: "300px" }}
      >
        <h1>
          No tasks available. Category does not exist. <br />
          <br />
          Try refreshing the page.
        </h1>
        <img src={Forbidden} alt="403 Forbidden" />
      </div>
    );
  }

  // Group tasks based on status
  const groupedTasks = groupTasksByStatus(tasks);

  return (
    <div
      style={{
        flex: 1,
        position: "relative",
        paddingLeft: "2%",
        display: "block",
      }}
    >
      {/* Content inline with the NavDrawer */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Content inline with the NavDrawer */}
        <h1
          style={{
            display: "inline-flex",
            cursor: "default",
            marginLeft: tasks.length === 0 ? "10px" : "0",
          }}
        >
          Tasks
        </h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            whiteSpace: "nowrap",
            width: tasks.length === 0 ? "130px" : "auto",
            paddingLeft: tasks.length === 0 ? "482%" : "0",
            // marginLeft: tasks.length === 0 ? "500%" : 0,
          }}
        >
          <Tooltip title="Create task" variant="solid" size="sm">
            <BasicModalDialog category_id={categoryId} />
          </Tooltip>
        </div>
      </div>

      {/* Render tasks under respective headers */}
      {Object.entries(groupedTasks).map(([status, tasks]) => (
        <div key={status}>
          <Typography
            variant="h5"
            sx={{
              paddingLeft: "2%",
              display: "inline-flex",
              paddingRight: "2%",
              paddingTop: "15px",
              fontWeight: "bold",
              marginBottom: "8px",
              color: "#white",
              fontFamily:
                "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
              cursor: "default",
            }}
          >
            {status}
          </Typography>
          {tasks.map((task) => (
            <div key={task.task_id}>
              <Box
                sx={{
                  // backgroundColor: "#1a1a1a",
                  backgroundColor: "#363535",
                  width: "80vw",
                  height: "auto",
                  borderRadius: 10,
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: "20px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    variant="h5"
                    sx={{
                      paddingLeft: "2%",
                      display: "inline-flex",
                      paddingRight: "2%",
                      paddingTop: "15px",
                      fontWeight: "bold",
                      marginBottom: "8px",
                      color: "#white",
                      fontFamily:
                        "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
                      cursor: "pointer",
                    }}
                  >
                    {task.title}
                  </Typography>
                  <div style={{ display: "inline-flex", paddingTop: "10px" }}>
                    <Dropdown
                      onSelectClick={(selectedValue) =>
                        handleStatusClick(selectedValue, task.task_id)
                      }
                      status={task.status}
                    />
                  </div>
                  <Tooltip
                    title="Lihoka na bruhh deadline na oh"
                    variant="solid"
                    size="sm"
                  >
                    <Typography
                      variant="h7"
                      sx={{
                        display: "inline-flex",
                        marginLeft: "auto",
                        paddingRight: "1%",
                        color: "#white",
                        fontFamily:
                          "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
                        fontStyle: "italic",
                        cursor: "default",
                      }}
                    >
                      Deadline: {formatDate(task.due_date)}
                    </Typography>
                  </Tooltip>
                  <Tooltip title="Delete task" variant="solid" size="sm">
                    <DeleteTaskModal taskId={task.task_id} />
                  </Tooltip>
                  <EditTaskModal task={task} />
                </div>
                <Typography
                  variant="h7"
                  sx={{
                    paddingLeft: "5%",
                    display: "block",
                    paddingRight: "2%",
                    paddingTop: "8px",
                    marginBottom: "16px",
                    paddingBottom: "16px",
                    color: "#white",
                    lineHeight: 1.5,
                  }}
                >
                  ‣ {task.description}
                </Typography>
              </Box>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

// Function to group tasks based on status and sort them by the due date in ascending order
const groupTasksByStatus = (tasks) => {
  // Initialize an object to store tasks grouped by status
  const groupedTasks = {};

  // Group tasks by status
  tasks.forEach((task) => {
    const { status } = task;
    if (!groupedTasks[status]) {
      groupedTasks[status] = [];
    }
    groupedTasks[status].push(task);
  });

  // Sort tasks within each status group by the due date in ascending order
  Object.keys(groupedTasks).forEach((status) => {
    groupedTasks[status].sort((a, b) => {
      return new Date(a.due_date) - new Date(b.due_date);
    });
  });

  return groupedTasks;
};

export default TaskContents;
