#!/bin/bash

echo "🚀 Starting QA Web Analyzer..."
echo ""

if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies (first time setup)..."
    pnpm install
    if [ $? -ne 0 ]; then
        echo "❌ Error installing dependencies"
        exit 1
    fi
    echo "✅ Dependencies installed successfully!"
    echo ""
else
    echo "✅ Dependencies already installed, skipping install step."
    echo ""
fi

echo "🔨 Building TypeScript project..."
pnpm build
if [ $? -ne 0 ]; then
    echo "❌ Error building project"
    exit 1
fi
echo "✅ Build completed successfully!"
echo ""

if [ ! -d "dist" ]; then
    echo "❌ Build directory not found. Build may have failed."
    exit 1
fi

echo "🎯 Starting server..."
echo ""
pnpm start





