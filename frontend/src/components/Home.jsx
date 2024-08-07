import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Welcome to Home</h2>
        <p className="text-center mb-4">You have successfully logged in!</p>
        <div className="grid justify-center gap-5" >
        <Link
          to="/jadwal"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 inline-block text-center"
          >
          View Jadwal
        </Link>
        <Link
          to="/dosen"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 inline-block text-center"
          >
          View Dosen
        </Link>
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300"
          >
          Logout
        </button>
            </div>
      </div>
    </div>
  );
};

export default Home;
