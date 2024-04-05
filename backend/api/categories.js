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

    // console.log("Retrieved categories:", result);
    return res.json(result); // Assuming categories are in JSON format
  });
});

// Add a new category
router.post("/", (req, res) => {
  const { category_name } = req.body;

  // Validate if category_name is provided
  if (!category_name) {
    return res.status(400).json({ error: "Category name is required" });
  }

  // Construct SQL query to insert a new category
  const insertCategoryQuery =
    "INSERT INTO categories (category_name) VALUES (?)";

  // Execute the insert query
  db.query(insertCategoryQuery, [category_name], (err, result) => {
    if (err) {
      console.error("Error adding category:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    console.log("New category added successfully");
    return res.status(201).json({ message: "Category added successfully" });
  });
});

// Update category name endpoint
router.put("/:categoryId", (req, res) => {
  const categoryId = req.params.categoryId;
  const newName = req.body.category_name; // Assuming the new name is provided in the request body under category_name

  // Construct SQL query to update the category name
  const updateCategoryQuery = "UPDATE categories SET category_name = ? WHERE category_id = ?";

  // Execute the update category query
  db.query(updateCategoryQuery, [newName, categoryId], (err, result) => {
    if (err) {
      console.error("Error updating category name:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    console.log(`Category with ID ${categoryId} updated successfully`);
    return res.json({ message: "Category name updated successfully" });
  });
});

router.delete("/:categoryId", (req, res) => {
  const categoryId = req.params.categoryId;
  console.info(categoryId);

  // Construct SQL query to delete tasks associated with the given category ID
  const deleteTasksQuery = "DELETE FROM tasks WHERE category_id = ?";

  // Execute the delete tasks query
  db.query(deleteTasksQuery, [categoryId], (err, taskResult) => {
    if (err) {
      console.error("Error deleting tasks associated with the category:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    // Construct SQL query to delete the category
    const deleteCategoryQuery = "DELETE FROM categories WHERE category_id = ?";

    // Execute the delete category query
    db.query(deleteCategoryQuery, [categoryId], (err, categoryResult) => {
      if (err) {
        console.error("Error deleting category:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      console.log(`Category with ID ${categoryId} deleted successfully`);
      return res.json({
        message: "Category and associated tasks deleted successfully",
      });
    });
  });
});

module.exports = router;
