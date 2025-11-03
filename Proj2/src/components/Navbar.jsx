import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation()

  return (
    <nav className="navbar">
      <h1>🏘️ NeighborhoodPool</h1>
      <div>
        <Link 
          to="/" 
          className={location.pathname === '/' ? 'active' : ''}
        >
          Home
        </Link>
        <Link 
          to="/nearby-orders" 
          className={location.pathname === '/nearby-orders' ? 'active' : ''}
        >
          Nearby Orders
        </Link>
        <Link 
          to="/pooling" 
          className={location.pathname === '/pooling' ? 'active' : ''}
        >
          Pooling
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
