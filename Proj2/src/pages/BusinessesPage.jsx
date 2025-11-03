import React, { useState, useEffect } from 'react'
import { useCart } from '../contexts/CartContext'
import { businessService } from '../services/businesses/businessService'
import './BusinessesPage.css'

export default function BusinessesPage() {
  const [businesses, setBusinesses] = useState([])
  const [selectedBusiness, setSelectedBusiness] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { addToCart } = useCart()

  useEffect(() => {
    loadBusinesses()
  }, [])

  const loadBusinesses = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await businessService.getAllBusinesses()
      setBusinesses(data)
    } catch (err) {
      setError(err.message)
      console.error('Error loading businesses:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = (menuItem) => {
    addToCart(selectedBusiness.id, selectedBusiness.name, menuItem, 1)
    alert(`Added ${menuItem.name} to cart!`)
  }

  if (loading) {
    return (
      <div className="businesses-page">
        <div className="loading">Loading businesses...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="businesses-page">
        <div className="error">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="businesses-page">
      <h1>Browse Businesses</h1>
      
      {!selectedBusiness ? (
        <div className="businesses-grid">
          {businesses.map(business => (
            <div 
              key={business.id} 
              className="business-card"
              onClick={() => setSelectedBusiness(business)}
            >
              <div className="business-icon">{business.image}</div>
              <h2>{business.name}</h2>
              <p className="business-type">{business.type.charAt(0).toUpperCase() + business.type.slice(1)} • {business.category}</p>
              <p className="business-description">{business.description}</p>
              <button className="view-menu-btn">View Menu →</button>
            </div>
          ))}
        </div>
      ) : (
        <div className="menu-view">
          <button className="back-btn" onClick={() => setSelectedBusiness(null)}>
            ← Back to Businesses
          </button>
          
          <div className="business-header">
            <div className="business-icon-large">{selectedBusiness.image}</div>
            <div>
              <h2>{selectedBusiness.name}</h2>
              <p className="business-type">{selectedBusiness.type.charAt(0).toUpperCase() + selectedBusiness.type.slice(1)} • {selectedBusiness.category}</p>
              <p className="business-description">{selectedBusiness.description}</p>
            </div>
          </div>

          <div className="menu-section">
            <h3>Menu</h3>
            <div className="menu-grid">
              {selectedBusiness.menu.map(item => (
                <div key={item.id} className="menu-item-card">
                  <div className="menu-item-info">
                    <h4>{item.name}</h4>
                    <p className="menu-item-description">{item.description}</p>
                    <p className="menu-item-category">{item.category}</p>
                    <p className="menu-item-price">${item.price.toFixed(2)}</p>
                  </div>
                  <button 
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(item)}
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

