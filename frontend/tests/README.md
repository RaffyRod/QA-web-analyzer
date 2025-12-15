# Frontend Tests

Unit tests for the Vue 3 frontend application.

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## Test Structure

- `stores/` - Pinia store tests
  - `analysis.test.ts` - Analysis store tests
  - `language.test.ts` - Language/i18n store tests
  - `theme.test.ts` - Theme store tests
- `utils/` - Utility function tests
  - `html.test.ts` - HTML utility tests
  - `export.test.ts` - PDF export utility tests
