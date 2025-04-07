// src/components/Navbar.jsx

import React from "react";

function Navbar({ setUser }) {
  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between">
      <h1 className="font-bold text-xl">Amar Dokan</h1>
      <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
    </div>
  );
}

export default Navbar; // ✅ This line must be present
