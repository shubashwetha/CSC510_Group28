# Release 1: Order Pooling Feature

## 🎯 Overview

This document outlines the **Order Pooling** feature for NeighborhoodPool Release 1. The pooling feature allows multiple orders to be grouped together for efficient delivery, reducing costs and improving logistics.

## 📋 Feature Description

### What is Order Pooling?

Order pooling combines multiple nearby orders into a single delivery group, allowing drivers to:
- Deliver multiple orders in one trip
- Optimize routes for efficiency
- Reduce delivery costs
- Improve delivery times

### Key Capabilities

1. **Automatic Pooling**: Orders are automatically suggested for pooling based on proximity
2. **Manual Pooling**: Users can manually select orders to pool together
3. **Pool Management**: View, edit, and manage active pools
4. **Smart Routing**: Optimized routes for pooled deliveries
5. **Cost Sharing**: Split delivery costs among pooled orders

## 🏗️ Architecture

### New Components

```
src/
├── components/
│   ├── PoolingDashboard.jsx      # Main pooling interface
│   ├── PoolGroup.jsx              # Display for a pool of orders
│   ├── PoolCard.jsx               # Individual pool display
│   └── PoolingControls.jsx        # Controls for creating/managing pools
├── services/
│   ├── pooling/
│   │   ├── poolingService.js      # Core pooling logic
│   │   ├── poolModel.js           # Pool data model
│   │   └── routeOptimizer.js      # Route optimization algorithms
└── hooks/
    └── usePooling.js              # Custom hook for pooling state
```

### Data Models

#### Pool Model
```javascript
{
  id: string,
  name: string,
  description: string,
  orders: Order[],              // Array of orders in the pool
  driverId: string | null,      // Assigned driver
  status: 'pending' | 'active' | 'in-progress' | 'completed' | 'cancelled',
  startLocation: Location,       // Starting point
  optimizedRoute: Route,         // Calculated optimized route
  estimatedDistance: number,     // Total distance (km)
  estimatedTime: number,         // Estimated delivery time (minutes)
  cost: number,                  // Total cost
  savings: number,               // Cost savings vs individual deliveries
  createdAt: Date,
  updatedAt: Date,
  metadata: Record<string, any>
}
```

#### Route Model
```javascript
{
  waypoints: Waypoint[],         // Ordered list of delivery stops
  totalDistance: number,         // km
  estimatedTime: number,         // minutes
  tolls: boolean,
  trafficConsideration: boolean
}
```

## 🎨 User Interface

### Pooling Dashboard

The main pooling interface will include:

1. **Pool List View**
   - Active pools
   - Pending pools
   - Completed pools
   - Pool statistics

2. **Create Pool Interface**
   - Order selection (multi-select)
   - Pool configuration
   - Preview of optimization
   - Confirm creation

3. **Pool Details View**
   - Order list in pool
   - Route visualization on map
   - Estimated costs/savings
   - Driver assignment
   - Status tracking

4. **Quick Actions**
   - Suggest pools (auto-suggest)
   - Add to existing pool
   - Remove from pool
   - Assign driver
   - Start delivery

## 🔧 Implementation Details

### Core Features

#### 1. Automatic Pool Suggestions
```javascript
// Suggest pools based on proximity and status
const suggestPools = (orders, maxPoolSize = 5, maxDistance = 10) => {
  // Group orders by proximity
  // Check status compatibility
  // Calculate potential savings
  return suggestedPools
}
```

#### 2. Manual Pool Creation
```javascript
// Allow user to manually select orders for pooling
const createPool = async (orderIds, poolConfig) => {
  // Validate order compatibility
  // Optimize route
  // Calculate costs
  // Create pool
  return pool
}
```

#### 3. Route Optimization
```javascript
// Calculate optimized delivery route
const optimizeRoute = (waypoints) => {
  // Using Dijkstra's or similar algorithm
  // Consider traffic
  // Minimize total distance/time
  return optimizedRoute
}
```

#### 4. Cost Calculation
```javascript
// Calculate costs and savings
const calculatePoolCost = (pool, individualCosts) => {
  const pooledCost = baseCost + (distanceRate * totalDistance)
  const originalCost = individualCosts.reduce((sum, cost) => sum + cost, 0)
  const savings = originalCost - pooledCost
  return { pooledCost, originalCost, savings }
}
```

### API Endpoints

```
POST   /api/pools                    # Create new pool
GET    /api/pools                    # List all pools
GET    /api/pools/:id                # Get pool details
PUT    /api/pools/:id                # Update pool
DELETE /api/pools/:id                # Delete pool
POST   /api/pools/:id/orders         # Add orders to pool
DELETE /api/pools/:id/orders/:orderId # Remove order from pool
POST   /api/pools/:id/assign         # Assign driver
POST   /api/pools/:id/start          # Start delivery
POST   /api/pools/:id/complete       # Complete delivery
GET    /api/pools/suggestions        # Get pool suggestions
POST   /api/pools/:id/optimize       # Re-optimize route
```

