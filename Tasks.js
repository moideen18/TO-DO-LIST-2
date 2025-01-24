import React, { useState } from "react";
import "./Tasks.css";
import backgroundImage from "./pic.avif";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [showCompleted, setShowCompleted] = useState(false);
  const [history, setHistory] = useState([]);

  const saveToHistory = () => setHistory([...history, [...tasks]]);

  const undoLastChange = () => {
    if (history.length === 0) return;
    const previousState = history.pop();
    setTasks(previousState);
    setHistory(history);
  };

  const addTask = () => {
    if (task.trim() === "") {
      alert("Please enter a task.");
      return;
    }
    saveToHistory();
    setTasks([...tasks, { text: task, completed: false }]);
    setTask("");
  };

  const toggleCompletion = (index) => {
    saveToHistory();
    const updatedTasks = tasks.map((t, i) =>
      i === index ? { ...t, completed: !t.completed } : t
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    saveToHistory();
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditingText(tasks[index].text);
  };

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

  const markAllCompleted = () => {
    saveToHistory();
    const updatedTasks = tasks.map((t) => ({ ...t, completed: true }));
    setTasks(updatedTasks);
  };

  const deleteAllTasks = () => {
    saveToHistory();
    setTasks([]);
  };

  const toggleShowCompleted = () => {
    setShowCompleted(!showCompleted);
  };

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
