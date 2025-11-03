# Architecture Documentation - NeighborhoodPool

## System Overview

NeighborhoodPool is a location-based order management system built with React and designed for scalability. The architecture follows a modular, service-oriented approach with clear separation of concerns.

## Architecture Principles

### Modularity
- Each feature is self-contained in its own module
- Services are separated by domain (orders, users, locations, pooling)
- Components are reusable and composable

### Scalability
- API abstraction layer allows easy switching between mock and real APIs
- State management is centralized and extensible
- Service layer can be extended without affecting UI

### Testability
- Business logic separated from UI components
- Services are easily mockable
- Comprehensive test coverage (95+ tests)

## System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     User Interface                       │
│  (React Components - Pages, Components, Hooks)          │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│                  Service Layer                          │
│  (API Client, Order Service, Location Service, etc.)   │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│                  Data Models                            │
│  (Order, User, Pool, Driver, Batch)                  │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│              External Services                          │
│  (Firebase Auth, OpenWeather API, Future Backend)     │
└─────────────────────────────────────────────────────────┘
```

## Layer Breakdown

### 1. Presentation Layer (UI)

**Location**: `src/components/`, `src/pages/`

**Responsibilities**:
- User interface rendering
- User interaction handling
- State visualization
- Form validation

**Key Components**:
- `NearbyOrdersBoard.jsx` - Main nearby orders feature
- `OrderCard.jsx` - Order display component
- `LocationControls.jsx` - Location input and filters
- `PoolingDashboard.jsx` - Order pooling interface
- `Navbar.jsx` - Navigation component

**Pages**:
- `Home.jsx` - Landing page
- `NearbyOrdersPage.jsx` - Nearby orders view
- `PoolingPage.jsx` - Order pooling view
- `OrdersPage.jsx` - User orders view
- `AdminPage.jsx` - Admin dashboard

### 2. Business Logic Layer

**Location**: `src/services/`, `src/hooks/`

**Responsibilities**:
- Business rule enforcement
- Data transformation
- API communication
- State management

**Services**:
- `orders/orderService.js` - Order CRUD operations
- `pooling/poolingService.js` - Pool management
- `locationService.js` - Location and geocoding
- `api/client.js` - HTTP client wrapper
- `api/endpoints.js` - API endpoint definitions

**Custom Hooks**:
- `useNearbyOrders.js` - Nearby orders management
- `useLocation.js` - Location tracking

### 3. Data Models Layer

**Location**: `src/models/`

**Responsibilities**:
- Data structure definitions
- Validation logic
- Data transformation
- Business rule enforcement at model level

**Models**:
- `Order.js` - Order data model with validation
- `User.js` - User data model with role support
- `Pool.js` - Pool data model
- `Driver.js` - Driver data model
- `Batch.js` - Batch data model

### 4. Utilities Layer

**Location**: `src/utils/`

**Responsibilities**:
- Common utility functions
- Helper methods
- Analytics tracking
- Distance calculations

**Utilities**:
- `analytics.js` - Performance tracking
- `distanceCalculator.js` - Distance calculations
- `adminAuth.js` - Admin authentication helpers

### 5. Authentication Layer

**Location**: `src/auth/`

**Responsibilities**:
- User authentication
- Authorization checks
- Session management
- Role-based access control

**Components**:
- `AuthContext.jsx` - Authentication context
- `RequireAuth.jsx` - Protected route wrapper
- `RequireAdmin.jsx` - Admin-only route wrapper
- `GlobalAuthGate.jsx` - Global auth interceptor

## Data Flow

### Nearby Orders Flow

```
User Input (Zip Code)
    ↓
LocationControls Component
    ↓
useNearbyOrders Hook
    ↓
locationService.getCoordinatesFromZip()
    ↓
orderService.getNearbyOrders()
    ↓
Order Model (validation)
    ↓
UI Update (Map + List)
```

### Order Pooling Flow

```
User Selects Orders
    ↓
PoolingDashboard Component
    ↓
poolingService.createPool()
    ↓
Route Optimization Algorithm
    ↓
Pool Model (validation)
    ↓
Cost Calculation
    ↓
