# Tests

This directory contains unit tests for the QA Web Analyzer project.

## Structure

- `tests/` - Backend tests (TypeScript/Node.js)
  - `utils/` - Utility function tests
  - `services/` - Service tests
- `frontend/tests/` - Frontend tests (Vue 3)
  - `stores/` - Pinia store tests
  - `utils/` - Utility function tests

## Running Tests

### Backend Tests

```bash
# Run all backend tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

### Frontend Tests

```bash
cd frontend

# Run all frontend tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## Test Coverage

Tests cover:

- ✅ Utility functions (port-finder, html)
- ✅ Service methods (analyzer.service)
- ✅ Pinia stores (analysis, language, theme)
- ✅ Export utilities

## Writing New Tests

When adding new functionality, ensure you:

1. Create corresponding test files in the appropriate directory
2. Follow the existing test structure and naming conventions
3. Aim for high test coverage (>80%)
4. Test both success and error cases
