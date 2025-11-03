import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import NearbyOrdersPage from './pages/NearbyOrdersPage'
import PoolingPage from './pages/PoolingPage'
import RequireAuth from './auth/RequireAuth'
import GlobalAuthGate from './auth/GlobalAuthGate'
import { AuthUIProvider } from './auth/AuthUIContext'
import './App.css'

function App() {
  return (
    <AuthUIProvider>
      {/* Intercept any click when user is not authed */}
      <GlobalAuthGate />

      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />

            {/* Protected routes */}
            <Route element={<RequireAuth />}>
              <Route path="/nearby-orders" element={<NearbyOrdersPage />} />
              <Route path="/pooling" element={<PoolingPage />} />
              {/* add more protected routes here */}
            </Route>

            <Route path="*" element={<Home />} />
          </Routes>
        </main>
      </div>
    </AuthUIProvider>
  )
}

export default App;
