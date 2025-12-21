#!/bin/bash

# DSA Visualizer - Quick Setup Script
# This script will help you get started quickly!

echo "🎨 DSA Visualizer - Quick Setup"
echo "================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "Please install Node.js from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed!"
    exit 1
fi

echo "✅ npm version: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Dependencies installed successfully!"
    echo ""
    echo "🚀 Ready to start!"
    echo ""
    echo "Run: npm run dev"
    echo "Then open: http://localhost:3000"
    echo ""
    echo "📚 Documentation:"
    echo "  - Quick Start: docs/QUICK_START.md"
    echo "  - Setup Guide: docs/SETUP.md"
    echo "  - Main README: README.md"
    echo ""
    echo "Happy visualizing! 🎉"
else
    echo ""
    echo "❌ Installation failed!"
    echo "Please check the error messages above."
    echo ""
    echo "Common fixes:"
    echo "  1. Delete node_modules and try again"
    echo "  2. Run: npm cache clean --force"
    echo "  3. Check your internet connection"
fi
