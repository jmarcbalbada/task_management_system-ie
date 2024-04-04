const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const taskRoute = require("./api/task");
app.use("/task", taskRoute);

app.get("/", (re, res) => {
  return res.json("backend");
});


app.listen(3000, () => {
    console.log("listen");
})