# NeighborhoodPool - Team Guide

## 🚀 Quick Start

```bash
cd Proj2
npm install
npm run dev
# Visit http://localhost:5173
```

## ✅ What's Done

1. **Nearby Orders Board** - Fully functional
2. **95+ Tests** - Comprehensive test suite
3. **Analytics** - Success/failure/time tracking
4. **Architecture** - Scalable, modular design

## 📋 What's Left (Your Tasks)

### Must Do (Rubric Requirements)
1. **Create MAIN branch** - `git branch MAIN && git push origin MAIN`
2. **Add INSTALL.md** - How to install and run
3. **Add LICENSE.md** - ISC license details
4. **Add CODE-OF-CONDUCT.md** - Team conduct rules
5. **Add CONTRIBUTING.md** - How to contribute
6. **Create GitHub Issues** - Start discussions on team communication tool
7. **Set up CI/CD** - GitHub Actions for automatic testing
8. **Create video demo** - 2min screen recording showing functionality
9. **Add test coverage badge** - Show coverage % in README
10. **Add CHANGELOG.md** - Version history

### Should Do (Improve Score)
11. **API documentation** - Comprehensive API docs
12. **Troubleshooting guide** - Common issues
13. **Support contact** - Email or GitHub Discussions
14. **Case studies** - Usage examples
15. **Badges in README** - Style checker, formatter, etc.
16. **DOI registration** - Zenodo
17. **Project roadmap** - Future milestones

## 🎯 Current App Features

- Enter zip code → See nearby orders on map
- Filter by radius (1-50 km)
- Filter by order status
- Update order status
- Real-time analytics in console

## 🧪 Testing

```bash
npm test              # Run all tests
npm test -- --watch  # Watch mode
npm test -- --coverage # With coverage
```

## 📊 Project Structure

```
src/
├── components/       # React components
├── services/         # API & business logic
├── hooks/            # Custom React hooks
├── utils/            # Utilities (analytics, distance)
└── models/           # Data models

Test/                 # 95+ tests
├── services/
├── models/
├── components/
└── hooks/
```

## 🔗 Key Files

- `README.md` - Project overview
- `RUBRIC_CHECKLIST.md` - Detailed rubric assessment
- `DELIVERABLES.md` - What's been delivered
- `ARCHITECTURE.md` - System design

## ⚡ Quick Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production

# Testing
npm test             # Run tests
npm run test:ui      # Test with UI
```

## 📝 Notes

- App uses mock data by default
- Can switch to real API with env variables
- Analytics log to browser console
- Supports these zip codes: 10001, 90210, 60601, 78701, 27519, etc.

---

**Questions?** Create a GitHub issue or check the documentation files.