UI Update (Pool Display)
```

## Technology Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **React Leaflet** - Map integration

### State Management
- **React Context API** - Global state (auth, cart)
- **Custom Hooks** - Local state management
- **Future**: Redux or Zustand for complex state

### Backend Integration
- **Firebase** - Authentication
- **Axios** - HTTP client
- **OpenWeather API** - Geocoding
- **Future**: RESTful API backend

### Testing
- **Vitest** - Test runner
- **React Testing Library** - Component testing
- **jsdom** - DOM simulation

## Design Patterns

### Service Pattern
All business logic is encapsulated in service classes:
```javascript
// Example: orderService.js
export const orderService = {
  getAll: async () => { ... },
  getById: async (id) => { ... },
  create: async (data) => { ... },
  update: async (id, data) => { ... }
}
```

### Repository Pattern (via API Client)
API abstraction allows switching between mock and real data:
```javascript
// api/client.js
const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api'
})
```

### Model Pattern
Data models encapsulate validation and business rules:
```javascript
// models/Order.js
class Order {
  constructor(data) {
    this.validate(data)
    // ... assign properties
  }
  validate(data) { ... }
}
```

### Hook Pattern
Custom hooks encapsulate complex state logic:
```javascript
// hooks/useNearbyOrders.js
export function useNearbyOrders(location, radius, status) {
  // ... state management
  return { nearbyOrders, loading, error }
}
```

## Scalability Considerations

### Adding New Features

1. **Create Model** (if needed):
   ```javascript
   // src/models/NewFeature.js
   export class NewFeature { ... }
   ```

2. **Create Service**:
   ```javascript
   // src/services/newFeature/newFeatureService.js
   export const newFeatureService = { ... }
   ```

3. **Create Hook** (if needed):
   ```javascript
   // src/hooks/useNewFeature.js
   export function useNewFeature() { ... }
   ```

4. **Create Component**:
   ```javascript
   // src/components/NewFeatureComponent.jsx
   export function NewFeatureComponent() { ... }
   ```

### Adding Real Backend

1. Update `.env`:
   ```env
   VITE_API_BASE_URL=https://api.neighborhoodpool.com
   VITE_USE_MOCK_DATA=false
   ```

2. The API client automatically switches to real API

3. No component changes needed!

## API Structure

### Current (Mock Data)
```
src/services/
├── orders/
│   └── mockData.js      # Mock order data
└── api/
    └── client.js        # Mock API client
```

### Future (Real API)
```
Backend API:
GET    /api/orders
GET    /api/orders/:id
POST   /api/orders
PUT    /api/orders/:id
DELETE /api/orders/:id
GET    /api/orders/nearby
...
```

## Testing Architecture

### Test Structure
```
Test/
├── services/     # Service layer tests
├── models/       # Model validation tests
├── components/   # Component tests
├── hooks/        # Hook tests
└── features/     # Feature integration tests
```

### Test Coverage
- **95+ test cases** covering:
  - Service layer (CRUD operations)
  - Model validation
  - Component rendering and interaction
  - Hook functionality
  - Utility functions

## Future Enhancements

### Planned Architecture Improvements
1. **State Management**: Add Redux or Zustand for complex state
2. **Real-time Updates**: WebSocket integration for live updates
3. **Caching Layer**: Add service worker or Redux persist
4. **Microservices**: Split into separate services when scaling
5. **API Gateway**: Centralized API management
6. **CDN Integration**: Static asset delivery optimization

## Security Considerations

- **Authentication**: Firebase Auth with role-based access
- **Authorization**: Route guards and component-level checks
- **Data Validation**: Model-level validation before API calls
- **API Security**: Future: JWT tokens, rate limiting
- **XSS Prevention**: React's built-in XSS protection

## Performance Optimization

- **Code Splitting**: Lazy loading for routes
- **Memoization**: React.memo for expensive components
- **Virtualization**: For large lists (future)
- **Image Optimization**: Future CDN integration
- **Bundle Analysis**: Regular bundle size monitoring

## Documentation

- **README.md** - Project overview
- **SETUP.md** - Setup instructions
- **INSTALL.md** - Installation guide
- **CONTRIBUTING.md** - Contribution guidelines
- **CHANGELOG.md** - Release history

---

**Last Updated**: 2025-01-XX  
**Version**: 1.0.0

