import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <h1>Welcome to NeighborhoodPool</h1>
      <p>Location-based order management system</p>
      
      <div style={{ marginTop: '3rem', textAlign: 'center' }}>
        <Link 
          to="/nearby-orders" 
          style={{
            background: '#3498db',
            color: 'white',
            padding: '1rem 2rem',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '1.2rem',
            display: 'inline-block'
          }}
        >
          View Nearby Orders →
        </Link>
      </div>
    </div>
  )
}

export default Home
