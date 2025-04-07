import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AddProduct from "./components/AddProduct";
import SellProduct from "./components/SellProduct";
import ViewProducts from "./components/ViewProducts";
import Navbar from "./components/Navbar"; // no curly braces


function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      {user && <Navbar setUser={setUser} />}
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/sell-product" element={<SellProduct />} />
        <Route path="/view-products" element={<ViewProducts />} />
      </Routes>
    </Router>
  );
}

export default App;
