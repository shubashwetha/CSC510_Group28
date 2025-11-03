import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import NearbyOrdersPage from "./pages/NearbyOrdersPage";
import RequireAuth from "./auth/RequireAuth";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Routes>
          {/* Public landing page */}
          <Route path="/" element={<Home />} />

          {/* Everything inside this block requires login */}
          <Route element={<RequireAuth />}>
            <Route path="/nearby-orders" element={<NearbyOrdersPage />} />
            
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
