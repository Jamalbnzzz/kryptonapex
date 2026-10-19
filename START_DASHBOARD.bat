@echo off
title ZenScout APEX Local Trading Dashboard
color 0B
cls
echo ============================================================
echo   ZenScout APEX Localhost Trading Terminal
echo   100%% Private Local Execution (http://localhost:3000)
echo ============================================================
echo.

IF NOT EXIST node_modules (
    echo [INFO] Installing required dependencies...
    call npm install
    echo.
)

echo [STARTING] Launching Local Terminal Server...
start "" http://localhost:3000
node server.js
pause
