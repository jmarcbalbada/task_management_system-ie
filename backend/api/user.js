const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Assuming you have a database connection in db.js
const db = require("../server").db;

router.get("/", (req, res) => {
  // Fetch user from the database
  const sql = "SELECT * FROM user";

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching user:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    // console.log("Retrieved categories:", result);
    return res.json(result); // Assuming categories are in JSON format
  });
});

// Endpoint to get all attributes of a specific user by username
router.post("/getByUsername", (req, res) => {
  const { username } = req.body;

  // Fetch user from the database based on username
  const sql = "SELECT user_id FROM user WHERE username = ?";

  db.query(sql, [username], (err, result) => {
    if (err) {
      console.error("Error fetching user:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = result[0];
    return res.json(user);
  });
});

// // User registration route
// router.post("/register", async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     // // Check if username already exists
//     // const existingUser = await db.query(
//     //   "SELECT * FROM user WHERE username = ?",
//     //   [username]
//     // );
//     // if (existingUser.length > 0) {
//     //   return res.status(400).json({ error: "Username already exists" });
//     // }
//     const sql = "SELECT * FROM user WHERE username = ?";

//     db.query(sql, [username], (err, result) => {
//       if (err) {
//         console.error("Error fetching user:", err);
//         return res.status(500).json({ error: "Internal server error" });
//       }
  
//       if (result.length > 0) {
//         return res.status(401).json({ error: "Username is already taken" });
//       }
  
//       // const user = result[0];
//       // return res.json(user);
//     });

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Insert the new user into the database
//     await db.query("INSERT INTO user (username, password) VALUES (?, ?)", [
//       username,
//       hashedPassword,
//     ]);

//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     console.error("Error registering user:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// User registration route
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if username already exists
    const sql = "SELECT * FROM user WHERE username = ?";
    db.query(sql, [username], async (err, result) => {
      if (err) {
        console.error("Error fetching user:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (result.length > 0) {
        return res.status(400).json({ error: "Username already exists" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert the new user into the database
      await db.query("INSERT INTO user (username, password) VALUES (?, ?)", [
        username,
        hashedPassword,
      ]);

      res.status(201).json({ message: "User registered successfully" });
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// User login route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username exists
    const sql = "SELECT * FROM user WHERE username = ?";
    db.query(sql, [username], async (err, result) => {
      if (err) {
        console.error("Error logging in:", err);
        return res
          .status(500)
          .json({ success: false, error: "Internal server error" });
      }

      if (!result || result.length === 0) {
        return res
          .status(401)
          .json({ success: false, error: "Invalid username or password" });
      }

      // Accessing the properties of the first user in the array
      const userData = result[0];

      // Compare the password
      const passwordMatch = await bcrypt.compare(password, userData.password);
      if (!passwordMatch) {
        return res
          .status(401)
          .json({ success: false, error: "Invalid username or password" });
      }

      // If username and password match, return success
      res.json({ success: true });
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

module.exports = router;
