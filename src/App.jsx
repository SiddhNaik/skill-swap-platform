import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SwapCreate from './pages/SwapCreate';
import MyRequests from './pages/MyRequests';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create_swap" element={<SwapCreate />} />
        <Route path="/my_requests" element={<MyRequests />} />
      </Routes>
    </>
  );
};

export default App; 