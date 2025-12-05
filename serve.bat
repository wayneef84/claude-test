@echo off
REM Simple HTTP server for Whiteout Survival Command Center
REM This script starts a local web server to preview the application

SET PORT=8000

echo ================================================================
echo   WHITEOUT SURVIVAL - COMMAND CENTER
echo   Local Development Server
echo ================================================================
echo.
echo Starting server on port %PORT%...
echo.
echo Open your browser and navigate to:
echo.
echo    http://localhost:%PORT%
echo    http://127.0.0.1:%PORT%
echo.
echo Available pages:
echo    - Homepage:      http://localhost:%PORT%/index.html
echo    - Troops Logger: http://localhost:%PORT%/logger.html
echo.
echo Press Ctrl+C to stop the server
echo.
echo ================================================================
echo.

python -m http.server %PORT%

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Error: Python is not installed or not in PATH
    echo Please install Python to run the development server
    pause
)
