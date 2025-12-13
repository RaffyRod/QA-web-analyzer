# QA Web Analyzer

Professional web tool for analyzing web page accessibility, checking elements such as images, links, buttons, inputs, and ARIA role elements. Built with TypeScript following best development practices.

## 🎯 Features

- ✅ **Configurable Analysis**: Select which elements and attributes you want to analyze
- ✅ **Image Analysis**: Checks `alt` text attributes
- ✅ **Link Analysis**: Checks `aria-label`, `aria-labelledby`, `title`
- ✅ **Button Analysis**: Checks `aria-label`, `aria-labelledby`, `aria-describedby`
- ✅ **Input Analysis**: Checks `aria-label`, `aria-labelledby`, `<label>` elements
- ✅ **ARIA Role Analysis**: Checks elements with `role` attributes
- ✅ **Detailed Report**: Shows the HTML code of each analyzed element
- ✅ **Smart Filters**: Filter elements with or without accessibility attributes
- ✅ **Statistical Summary**: Overview of found issues
- ✅ **Export as Image**: Export the complete report as PNG image
- ✅ **Modern Interface**: Responsive and easy-to-use design
- ✅ **TypeScript**: Typed and maintainable code
- ✅ **Multi-language Support**: English and Spanish

## 📋 Prerequisites

- Node.js (v18 or higher)
- pnpm (package manager)

## 🚀 Quick Start

### One-Command Setup (Recommended)

Simply run the setup script. It will automatically:
- Install dependencies (only on first run)
- Build the TypeScript project
- Start the server

**Windows:**
```bash
start.bat
```

**Linux/Mac:**
```bash
chmod +x start.sh
./start.sh
```

**Or using npm/pnpm script:**
```bash
pnpm run
```

### Manual Setup

If you prefer to run commands manually:

1. Install dependencies using pnpm:

```bash
pnpm install
```

2. Build the TypeScript project:

```bash
pnpm build
```

3. Start the server:

```bash
pnpm start
```

### Development Mode

Start the server in development mode (with auto-reload):

```bash
pnpm dev
```

3. The server will automatically find an available port (starting from 3000). You'll see the assigned port in the console, for example:
   ```
   QA Web Analyzer server running on http://localhost:3000
   ```
   Open your browser at the URL shown in the console.

4. **Configure analysis options**: Select which elements and attributes you want to check:
   - **Elements to Check**: Images, Links, Buttons, Inputs, Elements with Role
   - **Attributes to Check**: Alt Text, aria-label, aria-labelledby, aria-describedby, labels, title

5. **Enter the URL** you want to analyze (can be localhost or any public URL)

6. Click **"Analyze"** and wait for the results

7. **Review the report**: 
   - Each element shows its complete HTML code
   - Elements with issues are marked with red badges
   - Use filters to show only elements with or without accessibility attributes

8. **Export the report**: 
   - Click the "📥 Export Report as Image" button at the top of the report
   - The report will be downloaded as a PNG image with a descriptive name that includes the analyzed URL and date

## 📊 Example URLs

- `http://localhost:3000`
- `http://localhost:8080`
- `https://example.com`
- `https://www.google.com`

## 🏗️ Project Structure

```
qa-web-analyzer/
├── src/
│   ├── types/           # TypeScript type definitions
│   ├── services/        # Business services
│   ├── utils/           # Utilities
│   └── server.ts         # Express server
├── public/              # Frontend static files
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── dist/                # Compiled code (generated)
├── package.json
├── tsconfig.json
└── README.md
```

## 🛠️ Technologies

- **Backend**:
  - Node.js
  - Express
  - TypeScript
  - Playwright (for page analysis)

- **Frontend**:
  - HTML5
  - CSS3 (with CSS variables)
  - JavaScript (ES6+)
  - html2canvas (for image export)

## 📝 Available Scripts

- `pnpm build` - Compiles the TypeScript project
- `pnpm start` - Starts the server in production mode
- `pnpm dev` - Starts the server in development mode with auto-reload
- `pnpm type-check` - Checks types without compiling

## 🎨 Best Practices Implemented

- ✅ **TypeScript Strict Mode**: Fully typed code
- ✅ **Clean Code**: Separation of concerns, small and descriptive functions
- ✅ **SOLID Principles**: Separated services, single responsibilities
- ✅ **Accessibility**: The tool itself follows good accessibility practices
- ✅ **Error Handling**: Robust error handling
- ✅ **Code Organization**: Modular and scalable structure
- ✅ **Internationalization**: Multi-language support

## 🔍 Accessibility Rules Verified

The tool verifies the following rules based on WCAG 2.1 and best practices:

- **Images**: All images must have a descriptive `alt` attribute
- **Links**: Links must have descriptive text or `aria-label`
- **Buttons**: Buttons must have visible text or `aria-label`
- **Inputs**: Inputs must have an associated `<label>` or `aria-label`
- **ARIA Roles**: Elements with `role` must have `aria-label` or `aria-labelledby`

## 🌐 Language Support

The application supports multiple languages. You can switch between English and Spanish using the language selector in the interface.

## 📄 License

ISC

## 🤝 Contributions

Contributions are welcome. Please make sure to follow TypeScript best practices and keep the code clean and well-documented.

---

## 📖 README en Español

[Ver README en Español](./README.es.md)
