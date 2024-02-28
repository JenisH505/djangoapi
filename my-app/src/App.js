import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css'
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import HomePage from "./pages/Home";
import Profile from "./pages/Profile";
import Index from "./pages/Index";
import About from "./pages/About";

function App() {


  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentForm, setCurrentForm] = useState('login');

  const handleLogin = () => {
    setIsLoggedIn(true);
  }

  const RedirectToHome = () => {
    return <Navigate to="/" />;
  };
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }
  return (

    <> <Router>
        <div className="App">
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/" element={<Index></Index>} />
            <Route path="/login" element={currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Navigate to="/signup" />} />
            <Route path="/signup" element={currentForm === "signup" ? <Navigate to="/login" /> : <Signup onFormSwitch={toggleForm} />} />
            {isLoggedIn ? <Route path="*" element={<RedirectToHome />} /> : null}
            <Route path="/profile" element={<Profile />} /> {/* Include the Profile route */}
          </Routes>
        </div>
      </Router></>
  );
}

export default App;