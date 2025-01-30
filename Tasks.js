import React, { useState } from "react";
import "./Tasks.css";
import backgroundImage from './hello.jpg';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [showCompleted, setShowCompleted] = useState(false);
  const [history, setHistory] = useState([]); // Tracks task history for undo

  // Save the current state to history
  const saveToHistory = () => {
    setHistory([...history, [...tasks]]);
  };

  // Undo the last change
  const undoLastChange = () => {
    if (history.length === 0) return;
    const previousState = history[history.length - 1];
    setTasks(previousState);
    setHistory(history.slice(0, -1));
  };

  // Add a new task (latest task appears at the top)
  const addTask = () => {
    if (task.trim() === "") {
      alert("Please enter a task.");
      return;
    }
    saveToHistory();
    setTasks([{ text: task, completed: false }, ...tasks]); // Insert at the beginning
    setTask("");
  };

  // Toggle task completion
  const toggleCompletion = (index) => {
    saveToHistory();
    const updatedTasks = tasks.map((t, i) =>
      i === index ? { ...t, completed: !t.completed } : t
    );
    setTasks(updatedTasks);
  };

  // Delete a task
  const deleteTask = (index) => {
    saveToHistory();
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  // Start editing a task
  const startEditing = (index) => {
    setEditingIndex(index);
    setEditingText(tasks[index].text);
  };

  // Save the edited task
  const saveTask = (index) => {
    if (editingText.trim() === "") {
      alert("Task cannot be empty.");
      return;
    }
    saveToHistory();
    const updatedTasks = tasks.map((t, i) =>
      i === index ? { ...t, text: editingText } : t
    );
    setTasks(updatedTasks);
    setEditingIndex(null);
    setEditingText("");
  };

  // Mark all tasks as completed
  const markAllCompleted = () => {
    saveToHistory();
    const updatedTasks = tasks.map((t) => ({ ...t, completed: true }));
    setTasks(updatedTasks);
  };

  // Delete all tasks
  const deleteAllTasks = () => {
    saveToHistory();
    setTasks([]);
  };

  // Toggle showing completed tasks
  const toggleShowCompleted = () => {
    setShowCompleted(!showCompleted);
  };

  // Filter tasks based on the completed toggle
  const displayedTasks = showCompleted
    ? tasks.filter((task) => task.completed)
    : tasks;

  return (
    <div className="app" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <h1>To-Do List</h1>
      <div className="input-container">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={addTask}>Add</button>
        <button onClick={markAllCompleted} disabled={tasks.length === 0}>
          Mark All as Completed
        </button>
        <button onClick={deleteAllTasks} disabled={tasks.length === 0}>
          Delete All Tasks
        </button>
        <button onClick={undoLastChange} disabled={history.length === 0}>
          Undo
        </button>
        <button onClick={toggleShowCompleted} disabled={tasks.length === 0}>
          {showCompleted ? "Show All" : "Show Completed"}
        </button>
      </div>
      <ul className="task-list">
        {displayedTasks.map((t, index) => (
          <li key={index} className={t.completed ? "completed" : ""}>
            {editingIndex === index ? (
              <div className="edit-container">
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <button onClick={() => saveTask(index)}>Save</button>
              </div>
            ) : (
              <div className="task-item">
                <span onClick={() => toggleCompletion(index)}>{t.text}</span>
                <div className="task-actions">
                  <button onClick={() => startEditing(index)}>Edit</button>
                  <button onClick={() => toggleCompletion(index)}>
                    {t.completed ? "Completed" : "Complete"}
                  </button>
                  <button onClick={() => deleteTask(index)}>✖</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;
