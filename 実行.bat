@echo off
setlocal

cd /d "%~dp0"

where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Error: Node.js is not installed.
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo Starting file rename process...
echo.
node exec.js

if %ERRORLEVEL% equ 0 (
    echo.
    echo Process completed successfully.
) else (
    echo.
    echo An error occurred.
)

pause