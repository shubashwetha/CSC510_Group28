# NeighborhoodPool - Nearby Orders Board

A lightweight location-based order management system with nearby orders board, comprehensive testing, and simple analytics.

## 🎯 Deliverables

1. **Nearby Orders Board** - Location-based order discovery and management
2. **Test Repository** - 95+ comprehensive test cases
3. **Analytics Tracking** - Success/failure and time tracking

## 🚀 Quick Start

### Run Application
```bash
cd Proj2
npm install
npm run dev
# Visit http://localhost:5173
```

### Run Tests
```bash
npm test
```

## ✨ Features

### Nearby Orders Board
- Enter any zip code to search
- View orders on interactive map
- Filter by radius (1-50 km)
- Filter by order status
- Update order status
- See distance to each order

### Supported Zip Codes
The app uses the OpenWeather Geocoding API to resolve zip codes. Any valid US zip code will work!

Examples that are tested:
- 10001 (Manhattan, NY)
- 90210 (Beverly Hills, CA)  
- 60601 (Chicago, IL)
- 78701 (Austin, TX)
- 27519 (Carrboro, NC)
- And many more...

### Analytics
View operation tracking in browser console:
```
📊 Analytics: location-fetch - ✅ Success (250ms)
📊 Analytics: fetch-nearby-orders - ✅ Success (180ms)
```

## 📁 Project Structure

```
src/
├── components/
│   ├── nearbyOrdersBoard.js    # Main feature
│   ├── OrderCard.jsx
│   ├── LocationControls.jsx
│   └── Navbar.jsx
├── pages/
│   ├── Home.jsx
│   └── NearbyOrdersPage.jsx
├── services/
│   └── orders/orderService.js
├── hooks/
│   └── useNearbyOrders.js
├── utils/
│   ├── analytics.js            # Analytics tracking
│   └── distanceCalculator.js
└── models/
    ├── Order.js
    └── User.js

Test/
├── services/
├── models/
├── components/
├── hooks/
└── features/
```

## 🧪 Testing

**Test Coverage**: 95+ test cases

- Service layer (orderService, locationService)
- Data models (Order, User)
- React components
- Custom hooks
- Utility functions

```bash
npm test                # Run all tests
npm test -- --watch     # Watch mode
npm test -- --coverage  # With coverage
```

## 📊 Analytics

Track operations:
- Success/failure status
- Duration (time to complete)
- Operation metadata

View analytics:
1. Open browser console
2. Use the nearby orders board
3. Watch console for logs

## 🔧 Technology Stack

- React 18
- Vite
- Vitest
- React Leaflet
- OpenWeather Geocoding API

## 📝 Notes

- Uses real geocoding API (OpenWeather)
- Falls back to mock data if API unavailable
- All tests passing
- Lightweight and focused
- Ready for commit/push

## 🎉 Status

✅ All deliverables complete
✅ Tests passing
✅ Analytics tracking
✅ Production ready

---

Built for CSC510 project delivery.
