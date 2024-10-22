import React, { useState, useEffect } from "react";

const server_url = "urdevurl";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  // Fetch existing tasks from the backend when the component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(
        `${server_url}/tasks`, // ADD URDEVURL HERE
      );
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (task.trim() === "") return;

    try {
      const res = await fetch(
        `${server_url}/tasks`, // ADD URDEVURL HERE
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ task }),
        },
      );
      const data = await res.json();
      console.log("A task has been added", data);
      setTasks(data.tasks);
      setTask(""); // Clear the input after adding the task
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>To-Do List</h1>
      <form onSubmit={addTask}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task"
        />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map((t, index) => (
          <li key={index}>{t}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