### Service Integration

```javascript
// services/pooling/poolingService.js
export const poolingService = {
  // Get all pools
  getAllPools: async (filters) => {
    // Implementation
  },
  
  // Get pool by ID
  getPoolById: async (poolId) => {
    // Implementation
  },
  
  // Create new pool
  createPool: async (poolData) => {
    // Validate orders
    // Optimize route
    // Calculate costs
    // Create pool
  },
  
  // Update pool
  updatePool: async (poolId, updates) => {
    // Implementation
  },
  
  // Delete pool
  deletePool: async (poolId) => {
    // Implementation
  },
  
  // Add orders to pool
  addOrdersToPool: async (poolId, orderIds) => {
    // Validate compatibility
    // Re-optimize route
    // Update pool
  },
  
  // Remove order from pool
  removeOrderFromPool: async (poolId, orderId) => {
    // Re-optimize route
    // Update pool
  },
  
  // Assign driver
  assignDriver: async (poolId, driverId) => {
    // Check driver availability
    // Assign to pool
  },
  
  // Start delivery
  startDelivery: async (poolId) => {
    // Update pool status
    // Notify driver
    // Begin tracking
  },
  
  // Complete delivery
  completeDelivery: async (poolId) => {
    // Update pool status
    // Update order statuses
    // Calculate final costs
  },
  
  // Get suggestions
  getSuggestions: async (filters) => {
    // Analyze nearby orders
    // Calculate potential savings
    // Return suggestions
  },
  
  // Optimize route
  optimizeRoute: async (poolId) => {
    // Recalculate route
    // Update estimated time/distance
    // Return optimized route
  }
}
```

## 🧪 Testing Requirements

### Unit Tests
- Pool model validation
- Route optimization algorithms
- Cost calculation logic
- Pool suggestion algorithms

### Integration Tests
- Pool creation flow
- Order addition/removal
- Driver assignment
- Status transitions

### Component Tests
- PoolingDashboard rendering
- PoolCard interactions
- PoolGroup displays
- PoolingControls functionality

### E2E Tests
- Complete pool creation workflow
- Driver assignment and delivery
- Pool completion flow

## 📊 Analytics

Track the following metrics:
- Number of pools created
- Average pool size
- Cost savings per pool
- Route efficiency improvements
- Delivery time reductions
- Driver utilization
- Customer satisfaction

## 🚀 Release Timeline

### Phase 1: Foundation (Week 1)
- [ ] Create Pool model
- [ ] Set up pooling service structure
- [ ] Build basic pool creation UI
- [ ] Implement simple route optimization

### Phase 2: Core Features (Week 2)
- [ ] Add order selection interface
- [ ] Implement cost calculation
- [ ] Build pool management UI
- [ ] Add driver assignment

### Phase 3: Optimization (Week 3)
- [ ] Implement advanced route optimization
- [ ] Add pool suggestions
- [ ] Build analytics dashboard
- [ ] Performance tuning

### Phase 4: Testing & Polish (Week 4)
- [ ] Comprehensive testing
- [ ] UI/UX improvements
- [ ] Documentation
- [ ] Deployment preparation

## 📝 User Stories

1. **As a business owner**, I want to pool nearby orders together so I can reduce delivery costs.

2. **As a driver**, I want to see pooled orders with optimized routes so I can deliver efficiently.

3. **As a customer**, I want to know if my order can be pooled so I can save on delivery fees.

4. **As a logistics manager**, I want to see pooling analytics so I can make informed decisions.

5. **As a system**, I want to automatically suggest pools so users don't have to manually create them.

## 🎯 Success Criteria

- [ ] Users can create pools with 2-10 orders
- [ ] Route optimization reduces total distance by at least 15%
- [ ] Average cost savings of 20% per pooled delivery
- [ ] Pool suggestions are accurate 80% of the time
- [ ] All tests passing
- [ ] UI is intuitive and responsive
- [ ] Performance is acceptable (<2s pool creation)

## 🔗 Dependencies

- Leaflet for route visualization
- Distance calculation utilities
- Order management system
- Driver management system
- Analytics tracking

## 📚 Documentation

- API documentation for pooling endpoints
- User guide for pool creation
- Driver guide for pooled deliveries
- Analytics report template
- Architecture decision records

## 🛣️ Future Enhancements

- Machine learning for better pool suggestions
- Dynamic pricing based on demand
- Integration with external mapping services
- Real-time tracking for pooled deliveries
- Customer-facing pool status updates
- Multi-vehicle pool optimization

---

**Status**: Planning Phase
**Version**: 1.0
**Last Updated**: 2024

