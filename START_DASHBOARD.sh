#!/usr/bin/env bash
# ============================================================
# ZenScout APEX Local Terminal — Linux/Mac Runner
# ============================================================

set -e
echo "============================================================"
echo "  ZenScout APEX Localhost Trading Terminal (Linux/Mac)"
echo "============================================================"

if [ ! -d "node_modules" ]; then
    echo "[INFO] Installing dependencies..."
    npm install
fi

echo "[STARTING] Launching Local Terminal Server..."
if which xdg-open > /dev/null; then
    xdg-open http://localhost:3000 &
elif which open > /dev/null; then
    open http://localhost:3000 &
fi

node server.js
