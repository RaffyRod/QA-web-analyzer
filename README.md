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
- 🎨 **Beautiful UI**: Modern neomorphism design with theme support
- 📄 **PDF Export**: Generate professional PDF reports
- 🌍 **Multi-language**: English and Spanish support
- 🎯 **Smart Filtering**: Filter by missing or present attributes
- 📸 **Visual Feedback**: Screenshots of problematic elements

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

```
┌──────────────────────────────────────────┐
│  1. Enter URL to analyze                 │
│     (e.g., http://localhost:3000)        │
├──────────────────────────────────────────┤
│  2. Select Elements to Check             │
│     ☑ Images  ☑ Links  ☑ Buttons       │
├──────────────────────────────────────────┤
│  3. Select Attributes to Check           │
│     ☑ Alt Text  ☑ aria-label  etc.      │
├──────────────────────────────────────────┤
│  4. Click "Analyze" button               │
├──────────────────────────────────────────┤
│  5. Review the Report                    │
│     • Summary cards                      │
│     • Detailed element analysis          │
│     • Screenshots of issues              │
├──────────────────────────────────────────┤
│  6. Filter & Export                      │
│     • Filter by missing/present          │
│     • Export as PDF                      │
└──────────────────────────────────────────┘
```

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

## 📊 Example Analysis

```
Input: https://example.com

Output:
┌──────────────────────────────────────┐
│ 📊 Summary                          │
├──────────────────────────────────────┤
│ Total Images: 15                     │
│ Images without Alt: 3 ❌             │
│ Total Links: 42                       │
│ Links without Accessibility: 5 ❌    │
│ Total Buttons: 8                     │
│ Buttons without Accessibility: 2 ❌  │
└──────────────────────────────────────┘
```

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
│   ├── styles.css            # Styling
│   ├── app.js                # Main JavaScript
│   ├── i18n.js               # Translations
│   └── 📁 js/
│       ├── export.js         # PDF export
│       └── themes.js         # Theme management
│
├── 📁 dist/                  # Compiled JavaScript (auto-generated)
│
├── 📄 package.json           # Dependencies
├── 📄 tsconfig.json          # TypeScript config
├── 📄 .gitignore            # Git ignore rules
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
- **CSS3** - Styling (with CSS variables & neomorphism)
- **JavaScript (ES6+)** - Interactivity
- **jsPDF** - PDF generation

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm install` | 📦 Install dependencies |
| `pnpm build` | 🔨 Compile TypeScript to JavaScript |
| `pnpm start` | ▶️ Start production server |
| `pnpm dev` | 🔄 Start with auto-reload |
| `pnpm type-check` | ✅ Check types without compiling |

## 🎨 Features in Detail

### 🔍 Accessibility Checks

The tool verifies compliance with **WCAG 2.2 AA standards**:

| Element | Checks |
|---------|--------|
| 🖼️ **Images** | `alt` attribute (missing/empty detection) |
| 🔗 **Links** | `aria-label`, `aria-labelledby`, `title`, text content |
| 🔘 **Buttons** | `aria-label`, `aria-labelledby`, `aria-describedby`, text |
| 📝 **Inputs** | `aria-label`, `aria-labelledby`, `<label>`, `aria-required` |
| 🎭 **Roles** | `aria-label`, `aria-labelledby` for custom roles |
| 🎯 **All** | Focus states, `tabindex` anti-patterns, `lang` attribute |

### 📊 Report Features

- ✅ **Summary Cards**: Quick overview with color-coded status
- 📸 **Screenshots**: Visual highlighting of problematic elements
- 💻 **HTML Code**: Expandable code snippets for each element
- 🔍 **Smart Filters**: Show only missing or present attributes
- 📄 **PDF Export**: Professional reports with images and details
- 🎨 **Themes**: Light, Dark, Blue, Green, Purple modes
- 🌍 **i18n**: English and Spanish support

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

## 🎯 Best Practices

This project follows:

- ✅ **TypeScript Strict Mode** - Fully typed codebase
- ✅ **Clean Code** - Separation of concerns
- ✅ **SOLID Principles** - Single responsibility, modular design
- ✅ **Accessibility First** - Tool itself is accessible
- ✅ **Error Handling** - Robust error management
- ✅ **Code Organization** - Scalable structure
- ✅ **Internationalization** - Multi-language ready

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

---

**Made with ❤️ for better web accessibility**

[⬆ Back to top](#-qa-web-analyzer)
