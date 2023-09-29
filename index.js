const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;

// Middleware for serving static files
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set view engine to EjS
app.set("view engine", "ejs");

// Routes
app.get("/", (req, res) => {
  res.render("index", { tasks });
});

const tasks = [];
app.post("/create-task", (req, res) => {
  const { taskName } = req.body;
  tasks.push(taskName);
  res.redirect("/");
});

// Reset Tasks Array
app.post("/reset-tasks", (req, res) => {
  tasks.length = 0;
  res.redirect("/");
});

// Delete Individual Task
app.post("/delete-task", (req, res) => {
  const { taskIndex } = req.body;
  if (taskIndex !== undefined && taskIndex >= 0 && taskIndex < tasks.length) {
    tasks.splice(taskIndex, 1); // Remove the task at the specified index
  }
  res.redirect("/");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
