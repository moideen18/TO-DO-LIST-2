import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css';
import Task from "./component/Tasks"

const App = () => {
  return (
    <Router>
      <div>
        {/* Navigation Bar */}
        <nav className="navbar">
          <ul className="nav-list">
            <li>
              <Link to="/task" className="nav-link">Task</Link>
            </li>
          </ul>
        </nav>

        {/* Routes for different pages */}
        <Routes>
          <Route path="/task" element={<Task />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
