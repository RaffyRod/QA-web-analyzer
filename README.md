# 🔍 QA Web Analyzer

> **Professional accessibility analysis tool** for web pages. Built with TypeScript following best practices.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-45ba4b?style=flat&logo=playwright&logoColor=white)

## 🎯 What is this?

QA Web Analyzer is a **web-based tool** that analyzes web pages for **accessibility issues** according to **WCAG 2.2 AA standards**. It checks images, links, buttons, inputs, and ARIA elements to ensure they meet accessibility requirements.

### ✨ Key Features

- 🔎 **Comprehensive Analysis**: Check images, links, buttons, inputs, and ARIA roles
- 🎛️ **Configurable Options**: Select exactly what you want to analyze
- 📊 **Detailed Reports**: See HTML code, screenshots, and missing attributes
- 🎨 **15+ Visual Themes**: Light, Dark, Flat, Material, Glassmorphism, Cyberpunk, and more
- 📄 **Professional PDF Export**: Generate elegant PDF reports with neomorphism design
- 🌍 **Multi-language**: English and Spanish support
- 🎯 **Smart Filtering**: Filter by missing or present attributes
- 📸 **Visual Feedback**: Screenshots of problematic elements
- 📱 **Fully Responsive**: Optimized for smartphones, tablets, and desktop
- 🎭 **WCAG Information Modal**: Quick reference guide for accessibility standards

## 🚀 Quick Start

```bash
# 1. Install dependencies
pnpm install

# 2. Build TypeScript
pnpm build

# 3. Start server
pnpm start
```

### 📍 Access the Application

After starting, you'll see:

```
QA Web Analyzer server running on http://localhost:3000
```

Open that URL in your browser! 🌐

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

### 🎛️ Configuration Options

#### Elements to Check

- 🖼️ **Images**: Analyze `<img>` elements
- 🔗 **Links**: Analyze `<a>` elements
- 🔘 **Buttons**: Analyze `<button>` elements
- 📝 **Inputs**: Analyze `<input>`, `<textarea>`, `<select>`
- 🎭 **Roles**: Analyze elements with `role` attribute

#### Attributes to Check

- **Alt Text**: For images
- **aria-label**: Accessible name
- **aria-labelledby**: Reference to label
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
├── 📁 src/                    # TypeScript source code
│   ├── 📁 types/             # Type definitions
│   ├── 📁 services/          # Business logic
│   │   └── analyzer.service.ts
│   ├── 📁 utils/             # Utilities
│   │   └── port-finder.util.ts
│   └── server.ts             # Express server
│
├── 📁 public/                 # Frontend files
│   ├── index.html            # Main HTML
│   ├── favicon.svg           # Application icon
│   │
│   ├── 📁 css/               # Modular CSS architecture
│   │   ├── main.css          # Main stylesheet (imports all)
│   │   ├── variables.css     # CSS variables & reset
│   │   ├── base.css          # Base styles
│   │   ├── layout.css        # Layout components
│   │   ├── components.css    # UI components (buttons, inputs)
│   │   ├── options.css       # Options section styles
│   │   ├── modal.css         # WCAG info modal
│   │   ├── results.css       # Results & filters
│   │   └── responsive.css    # Responsive design (mobile-first)
│   │
│   └── 📁 js/                # JavaScript modules
│       ├── app.js            # Main application logic
│       ├── export.js         # PDF export functionality
│       ├── themes.js         # Theme management (15+ themes)
│       └── i18n.js           # Internationalization
│
├── 📁 dist/                  # Compiled JavaScript (auto-generated)
│
├── 📄 package.json           # Dependencies
├── 📄 tsconfig.json          # TypeScript config
├── 📄 .gitignore            # Git ignore rules
├── 📄 .prettierrc.json      # Prettier configuration
├── 📄 .lintstagedrc.json     # lint-staged configuration
├── 📄 README.md             # This file
└── 📄 README.es.md          # Spanish README
```

## 🛠️ Technologies Used

### Backend

- **Node.js** - Runtime environment
- **Express** - Web framework
- **TypeScript** - Type-safe JavaScript
- **Playwright** - Browser automation for analysis

### Frontend

- **HTML5** - Structure
- **CSS3** - Modular styling with CSS variables, neomorphism, and responsive design
- **JavaScript (ES6+)** - Interactivity
- **jsPDF** - PDF generation with custom table rendering

## 📝 Available Scripts

| Command             | Description                         |
| ------------------- | ----------------------------------- |
| `pnpm install`      | 📦 Install dependencies             |
| `pnpm build`        | 🔨 Compile TypeScript to JavaScript |
| `pnpm start`        | ▶️ Start production server          |
| `pnpm dev`          | 🔄 Start with auto-reload           |
| `pnpm type-check`   | ✅ Check types without compiling    |
| `pnpm format`       | 🎨 Format all files with Prettier   |
| `pnpm format:check` | 🔍 Check code formatting            |
| `pnpm lint`         | ✅ Check formatting and types       |

## 🎨 Features in Detail

### 🔍 Accessibility Checks

The tool verifies compliance with **WCAG 2.2 AA standards**:

| Element        | Checks                                                                    |
| -------------- | ------------------------------------------------------------------------- |
| 🖼️ **Images**  | `alt` attribute (missing/empty detection)                                 |
| 🔗 **Links**   | `aria-label`, `aria-labelledby`, `title`, text content, `href` validation |
| 🔘 **Buttons** | `aria-label`, `aria-labelledby`, `aria-describedby`, text                 |
| 📝 **Inputs**  | `aria-label`, `aria-labelledby`, `<label>`, `aria-required`               |
| 🎭 **Roles**   | `aria-label`, `aria-labelledby` for custom roles                          |
| 🎯 **All**     | Focus states, `tabindex` anti-patterns, `lang` attribute                  |

### 📊 Report Features

- ✅ **Summary Cards**: Quick overview with color-coded status
- 📸 **Screenshots**: Visual highlighting of problematic elements
- 💻 **HTML Code**: Expandable code snippets for each element
- 🔍 **Smart Filters**: Show only missing or present attributes
- 📄 **PDF Export**: Professional reports with neomorphism design, tables, and images
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

## 📋 Prerequisites

- **Node.js** v18 or higher
- **pnpm** package manager

Install pnpm:

```bash
npm install -g pnpm
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

## 🎯 Best Practices

This project follows:

- ✅ **TypeScript Strict Mode** - Fully typed codebase
- ✅ **Clean Code** - Separation of concerns
- ✅ **SOLID Principles** - Single responsibility, modular design
- ✅ **Accessibility First** - Tool itself is accessible
- ✅ **Error Handling** - Robust error management
- ✅ **Code Organization** - Scalable structure with modular CSS
- ✅ **Internationalization** - Multi-language ready
- ✅ **Code Formatting** - Prettier for consistent style
- ✅ **Pre-commit Hooks** - Automated quality checks with Husky
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Modular Architecture** - CSS and JS organized by functionality

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

This project was developed and maintained by **Raffy Rodriguez** (2025).

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
