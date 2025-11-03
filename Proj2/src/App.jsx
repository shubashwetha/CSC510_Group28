import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import OrdersPage from './pages/OrdersPage'
import AdminPage from './pages/AdminPage'
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
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Route>

            <Route path="*" element={<Home />} />
          </Routes>
        </main>
      </div>
    </AuthUIProvider>
  )
}

export default App;
