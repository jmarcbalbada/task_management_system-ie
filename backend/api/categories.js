const express = require("express");
const router = express.Router();

// Fetch the existing db connection from server.js
const db = require("../server").db;

router.get("/", (req, res) => {
  // Fetch categories from the database
  const sql = "SELECT * FROM categories";

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching categories:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    
    console.log("Retrieved categories:", result);
    return res.json(result); // Assuming categories are in JSON format
  });
});

module.exports = router;
