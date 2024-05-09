const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
// const { Connection } = require("@google-cloud/sql");

// Create a new connection to Google Cloud SQL
// const db = new Connection({
//   connectionName: "peppy-appliance-418100:asia-east1:taskmanagement",
//   credentials: {
//     client_email: "370147750627-compute@developer.gserviceaccount.com",
//     private_key: "897f01284bf451b7c9b339d2bfdd866af14cdd92",
//   },
// });

// // Connect to the database
// db.connect((err) => {
//   if (err) {
//     console.error("Error connecting to Google Cloud SQL:", err);
//     return;
//   }
//   console.log("Connected to Google Cloud SQL");
// });

// local
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "task_management",
// });

//deployed
// const db = mysql.createConnection({
//   host: "bp64edmhqzhq1vg1azkm-mysql.services.clever-cloud.com",
//   user: "uoq6wneh0wsjqncc",
//   password: "kaCx80NYngwtq0leRz5h",
//   database: "bp64edmhqzhq1vg1azkm",
// });

// //google
const db = mysql.createConnection({
  // socketPath: "/cloudsql/peppy-appliance-418100:asia-east1:taskmanagement",
  host: "35.236.169.7",
  user: "root",
  password: "",
  database: "task_management",
  socketPath: "/cloudsql/peppy-appliance-418100:asia-east1:taskmanagement",
  port: 3306,
});

// // Start the database connection
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
