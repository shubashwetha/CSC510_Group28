import axios from 'axios'
import { distanceCalculator } from '../utils/distanceCalculator'

// Mock data for demonstration - in a real app, this would be API calls
const mockOrders = [
  {
    id: 'ORD-001',
    customerName: 'John Doe',
    status: 'pending',
    total: 45.99,
    createdAt: new Date('2024-01-15T10:30:00Z').toISOString(),
    deliveryAddress: '123 Main St, Anytown, USA',
    deliveryLocation: { lat: 40.7128, lng: -74.0060 },
    items: [
      { name: 'Laptop', quantity: 1, price: 45.99 }
    ],
    notes: 'Please deliver after 5 PM'
  },
  {
    id: 'ORD-002',
    customerName: 'Jane Smith',
    status: 'processing',
    total: 89.50,
    createdAt: new Date('2024-01-15T11:15:00Z').toISOString(),
    deliveryAddress: '456 Oak Ave, Anytown, USA',
    deliveryLocation: { lat: 40.7589, lng: -73.9851 },
    items: [
      { name: 'Smartphone', quantity: 1, price: 89.50 }
    ],
    notes: 'Fragile - handle with care'
  },
  {
    id: 'ORD-003',
    customerName: 'Bob Johnson',
    status: 'ready',
    total: 25.00,
    createdAt: new Date('2024-01-15T09:45:00Z').toISOString(),
    deliveryAddress: '789 Pine St, Anytown, USA',
    deliveryLocation: { lat: 40.7505, lng: -73.9934 },
    items: [
      { name: 'Headphones', quantity: 1, price: 25.00 }
    ],
    notes: 'Customer prefers morning delivery'
  },
  {
    id: 'ORD-004',
    customerName: 'Alice Brown',
    status: 'delivered',
    total: 120.75,
    createdAt: new Date('2024-01-14T14:20:00Z').toISOString(),
    deliveryAddress: '321 Elm St, Anytown, USA',
    deliveryLocation: { lat: 40.7282, lng: -73.7949 },
    items: [
      { name: 'Tablet', quantity: 1, price: 120.75 }
    ],
    notes: 'Delivered successfully'
  }
]

export const orderService = {
  // Get nearby orders based on user location and radius
  getNearbyOrders: async (userLocation, radius = 5, statusFilter = 'all') => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))

    if (!userLocation) {
      throw new Error('User location is required')
    }

    let filteredOrders = mockOrders

    // Filter by status if not 'all'
    if (statusFilter !== 'all') {
      filteredOrders = mockOrders.filter(order => order.status === statusFilter)
    }

    // Calculate distances and filter by radius
    const ordersWithDistance = filteredOrders.map(order => {
      const distance = distanceCalculator.calculateDistance(
        userLocation.lat,
        userLocation.lng,
        order.deliveryLocation.lat,
        order.deliveryLocation.lng
      )
      return {
        ...order,
        distance
      }
    })

    // Filter by radius and sort by distance
    return ordersWithDistance
      .filter(order => order.distance <= radius)
      .sort((a, b) => a.distance - b.distance)
  },

  // Get all orders (for admin purposes)
  getAllOrders: async () => {
    await new Promise(resolve => setTimeout(resolve, 300))
    return mockOrders
  },

  // Get order by ID
  getOrderById: async (orderId) => {
    await new Promise(resolve => setTimeout(resolve, 200))
    const order = mockOrders.find(o => o.id === orderId)
    if (!order) {
      throw new Error('Order not found')
    }
    return order
  },

  // Update order status
  updateOrderStatus: async (orderId, newStatus) => {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const orderIndex = mockOrders.findIndex(o => o.id === orderId)
    if (orderIndex === -1) {
      throw new Error('Order not found')
    }

    mockOrders[orderIndex].status = newStatus
    return mockOrders[orderIndex]
  },

  // Create new order
  createOrder: async (orderData) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const newOrder = {
      id: `ORD-${String(mockOrders.length + 1).padStart(3, '0')}`,
      ...orderData,
      createdAt: new Date().toISOString(),
      status: 'pending'
    }
    
    mockOrders.push(newOrder)
    return newOrder
  }
}
