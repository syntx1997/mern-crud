import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import Index from "./components/Index";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";

const App = () => {
  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-9 pt-20 pb-20">
        <Router>
          <Routes>
            <Route exact path="/" element={<Index />} />
            <Route path="/add-user" element={<AddUser />} />
            <Route path="/edit-user/:id" element={<EditUser />} />
          </Routes>
        </Router>
      </div>
    </>
  );
};

export default App;
