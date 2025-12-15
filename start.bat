@echo off
echo 🚀 Starting QA Web Analyzer...
echo.

if not exist "node_modules" (
    echo 📦 Installing dependencies (first time setup)...
    call pnpm install
    if errorlevel 1 (
        echo ❌ Error installing dependencies
        exit /b 1
    )
    echo ✅ Dependencies installed successfully!
    echo.
) else (
    echo ✅ Dependencies already installed, skipping install step.
    echo.
)

echo 🔨 Building TypeScript project...
call pnpm build
if errorlevel 1 (
    echo ❌ Error building project
    exit /b 1
)
echo ✅ Build completed successfully!
echo.

if not exist "dist" (
    echo ❌ Build directory not found. Build may have failed.
    exit /b 1
)

echo 🎯 Starting server...
echo.
call pnpm start





