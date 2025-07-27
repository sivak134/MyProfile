@echo off
echo Starting DevOps Portfolio Website...
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% equ 0 (
    echo Node.js detected. Starting development server...
    npx http-server . -p 8000 -o
) else (
    echo Node.js not found. Opening directly in browser...
    echo Please install Node.js from https://nodejs.org for the best development experience.
    echo.
    start index.html
)

pause
