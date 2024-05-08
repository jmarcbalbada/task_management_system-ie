const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "task_management",
});

// Start the database connection
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// Export the db connection so it can be imported in other modules
module.exports.db = db;

// Import and use the task and categories routes
const taskRoute = require("./api/task");
const categoriesRoute = require("./api/categories");
const userRoute = require("./api/user");
app.use("/task", taskRoute);
app.use("/categories", categoriesRoute);
app.use("/user", userRoute);

app.get("/", (req, res) => {
  return res.json("Backend is up and running");
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Export the app itself
module.exports = app;
