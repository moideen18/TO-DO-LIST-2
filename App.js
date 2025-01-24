import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./component/Register";
import Tasks from "./component/Tasks";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />

        
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </Router>
  );
}

export default App;
