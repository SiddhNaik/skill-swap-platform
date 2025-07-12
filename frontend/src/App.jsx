// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import CreateSwap from "./pages/CreateSwap";
import MyRequests from "./pages/MyRequests";
import EditProfile from "./pages/EditProfile";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="p-4 max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create_swap" element={<CreateSwap />} />
            <Route path="/my_requests" element={<MyRequests />} />
            <Route path="/edit_profile" element={<EditProfile />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App; 