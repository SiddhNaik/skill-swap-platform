import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow mb-6">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-indigo-600">SkillSwap</Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-indigo-600">Home</Link>
          <Link to="/create_swap" className="hover:text-indigo-600">Create Swap</Link>
          <Link to="/my_requests" className="hover:text-indigo-600">My Requests</Link>
          <Link to="/edit_profile" className="hover:text-indigo-600">Profile</Link>
          <Link to="/login" className="hover:text-indigo-600">Login</Link>
          <Link to="/register" className="hover:text-indigo-600">Register</Link>
        </div>
      </div>
    </nav>
  );
}
