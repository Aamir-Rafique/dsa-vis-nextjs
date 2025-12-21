@echo off
REM DSA Visualizer - Quick Setup Script for Windows
REM This script will help you get started quickly!

echo.
echo 🎨 DSA Visualizer - Quick Setup
echo ================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed!
    echo Please install Node.js from: https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js version: %NODE_VERSION%
echo.

REM Check if npm is installed
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ npm is not installed!
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo ✅ npm version: %NPM_VERSION%
echo.

REM Install dependencies
echo 📦 Installing dependencies...
echo This may take a few minutes...
echo.

call npm install

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ Dependencies installed successfully!
    echo.
    echo 🚀 Ready to start!
    echo.
    echo Run: npm run dev
    echo Then open: http://localhost:3000
    echo.
    echo 📚 Documentation:
    echo   - Quick Start: docs\QUICK_START.md
    echo   - Setup Guide: docs\SETUP.md
    echo   - Main README: README.md
    echo.
    echo Happy visualizing! 🎉
    echo.
) else (
    echo.
    echo ❌ Installation failed!
    echo Please check the error messages above.
    echo.
    echo Common fixes:
    echo   1. Run PowerShell as Administrator
    echo   2. Delete node_modules folder and try again
    echo   3. Run: npm cache clean --force
    echo   4. Check your internet connection
    echo.
)

pause
