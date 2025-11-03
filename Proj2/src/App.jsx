import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import NearbyOrdersPage from './pages/NearbyOrdersPage'
import PoolingPage from './pages/PoolingPage'
import './App.css'

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nearby-orders" element={<NearbyOrdersPage />} />
          <Route path="/pooling" element={<PoolingPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
