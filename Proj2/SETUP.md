# Setup Guide - NeighborhoodPool

Complete setup guide for getting NeighborhoodPool running on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18+ and npm (or yarn)
- **Git** for version control
- A modern web browser (Chrome, Firefox, Safari, or Edge)

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/shubashwetha/CSC510_Group28.git
cd CSC510_Group28/Proj2
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required dependencies including:
- React 18
- Vite
- React Router
- React Leaflet
- Firebase
- Vitest
- And other dependencies

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at: **http://localhost:5173**

### 4. Verify Installation

Open your browser and navigate to `http://localhost:5173`. You should see the NeighborhoodPool home page.

## Development Setup

### Environment Variables

For development, the application uses mock data by default. No environment variables are required.

For production, create a `.env` file in the `Proj2` directory:

```env
VITE_API_BASE_URL=https://your-api.com
VITE_USE_MOCK_DATA=false
VITE_FIREBASE_API_KEY=your-firebase-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run tests with UI
npm run test:ui
```

### Building for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

The build output will be in the `dist` directory.

## Project Structure

```
Proj2/
├── src/
│   ├── components/      # React components
│   ├── pages/          # Page components
│   ├── services/       # API and business logic
│   ├── hooks/          # Custom React hooks
│   ├── models/         # Data models
│   ├── utils/          # Utility functions
│   └── auth/           # Authentication logic
├── Test/               # Test files
├── package.json        # Dependencies and scripts
├── vite.config.js      # Vite configuration
└── vitest.config.js    # Vitest configuration
```

## Key Features

### Nearby Orders Board
- Location-based order discovery
- Interactive map with Leaflet
- Radius and status filtering

### Order Pooling
- Create pools with multiple orders
- Route optimization
- Cost savings calculation

### Authentication
- Firebase authentication
- Role-based access control
- Multi-user support (Customer, Driver, Business, Admin)

## Troubleshooting

### Port Already in Use

If port 5173 is already in use:

```bash
# Find and kill the process
lsof -ti:5173 | xargs kill -9

# Or change the port in vite.config.js
```

### Module Not Found Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Tests Failing

```bash
# Run with verbose output
npm test -- --reporter=verbose

# Clear cache and reinstall
rm -rf node_modules
npm install
```

### Firebase Authentication Issues

- Ensure Firebase configuration is correct
- Check that Firebase project is set up properly
- Verify API keys in environment variables

### Map Not Loading

- Check that Leaflet CSS is imported
- Verify OpenWeather API key (if using real API)
- Check browser console for errors

## Development Workflow

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** and test locally

3. **Run tests** to ensure nothing is broken:
   ```bash
   npm test
   ```

4. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat: Add your feature"
   ```

5. **Push and create a pull request**

## Next Steps

- Read [ARCHITECTURE.md](./ARCHITECTURE.md) for system architecture
- See [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines
- Check [README.md](./README.md) for project overview

## Support

If you encounter issues:
- Check the [Troubleshooting](#troubleshooting) section above
- Review [INSTALL.md](./INSTALL.md) for installation details
- Open an issue on GitHub
- Contact the development team

---

**Happy Coding!** 🚀

