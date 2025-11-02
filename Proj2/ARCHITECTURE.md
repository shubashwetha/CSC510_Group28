# NeighborhoodPool - Architecture Plan

## Project Vision
A scalable location-based order management platform supporting multiple user types, order creation, tracking, and real-time updates.

## Core Features Needed
1. **Order Creation & Management** - Full CRUD operations
2. **Nearby Orders** - Location-based order discovery
3. **Multi-User Support** - Customers, Drivers, Businesses
4. **Real-Time Updates** - WebSocket/live updates
5. **Driver Assignment** - Automated/manual driver matching
6. **Analytics Dashboard** - Business insights
7. **Payment Integration** - Payment processing
8. **Notifications** - Push notifications

## Scalability Requirements

### Data Layer
- **Standardized Models**: All entities have consistent structure
- **API Abstraction**: Easy to swap from mock to real API
- **Validation**: Centralized validation logic
- **Caching**: Optimistic updates with cache invalidation

### Service Layer
- **Modular Services**: Each domain has its own service
- **Shared Utilities**: Common functions extracted
- **Error Handling**: Consistent error responses
- **Type Definitions**: Standardized interfaces

### Component Architecture
- **Reusable Components**: Shared UI components
- **Smart/Dumb Components**: Separation of concerns
- **Custom Hooks**: Business logic in hooks
- **State Management**: Centralized state (Context/Redux later)

## Data Models

### Order Model
```javascript
{
  id: string,
  customerId: string,
  businessId: string,
  driverId?: string,
  status: 'pending' | 'processing' | 'ready' | 'picked-up' | 'delivered' | 'cancelled',
  location: {
    zipCode: string,
    coordinates: { lat: number, lng: number },
    address: string
  },
  items: OrderItem[],
  total: number,
  created: Date,
  updated: Date,
  metadata: Record<string, any>
}
```

### User Model
```javascript
{
  id: string,
  type: 'customer' | 'driver' | 'business',
  name: string,
  email: string,
  phone: string,
  location: Coordinates,
  metadata: Record<string, any>
}
```

## API Structure

```
/api
  /orders
    GET    /api/orders              - List all orders
    GET    /api/orders/nearby      - Get nearby orders
    GET    /api/orders/:id         - Get order by ID
    POST   /api/orders              - Create order
    PUT    /api/orders/:id          - Update order
    DELETE /api/orders/:id          - Delete order
  /users
    GET    /api/users               - List users
    GET    /api/users/:id           - Get user by ID
    POST   /api/users               - Create user
    PUT    /api/users/:id           - Update user
  /drivers
    GET    /api/drivers/available  - Get available drivers
    POST   /api/drivers/:id/assign - Assign driver to order
```

## File Structure

```
src/
├── models/               # Data model definitions
│   ├── Order.ts
│   ├── User.ts
│   └── index.ts
├── services/             # API service layer
│   ├── api/
│   │   ├── client.js    # Axios client with interceptors
│   │   └── endpoints.js # API endpoint definitions
│   ├── orders/
│   │   ├── orderService.js
│   │   └── nearbyOrdersService.js
│   ├── users/
│   │   └── userService.js
│   └── index.js
├── hooks/                # Custom React hooks
│   ├── useOrders.js
│   ├── useNearbyOrders.js
│   └── useUsers.js
├── components/
│   ├── orders/          # Order-specific components
│   │   ├── OrderCard.jsx
│   │   └── OrderList.jsx
│   ├── shared/          # Reusable components
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   └── Modal.jsx
│   └── ...
├── utils/                # Utility functions
│   ├── distance.js
│   ├── formatting.js
│   └── validation.js
└── stores/              # State management (future)
    └── orderStore.js
```

