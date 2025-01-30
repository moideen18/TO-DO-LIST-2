import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./component/Register"; // Ensure correct path
import Login from "./component/Login";
import Tasks from "./component/Tasks";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </Router>
  );
};

export default App;
