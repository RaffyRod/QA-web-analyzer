# 🔍 QA Web Analyzer

> **Professional accessibility analysis tool** for web pages. Built with TypeScript following best practices.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-45ba4b?style=flat-square&logo=playwright&logoColor=white)
![Cross-Platform](https://img.shields.io/badge/Cross--Platform-Windows%20%7C%20macOS%20%7C%20Linux-blue?style=flat-square)

> ✅ **Fully Portable**: Works on any PC regardless of installation path or operating system. No hardcoded paths or system-specific configurations.

---

## 🚀 QUICK START - ONE COMMAND

<div align="center">

### ⚡ **START IN SECONDS - ZERO CONFIGURATION**

```bash
npm run setup
```

**✨ That's it! No configuration needed. Everything is automatic.**

</div>

### 📋 What `npm run setup` does automatically:

- ✅ Installs backend dependencies (if needed)
- ✅ Installs Playwright browsers (required for web analysis)
- ✅ Installs frontend dependencies (if needed)
- ✅ Builds the TypeScript backend (if needed)
- ✅ Starts both servers (Backend + Frontend)
- ✅ Finds available ports automatically
- ✅ Shows you the exact URLs in the console

**✨ Servers will automatically find available ports and display the exact URLs in the console where they were deployed.**

> 💡 **Alternative commands:**
>
> - `node scripts/setup-and-run.js` - Direct execution
> - `start.bat` (Windows) or `./start.sh` (macOS/Linux) - Platform-specific scripts

> 💡 **Note**: The frontend automatically proxies API requests to the backend. You only need to open the frontend URL that will appear in the console.

---

## 🏃 RUN - START SERVERS (Already Set Up)

<div align="center">

### ⚡ **JUST RUN - NO SETUP NEEDED**

```bash
npm run start:all
```

**✨ If you've already run `npm run setup` before, use this command to start the servers quickly.**

</div>

### 📋 What `npm run start:all` does:

- ✅ Starts the backend server (if compiled)
- ✅ Starts the frontend development server
- ✅ Automatically finds available ports
- ✅ Shows you the exact URLs in the console

> ⚠️ **Important**: Make sure you've run `npm run setup` at least once before using this command. This command assumes dependencies are installed and the backend is compiled.

### 🔄 **Automatic Port Detection**

The application uses **intelligent port management**:

- **Backend**: Automatically finds available ports in priority order (4000 → 4001 → 4002 → 4003 → 4004 → 4005 → 5000 → 5001 → 5002 → 5003 → 5004 → 5005 → any available)
- **Frontend**: Automatically detects which port the backend is using
- **Proxy**: Dynamically connects to the correct backend port
- **Multi-Server Support**: Works seamlessly even if you have other servers running on those ports

**How it works:**

1. Backend checks ports in priority order and uses the first available one
2. Frontend automatically detects the backend port by testing common ports
3. If the backend is on a different port, the frontend will find it automatically
4. No manual configuration needed - it just works! 🎉

**If you have other servers running:**

- The backend will skip occupied ports and use the next available one
- The frontend will automatically find the correct backend, even if it's on a different port
- No conflicts - each server uses its own port independently

---

## 🎯 What is this?

QA Web Analyzer is a **web-based tool** that analyzes web pages for **accessibility issues** according to **WCAG 2.2 AA standards**. It checks images, links, buttons, inputs, and ARIA elements to ensure they meet accessibility requirements.

### ✨ Key Features

- 🔎 **Comprehensive Analysis**: Check images, links, buttons, inputs, and ARIA roles
- 🎛️ **Configurable Options**: Select exactly what you want to analyze
- 📊 **Detailed Reports**: See HTML code, screenshots, and missing attributes
- 🎨 **15+ Visual Themes**: Light, Dark, Flat, Material, Glassmorphism, Cyberpunk, and more
- 📄 **Professional PDF Export**: Generate elegant PDF reports with customizable options (Design 12: Highlight Rows + Design 13: Icon Badges)
- 🎛️ **Export Modal**: Select which elements and statuses to include in PDF reports
- 🌍 **Multi-language**: English and Spanish support
- 🎯 **Smart Filtering**: Filter by missing or present attributes
- 📸 **Visual Feedback**: Screenshots of problematic elements
- 📱 **Fully Responsive**: Optimized for smartphones, tablets, and desktop
- 🎭 **WCAG Information Modal**: Quick reference guide for accessibility standards with detailed rules for images and `aria-label` according to WCAG 2.2 AA. Fully translated to English and Spanish.. Fully translated to English and Spanish.

## 📖 How to Use

### Step-by-Step Guide

| Step                 | Description                                                                              |
| -------------------- | ---------------------------------------------------------------------------------------- |
| 1. Enter URL         | Enter the URL to analyze (e.g., `http://localhost:3000`)                                 |
| 2. Select Elements   | Choose which elements to check: ☑ Images ☑ Links ☑ Buttons ☑ Inputs ☑ Roles              |
| 3. Select Attributes | Choose which attributes to verify: ☑ Alt Text ☑ aria-label ☑ Focus States etc.           |
| 4. Analyze           | Click the "Analyze" button to start the analysis                                         |
| 5. Review Report     | Examine the results: • Summary cards • Detailed element analysis • Screenshots of issues |
| 6. Filter & Export   | Use filters to show missing/present attributes and export as PDF                         |
| 7. Export PDF        | Click "Export PDF" → Select elements/statuses to include → Generate report               |

### 🎛️ Configuration Options

#### Elements to Check

- 🖼️ **Images**: Analyze `<img>` elements
- 🔗 **Links**: Analyze `<a>` elements
- 🔘 **Buttons**: Analyze `<button>` elements
- 📝 **Inputs**: Analyze `<input>`, `<textarea>`, `<select>`
- 🎭 **Roles**: Analyze elements with `role` attribute

#### Attributes to Check

- **Alt Text**: For images (WCAG 2.2 AA requirement)
- **aria-label**: Accessible name (for images: only required if no `alt` is present)
- **aria-labelledby**: Reference to label (for images: only required if no `alt` is present)
- **aria-describedby**: Additional description
- **aria-hidden**: Misuse detection
- **aria-expanded**: For expandable elements
- **aria-controls**: Control relationships
- **aria-current**: Current item indicator
- **aria-required**: Required inputs
- **aria-invalid**: Invalid state
- **tabindex**: Anti-pattern detection
- **lang**: Language specification
- **Labels**: `<label>` elements for inputs
- **Title**: Title attribute
- **Focus States**: WCAG 2.2 AA compliance
- **href**: Link destination validation (only validates if selected)

#### Selection Controls

- **Radio Buttons**: Use "All" or "None" to quickly select/deselect all elements or attributes
- **Section Filters**: Toggle visibility of result sections (Images, Links, Buttons, etc.)
- **Status Filters**: Show only missing attributes, only present attributes, or both

## 📊 Example Analysis

**Input:** `https://example.com`

**Output:**

| Metric                        | Value | Status |
| ----------------------------- | ----- | ------ |
| Total Images                  | 15    | -      |
| Images without Alt            | 3     | ❌     |
| Total Links                   | 42    | -      |
| Links without Accessibility   | 5     | ❌     |
| Total Buttons                 | 8     | -      |
| Buttons without Accessibility | 2     | ❌     |

## 🏗️ Project Structure

```
qa-web-analyzer/
│
├── 📁 src/                                    Backend TypeScript source code
│   ├── 📁 types/                              Type definitions
│   │   └── index.ts
│   ├── 📁 services/                           Business logic
│   │   └── analyzer.service.ts
│   ├── 📁 utils/                              Utilities
│   │   └── port-finder.util.ts
│   └── server.ts                              Express server
│
├── 📁 frontend/                                Vue 3 Frontend Application
│   ├── 📁 src/
│   │   ├── 📁 components/                     Vue components
│   │   │   ├── 📁 Header/                     Header with language & theme
│   │   │   │   ├── Header.vue
│   │   │   │   ├── LanguageToggle.vue
│   │   │   │   └── ThemeSelector.vue
│   │   │   ├── 📁 AnalysisForm/                Analysis form & options
│   │   │   │   ├── AnalysisForm.vue
│   │   │   │   └── OptionsPanel.vue
│   │   │   ├── 📁 Results/                     Results display (lazy loaded)
│   │   │   │   ├── Results.vue
│   │   │   │   └── ResultItem.vue
│   │   │   ├── ExportModal.vue                 PDF export modal
│   │   │   ├── NotificationAlert.vue
│   │   │   └── WcagInfoModal.vue               WCAG information modal
│   │   ├── 📁 stores/                          Pinia stores (state management)
│   │   │   ├── analysis.ts                     Analysis state management
│   │   │   ├── theme.ts                        Theme management
│   │   │   └── language.ts                     i18n management
│   │   ├── 📁 utils/                           Utility functions
│   │   │   ├── export.ts                       PDF export logic
│   │   │   ├── html.ts                         HTML utilities
│   │   │   └── themes.ts                       Theme utilities
│   │   ├── 📁 assets/                          Static assets (CSS imports)
│   │   │   └── main.css                        Main CSS entry point
│   │   ├── App.vue                             Root component
│   │   └── main.ts                             Application entry point
│   ├── 📁 public/                              Public assets (Vite static files)
│   │   └── favicon.svg                         Application favicon
│   ├── 📁 tests/                               Frontend unit tests
│   │   ├── 📁 stores/                          Store tests
│   │   └── 📁 utils/                           Utility tests
│   ├── vite.config.ts                          Vite configuration
│   ├── vitest.config.ts                        Vitest test configuration
│   ├── tsconfig.json                           TypeScript config
│   └── package.json                            Frontend dependencies
│
├── 📁 public/                                  Shared public directory (served by Express)
│   ├── index.html                              Legacy HTML (fallback)
│   ├── 📁 css/                                 Modular CSS architecture (shared)
│   │   ├── variables.css                       CSS variables and theme colors
│   │   ├── base.css                            Base styles and reset
│   │   ├── layout.css                          Layout components
│   │   ├── components.css                      UI components (buttons, inputs)
│   │   ├── options.css                         Analysis options styles
│   │   ├── modal.css                           Modal styles
│   │   ├── results.css                         Results display styles
│   │   └── responsive.css                       Responsive design rules
│   ├── 📁 js/                                  Legacy JavaScript modules
│   │   ├── app.js                              Main application logic
│   │   ├── export.js                           PDF export functionality
│   │   ├── themes.js                           Theme management
│   │   └── i18n.js                             Internationalization
│   ├── 📁 assets/                              Vite build output (auto-generated)
│   └── favicon.svg                             Application favicon
│
├── 📁 dist/                                    Backend compiled JavaScript (auto-generated)
│   ├── server.js
│   ├── 📁 services/
│   ├── 📁 types/
│   └── 📁 utils/
│
├── 📁 tests/                                   Backend unit tests
│   ├── 📁 services/                             Service tests
│   └── 📁 utils/                                Utility tests
│
├── 📁 scripts/                                 Utility scripts
│   └── setup-and-run.js                        Automated setup and run script
│
├── package.json                                Backend dependencies and scripts
├── tsconfig.json                               Backend TypeScript config
├── vitest.config.ts                            Backend test configuration
├── .gitignore                                  Git ignore rules
├── .prettierrc.json                            Prettier configuration
├── .lintstagedrc.json                          lint-staged configuration
├── .env.example                                Environment variables template
├── start.bat                                   Windows startup script
├── start.sh                                    Unix startup script
├── start.js                                    Legacy startup script
├── README.md                                   This file
└── README.es.md                                Spanish README
```

## 🛠️ Technologies Used

### Backend

- **[Node.js](https://nodejs.org/docs)** - Runtime environment
- **[Express](https://expressjs.com/)** - Web framework
- **[TypeScript](https://www.typescriptlang.org/docs/)** - Type-safe JavaScript
- **[Playwright](https://playwright.dev/docs/intro)** - Browser automation for analysis

### Frontend

- **[Vue 3](https://vuejs.org/)** - Progressive JavaScript framework with Composition API
- **[TypeScript](https://www.typescriptlang.org/docs/)** - Type-safe frontend code
- **[Vite](https://vitejs.dev/)** - Next-generation build tool with HMR
- **[Pinia](https://pinia.vuejs.org/)** - State management for Vue
- **[HTML5](https://developer.mozilla.org/en-US/docs/Web/HTML)** - Structure
- **[CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS)** - Modular styling with CSS variables, neomorphism, and responsive design
- **Lazy Loading** - Code splitting and async component loading
- **[jsPDF](https://github.com/parallax/jsPDF)** - PDF generation with custom table rendering (lazy loaded)
- **Export Modal** - Vue component with theme adaptation (Design 10: Dark Mode Style)

## 🎯 Recent Improvements

### ✨ Enhanced Features

- **🔄 Automatic Port Detection**: Backend and frontend automatically find and connect to available ports
- **🔍 Smart Backend Detection**: Frontend automatically detects the correct backend port, even with multiple servers running
- **🛡️ Robust Error Handling**: Improved error messages with detailed debugging information
- **🎨 UI Improvements**:
  - Removed redundant spinner (emoji animation is sufficient)
  - **Collapsible Attribute Categories**: Categories can be expanded/collapsed with smooth animations
  - **Category Emojis**: Visual icons for each attribute category (🏷️ Labels, 🔄 States, 🔗 Relationships, 📢 Live Regions, 📝 Form, ⚙️ Other)
  - **Persistent Checkbox Highlight**: Selected checkboxes maintain visual highlight (blue color and bold text)
  - **Improved Layout**: Single-column layout for attribute categories for better organization
  - **Auto-Expand on Select All**: All categories automatically expand when "Select All" is clicked
  - **Default Expanded State**: All categories are expanded by default on app load/reload
  - **Discrete Show More Button**: Simplified "Show More/Less" button with cleaner design (no numbers in parentheses)
  - **WCAG Modal Translations**: Complete Spanish translation for all WCAG information modal content, including titles, descriptions, and notes
  - **Category Headers Translations**: Attribute category headers (ARIA Labels & Names, ARIA States, Form Attributes, etc.) are fully translated to Spanish, while technical attribute names (aria-label, aria-checked, etc.) remain in English per accessibility standards
- **📸 Screenshot Optimization**: Only captures screenshots of visible elements, preventing timeouts
- **📝 Code Attribution**: All source files include author attribution comments
- **🚀 Production Builds**: Disabled for local development (can be re-enabled when needed)

### 🔧 Technical Enhancements

- **Proxy Intelligence**: Vite proxy automatically detects backend port
- **Multi-Server Support**: Works seamlessly with other servers on common ports
- **Error Recovery**: Better error messages help identify and fix issues quickly
- **Development Focus**: Optimized for local development workflow
- **Screenshot Handling**: Improved error handling for non-visible elements (skips instead of timing out)
- **Category Toggle**: Fixed expand/collapse functionality for attribute categories

## 📝 Available Scripts

### Backend Scripts

| Command             | Description                                    |
| ------------------- | ---------------------------------------------- |
| `pnpm install`      | 📦 Install backend dependencies                |
| `pnpm _build`       | 🔨 Compile TypeScript to JavaScript (disabled) |
| `pnpm start`        | ▶️ Start production server                     |
| `pnpm start:all`    | 🚀 **Start backend + frontend** ⭐             |
| `pnpm dev`          | 🔄 Start with auto-reload                      |
| `pnpm dev:all`      | 🔄 Start backend + frontend (watch)            |
| `pnpm type-check`   | ✅ Check types without compiling               |
| `pnpm format`       | 🎨 Format all files with Prettier              |
| `pnpm format:check` | 🔍 Check code formatting                       |
| `pnpm lint`         | ✅ Check formatting and types                  |

> 💡 **Note**: Production build scripts are disabled (`_build`, `_build:backend`, `_build:frontend`) for local development. They can be re-enabled by removing the `_` prefix when needed.

### Frontend Scripts

| Command                          | Description                      |
| -------------------------------- | -------------------------------- |
| `cd frontend && npm install`     | 📦 Install frontend dependencies |
| `cd frontend && npm run dev`     | 🚀 **Start Vite dev server** ⭐  |
| `cd frontend && npm run build`   | 🔨 Build for production          |
| `cd frontend && npm run preview` | 👀 Preview production build      |

### Testing Scripts

| Command                                | Description                              |
| -------------------------------------- | ---------------------------------------- |
| `npm test`                             | 🧪 Run all backend tests                 |
| `npm run test:watch`                   | 👀 Run backend tests in watch mode       |
| `npm run test:ui`                      | 🎨 Run backend tests with UI             |
| `npm run test:coverage`                | 📊 Generate backend test coverage report |
| `cd frontend && npm test`              | 🧪 Run all frontend tests                |
| `cd frontend && npm run test:watch`    | 👀 Run frontend tests in watch mode      |
| `cd frontend && npm run test:ui`       | 🎨 Run frontend tests with UI            |
| `cd frontend && npm run test:coverage` | 📊 Generate frontend test coverage       |

## 🎨 Features in Detail

### 🔍 Accessibility Checks

The tool verifies compliance with **WCAG 2.2 AA standards**:

| Element        | Checks                                                                                                                            |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| 🖼️ **Images**  | `alt` attribute (preferred), `aria-label`, or `aria-labelledby` (WCAG 2.2 AA). If `alt` is present, `aria-label` is not required. |
| 🔗 **Links**   | `aria-label`, `aria-labelledby`, `title`, text content, `href` validation (only if `href` checkbox is selected)                   |
| 🔘 **Buttons** | `aria-label`, `aria-labelledby`, `aria-describedby`, text                                                                         |
| 📝 **Inputs**  | `aria-label`, `aria-labelledby`, `<label>`, `aria-required`                                                                       |
| 🎭 **Roles**   | `aria-label`, `aria-labelledby` for custom roles                                                                                  |
| 🎯 **All**     | Focus states, `tabindex` anti-patterns, `lang` attribute                                                                          |

### 📊 Report Features

- ✅ **Summary Cards**: Quick overview with color-coded status
- 📸 **Screenshots**: Visual highlighting of problematic elements
- 💻 **HTML Code**: Expandable code snippets for each element
- 🔍 **Smart Filters**: Show only missing or present attributes
- 📄 **PDF Export**: Professional reports with customizable selection modal
  - Select which elements to include (Images, Links, Buttons, Inputs, Roles)
  - Choose status types (Passed, Failed)
  - Additional options (Summary, Screenshots, HTML code)
  - Pre-selected based on your analysis options
  - Table design: Highlight Rows with Icon Badges (Design 12 + Design 13)
  - **Smart Ordering**: Passed elements shown first, then Failed elements
- 🎨 **15+ Themes**: Light, Dark, Flat, Material, Glassmorphism, Cyberpunk, Minimal, Ocean, Sunset, Forest, Monochrome, High Contrast, Rose, Amber, Teal
- 🌍 **i18n**: English and Spanish support
- 📱 **Responsive**: Fully optimized for mobile, tablet, and desktop

### 🎨 Visual Themes

The application includes 15+ carefully designed themes:

- **Light Mode** - Clean and bright
- **Dark Mode** - Easy on the eyes
- **Flat Design** - Minimal shadows, modern look
- **Material Design** - Google's Material Design principles
- **Glassmorphism** - Frosted glass effect
- **Cyberpunk** - Futuristic neon aesthetic
- **Minimal** - Ultra-clean interface
- **Ocean** - Blue ocean theme
- **Sunset** - Warm orange/pink tones
- **Forest** - Natural green theme
- **Monochrome** - Black and white
- **High Contrast** - Accessibility-focused
- **Rose** - Soft pink theme
- **Amber** - Golden yellow theme
- **Teal** - Cyan/teal color scheme

### 📱 Responsive Design

The application is fully responsive with mobile-first approach:

- **Smartphones** (up to 480px): Optimized vertical layout
- **Smartphones Landscape** (481px - 767px): Horizontal optimization
- **Tablets** (768px - 1024px): Balanced layout
- **Tablets Landscape** (1025px - 1279px): Enhanced spacing
- **Desktop** (1280px+): Full-featured layout

Features:

- Touch-friendly targets (44x44px minimum)
- Optimized typography scaling
- Flexible grid layouts
- Responsive modal dialogs
- Smooth scrolling on mobile

## 🌐 Language Support

Switch languages using the language selector in the UI:

- 🇺🇸 **English** (default)
- 🇪🇸 **Español** - [Ver README en Español](./README.es.md)

## ⚙️ Configuration

### Environment Variables

- Location (root): `qa-web-analyzer/.env` (same level as `package.json`, `src/`, `frontend/`, `.env.example`)
- Optional frontend overrides: `qa-web-analyzer/frontend/.env` (if you need frontend-specific values)

Create your `.env` from the template:

- Windows (cmd):

  ```bash
  copy .env.example .env
  ```

- PowerShell:

  ```bash
  Copy-Item .env.example .env
  ```

- macOS/Linux:

  ```bash
  cp .env.example .env
  ```

## 🧪 Testing

The project includes comprehensive unit tests for both backend and frontend code.

### Test Structure

- **Backend Tests** (`tests/`): Unit tests for services and utilities
  - `services/analyzer.service.test.ts` - Analyzer service tests
  - `utils/port-finder.test.ts` - Port finder utility tests
- **Frontend Tests** (`frontend/tests/`): Unit tests for Vue components and stores
  - `stores/analysis.test.ts` - Analysis store tests
  - `stores/language.test.ts` - Language/i18n store tests
  - `stores/theme.test.ts` - Theme store tests
  - `components/OptionsPanel.test.ts` - OptionsPanel component tests (category expansion, select all, etc.)
  - `utils/html.test.ts` - HTML utility tests
  - `utils/export.test.ts` - PDF export utility tests

### Running Tests

**Backend:**

```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:ui       # UI mode
npm run test:coverage # Coverage report
```

**Frontend:**

```bash
cd frontend
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:ui       # UI mode
npm run test:coverage # Coverage report
```

### Test Coverage

Tests cover:

- ✅ Utility functions (port-finder, html)
- ✅ Service methods (analyzer.service)
- ✅ Pinia stores (analysis, language, theme)
- ✅ Export utilities

See [tests/README.md](./tests/README.md) and [frontend/tests/README.md](./frontend/tests/README.md) for more details.

### WCAG 2.2 AA Compliance Features

The analyzer follows WCAG 2.2 AA standards strictly:

- **Images**: Must have alternative text via `alt` (preferred), `aria-label`, or `aria-labelledby`. If `alt` is present, `aria-label` is not required.
- **Links**: `href` validation is optional and only performed if the `href` checkbox is selected in "Attributes to Check".
- **Smart Validation**: Attributes are only validated if explicitly selected, preventing false negatives.
- **PDF Reports**: Elements are ordered with "Passed" items first, followed by "Failed" items for better readability.

## 📋 Prerequisites

### System Requirements

- **Node.js** v18 or higher ([Download](https://nodejs.org/))
  - Includes **npm** automatically (no need to install separately)
  - **pnpm** is optional (the script will use npm if pnpm is not available)

### Supported Operating Systems

✅ **Windows** (10/11)  
✅ **macOS** (10.15+)  
✅ **Linux** (Ubuntu 18.04+, Debian 10+, Fedora 30+, etc.)

### Quick Installation

1. **Install Node.js** (if not already installed):
   - Download from [nodejs.org](https://nodejs.org/)
   - Verify: `node --version` (should be v18+)

2. **Clone and run**:

   ```bash
   git clone https://github.com/RaffyRod/QA-web-analyzer.git
   cd QA-web-analyzer/qa-web-analyzer
   npm run setup
   ```

   That's it! The script will automatically:
   - Install all dependencies (backend + frontend)
   - Build the project
   - Start both servers

> 💡 **Note**: The project is fully portable and automatic. No manual configuration needed - just clone and run!

## ⚙️ Configuration

> ⚠️ **IMPORTANT**: No configuration needed! The application works out of the box with automatic port detection. The `.env` file is **completely optional** and only needed if you want to customize default behavior.

### Environment Variables (Optional)

The `.env` file is **optional**. The application works without it using default settings and automatic port detection.

**Location**: `qa-web-analyzer/.env` (same level as `package.json`)

Copy `.env.example` to `.env` if you want to customize settings:

**Windows (cmd)**:

```bash
copy .env.example .env
```

**PowerShell**:

```bash
Copy-Item .env.example .env
```

**macOS/Linux**:

```bash
cp .env.example .env
```

Available environment variables:

- `PORT` - Backend server port (optional, auto-detects if not set)
- `NODE_ENV` - Environment mode (development/production)
- `VITE_PORT` - Frontend dev server port (default: 5173, auto-finds alternative if occupied)
- `VITE_API_URL` - Backend API URL (optional, auto-detects if not set)
- `PLAYWRIGHT_BROWSER` - Browser for Playwright (chromium/firefox/webkit)
- `PLAYWRIGHT_HEADLESS` - Run browser in headless mode (true/false)
- `ANALYSIS_TIMEOUT` - Analysis timeout in milliseconds (default: 30000)

### 🔄 Port Management System

**Backend Port Detection:**

- Automatically finds available ports in priority order: **4000 → 4001 → 4002 → 4003 → 4004 → 4005 → 5000 → 5001 → 5002 → 5003 → 5004 → 5005 → any available**
- Uses ports rarely used by common frameworks (React, Next.js typically use 3000-3999)
- Skips occupied ports and uses the next available one
- Works seamlessly even if you have other servers running on those ports

**Frontend Port Detection:**

- Automatically detects which port the backend is using
- Tests common ports and verifies it's the correct backend (not another server)
- Falls back to proxy if auto-detection fails

**Multi-Server Support:**

- ✅ Works with other servers on common ports (Next.js, React, etc.)
- ✅ No conflicts - each server uses its own port independently
- ✅ Automatic detection ensures correct connection

**Manual Configuration:**
If you need to specify a custom port, set:

```bash
VITE_API_URL=http://localhost:PORT
```

## 🔧 Development

### Development Mode

```bash
pnpm dev
```

Starts server with auto-reload on file changes.

### Type Checking

```bash
pnpm type-check
```

Validates TypeScript without compiling.

### Code Formatting

```bash
# Format all files
pnpm format

# Check formatting without modifying files
pnpm format:check
```

### Code Quality Tools

This project uses automated code quality tools:

- **Prettier** - Code formatter for consistent style
- **lint-staged** - Run linters on staged files
- **Husky** - Git hooks for pre-commit checks

#### Pre-commit Hook

Before each commit, the following checks run automatically:

- ✅ Code formatting with Prettier
- ✅ TypeScript type checking

This ensures code quality and consistency. If checks fail, the commit is blocked.

## 🎯 Best Practices & Project Structure

This project follows industry best practices:

### Code Organization

- ✅ **TypeScript Strict Mode** - Fully typed codebase (backend + frontend)
- ✅ **Component-Based Architecture** - Vue 3 components with Composition API
- ✅ **State Management** - Pinia stores for centralized state
- ✅ **Lazy Loading** - Code splitting and async component loading
- ✅ **Clean Code** - Separation of concerns
- ✅ **SOLID Principles** - Single responsibility, modular design
- ✅ **Accessibility First** - Tool itself is accessible
- ✅ **Error Handling** - Robust error management
- ✅ **Modular CSS** - Organized by functionality (variables, base, components, layout, etc.)
- ✅ **Separation of Concerns** - Backend (TypeScript/Express) and Frontend (Vue 3/Vite) clearly separated

### Directory Structure Best Practices

- **`src/`** - Backend source code (TypeScript)
- **`frontend/src/`** - Frontend source code (Vue 3 + TypeScript)
- **`public/`** - Shared static assets (CSS, legacy JS, build output)
- **`dist/`** - Backend compiled output (auto-generated)
- **`tests/`** - Backend unit tests
- **`frontend/tests/`** - Frontend unit tests
- **`frontend/public/`** - Vite static assets (favicon only, CSS removed to avoid duplication)

### File Naming Conventions

- **Components**: PascalCase (e.g., `Header.vue`, `AnalysisForm.vue`)
- **Stores**: camelCase (e.g., `analysis.ts`, `theme.ts`)
- **Utilities**: camelCase (e.g., `export.ts`, `html.ts`)
- **Tests**: `*.test.ts` suffix
- **Config files**: kebab-case (e.g., `vite.config.ts`, `tsconfig.json`)

### Build & Deployment

- **Backend**: TypeScript compiled to `dist/` directory
- **Frontend**: Vite builds to `public/` directory (shared with legacy files)
- **Assets**: Vite generates optimized chunks in `public/assets/` (gitignored)
- **CSS**: Shared between legacy and Vue app from `public/css/`

## 🆕 Vue 3 Migration

The frontend has been fully migrated to **Vue 3 + Vite + TypeScript** for:

- ⚡ **Better Performance** - Smaller bundle size (~23% reduction)
- 🔄 **Lazy Loading** - Components loaded on demand
- 🎯 **Type Safety** - Full TypeScript support
- 🛠️ **Developer Experience** - Hot Module Replacement (HMR)
- 📦 **Code Splitting** - Automatic chunk optimization
- 🎨 **Modern Architecture** - Component-based with Pinia stores
- 🎛️ **Export Modal** - Theme-adaptive modal with pre-selected options
- 📄 **PDF Export** - Professional reports with customizable table design

### Migration Status

- ✅ **Project structure created** - Vue 3 + Vite + TypeScript setup
- ✅ **Core components migrated** - Header, LanguageToggle, ThemeSelector
- ✅ **Analysis form and options panel** - Full functionality with Vue components
- ✅ **Results component** - Complete results display with lazy loading
- ✅ **State management** - Pinia stores for analysis, theme, and language
- ✅ **TypeScript configuration** - Full type safety across frontend
- ✅ **Build system** - Vite with HMR and code splitting
- ✅ **PDF Export** - Complete export functionality with modal selection
- ✅ **Export Modal** - Design 10: Dark Mode Style, adapts to current theme
- ✅ **PDF Table Design** - Design 12: Highlight Rows + Design 13: Icon Badges
- ✅ **Internationalization** - Multi-language ready (English/Spanish)
- ✅ **Code Formatting** - Prettier for consistent style
- ✅ **Pre-commit Hooks** - Automated quality checks with Husky
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Modular Architecture** - CSS and JS organized by functionality
- ✅ **Feature Complete** - All functionality migrated and working

## 📄 License

ISC

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Follow TypeScript best practices
4. Keep code clean and documented
5. Submit a pull request

## 📞 Support

For issues or questions, please open an issue on GitHub.

## 📜 Credits & Attribution

**Author**: [RaffyRod](https://github.com/RaffyRod)

This project was developed and maintained by **Raffy Rodriguez** (2025).

**Code Attribution:**

- All source files include author attribution comments (`@author RaffyRod`)
- Attribution is present in TypeScript, JavaScript, Vue, and CSS files
- Only project-owned files include attribution (not third-party libraries)

### Acknowledgments

This project uses the following open-source libraries and tools:

- **Playwright** - Browser automation and testing
- **Express** - Web framework for Node.js
- **TypeScript** - Type-safe JavaScript
- **jsPDF** - PDF generation library
- **Prettier** - Code formatter
- **Husky** - Git hooks
- **lint-staged** - Run linters on staged files

For a complete list of dependencies, see `package.json`.

Built with modern web technologies and best practices, following WCAG 2.2 AA accessibility standards.

---

**Made with ❤️ for better web accessibility**

[⬆ Back to top](#-qa-web-analyzer)
