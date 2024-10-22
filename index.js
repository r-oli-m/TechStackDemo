const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const port = process.env.PORT || 3001; // Use Replit's port

// Middleware to handle CORS and JSON bodies
app.use(cors()); // Enable CORS for frontend requests
app.use(express.json()); // Parse JSON bodies

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, "frontend/build")));

// API route to handle adding tasks
let tasks = [];
app.post("/add-task", (req, res) => {
  const { task } = req.body;
  console.log("Received task:", task); // Log to ensure the request is received
  tasks.push(task); // Add task to the in-memory array
  res.json({ tasks }); // Return updated tasks array
});

// API route to fetch all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks); // Return the tasks array
});

// Catch-all route to serve the frontend React app for any unhandled route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/build", "index.html"));
});

// Start the server and log the Replit public URL
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port} or Replit URL`);
});
