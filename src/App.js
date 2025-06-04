import { Route, Routes } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ShopDetail from "./components/ShopDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookmarkedShops from "./components/BookmarkedShops";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-white to-green-50">
      <Navbar />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shops/:id" element={<ShopDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/bookmarks" element={<BookmarkedShops />} />
        </Routes>
      <Footer />
    </div>
  );
}

export default App;
