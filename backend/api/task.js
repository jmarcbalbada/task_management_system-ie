const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log("i am from task");
  return res.json("hello i am task");
});

module.exports = router;
