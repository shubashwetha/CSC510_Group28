import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import L from 'leaflet'
import { batchService } from '../services/batches/batchService'
import { driverService } from '../services/drivers/driverService'
import { orderService } from '../services/orders/orderService'
import './AdminPage.css'

// Fix for default marker icons in React Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-shadow.png',
})

export default function AdminPage() {
  const [batches, setBatches] = useState([])
  const [drivers, setDrivers] = useState([])
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedBatch, setSelectedBatch] = useState(null)
  const [isAssigning, setIsAssigning] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const [batchesData, driversData, ordersData] = await Promise.all([
        batchService.getAllBatches(),
        driverService.getAllDrivers(),
        orderService.getAllOrders()
      ])
      
      setBatches(batchesData)
      setDrivers(driversData)
      setOrders(ordersData)
    } catch (err) {
      setError(err.message)
      console.error('Error loading data:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleAutoAssign = async () => {
    try {
      setIsAssigning(true)
      setError(null)
      
      const newBatches = await batchService.assignOrdersToDrivers({
        maxOrdersPerBatch: 10,
        maxDistanceKm: 20
      })
      
      await loadData() // Refresh data
      
      if (newBatches.length > 0) {
        alert(`Successfully assigned ${newBatches.length} batch(es) to drivers!`)
      } else {
        alert('No batches were created. All orders may already be assigned or no drivers available.')
      }
    } catch (err) {
      setError(err.message)
      alert(`Error: ${err.message}`)
    } finally {
      setIsAssigning(false)
    }
  }

  const getStatusColor = (status) => {
    const colors = {
      pending: '#FFA500',
      assigned: '#4169E1',
      'in-progress': '#9370DB',
      completed: '#228B22'
    }
    return colors[status] || '#666'
  }

  const unassignedOrders = orders.filter(o => !o.driverId && ['pending', 'ready'].includes(o.status))

  if (loading) {
    return (
      <div className="admin-page">
        <div className="loading-container">Loading admin dashboard...</div>
      </div>
    )
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Admin Dashboard - Driver Assignment</h1>
        <div className="admin-actions">
          <button 
            onClick={handleAutoAssign} 
            disabled={isAssigning}
            className="assign-btn"
          >
            {isAssigning ? 'Assigning...' : 'Auto-Assign Orders to Drivers'}
          </button>
          <button onClick={loadData} className="refresh-btn">
            Refresh
          </button>
        </div>
      </div>

      {error && (
        <div className="error-message">
          Error: {error}
        </div>
      )}

      <div className="admin-stats">
        <div className="stat-card">
          <div className="stat-value">{drivers.length}</div>
          <div className="stat-label">Total Drivers</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{batches.length}</div>
          <div className="stat-label">Active Batches</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{unassignedOrders.length}</div>
          <div className="stat-label">Unassigned Orders</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{orders.length}</div>
          <div className="stat-label">Total Orders</div>
        </div>
      </div>

      <div className="admin-content">
        <div className="batches-section">
          <h2>Order Batches</h2>
          
          {batches.length === 0 ? (
            <div className="no-data">
              <p>No batches created yet. Click "Auto-Assign Orders to Drivers" to create batches.</p>
            </div>
          ) : (
            <div className="batches-list">
              {batches.map(batch => (
                <div 
                  key={batch.id} 
                  className={`batch-card ${selectedBatch?.id === batch.id ? 'selected' : ''}`}
                  onClick={() => setSelectedBatch(batch)}
                >
                  <div className="batch-header">
                    <div className="batch-id">Batch #{batch.id}</div>
                    <div 
                      className="batch-status"
                      style={{ backgroundColor: getStatusColor(batch.status) }}
                    >
                      {batch.status}
                    </div>
                  </div>
                  
                  <div className="batch-details">
                    <p><strong>Driver:</strong> {batch.driverName} ({batch.driverId})</p>
                    <p><strong>Orders:</strong> {batch.orders?.length || 0}</p>
                    <p><strong>Total Distance:</strong> {batch.totalDistance?.toFixed(2) || '0.00'} km</p>
                    <p><strong>Assigned:</strong> {new Date(batch.assignedAt).toLocaleString()}</p>
                  </div>

                  {batch.orders && batch.orders.length > 0 && (
                    <div className="batch-orders">
                      <strong>Order IDs:</strong>
                      <div className="order-ids">
                        {batch.orders.map(order => (
                          <span key={order.id} className="order-id-tag">
                            {order.id}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="map-section">
          <h2>Batch Map View</h2>
          {selectedBatch ? (
            <MapContainer
              center={(() => {
                const firstOrder = selectedBatch.orders?.[0]
                const orderLocation = firstOrder?.location || firstOrder?.deliveryLocation
                return orderLocation ? [orderLocation.lat, orderLocation.lng] : [40.7128, -74.0060]
              })()}
              zoom={12}
              style={{ height: '500px', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              
              {/* Driver location */}
              {selectedBatch.driverId && (() => {
                const driver = drivers.find(d => d.id === selectedBatch.driverId)
                if (driver?.currentLocation) {
                  return (
                    <Marker
                      position={[driver.currentLocation.lat, driver.currentLocation.lng]}
                    >
                      <Popup>
                        <strong>Driver: {driver.name}</strong>
                      </Popup>
                    </Marker>
                  )
                }
                return null
              })()}

              {/* Order locations */}
              {selectedBatch.orders?.map(order => {
                const orderLocation = order.location || order.deliveryLocation
                if (!orderLocation || !orderLocation.lat || !orderLocation.lng) {
                  return null
                }
                return (
                  <Marker
                    key={order.id}
                    position={[orderLocation.lat, orderLocation.lng]}
                  >
                    <Popup>
                      <div>
                        <strong>Order: {order.id}</strong>
                        <p>{orderLocation.address || `${orderLocation.zipCode || 'N/A'}`}</p>
                        <p>Status: {order.status}</p>
                      </div>
                    </Popup>
                  </Marker>
                )
              })}

              {/* Route line */}
              {selectedBatch.route && selectedBatch.route.length > 1 && (
                <Polyline
                  positions={selectedBatch.route.map(point => [point.lat, point.lng])}
                  color="#681a75"
                  weight={3}
                />
              )}
            </MapContainer>
          ) : (
            <div className="map-placeholder">
              <p>Select a batch to view on map</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

