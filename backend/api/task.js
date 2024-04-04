const express = require("express");
const router = express.Router();
const { db } = require("../server");

router.get("/", (req, res) => {
  return res.json("Hello, I am task");
});

// Endpoint to get tasks by category_id
router.get("/category/:category_id", (req, res) => {
  const categoryId = req.params.category_id;
  const sql = "SELECT * FROM tasks WHERE category_id = ?";
  db.query(sql, [categoryId], (err, results) => {
    if (err) {
      console.error("Error fetching tasks:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    return res.json(results);
  });
});

// Endpoint to create a new task
router.post("/", (req, res) => {
  const { title, description, due_date, category_id } = req.body;
  const sql = "INSERT INTO tasks (title, description, due_date, category_id) VALUES (?, ?, ?, ?)";
  db.query(sql, [title, description, due_date, category_id], (err, results) => {
    if (err) {
      console.error("Error creating task:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    return res.status(201).json({ message: "Task created successfully", task_id: results.insertId });
  });
});

// Endpoint to update the status of a task by task_id
router.put("/:task_id/status", (req, res) => {
  const taskId = req.params.task_id;
  const { status } = req.body;
  const sql = "UPDATE tasks SET status=? WHERE task_id=?";
  db.query(sql, [status, taskId], (err, result) => {
    if (err) {
      console.error("Error updating task status:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    return res.json({ message: "Task status updated successfully" });
  });
});

// Endpoint to delete task by task_id
router.delete("/:task_id", (req, res) => {
  const taskId = req.params.task_id;
  const sql = "DELETE FROM tasks WHERE task_id = ?";
  db.query(sql, [taskId], (err, result) => {
    if (err) {
      console.error("Error deleting task:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    return res.json({ message: "Task deleted successfully" });
  });
});


module.exports = router;
