#!/bin/bash

set -e

echo "========================================="
echo " Starting Task Manager "
echo "========================================="

echo "[1/2] Starting Backend (Laravel) at http://127.0.0.1:8000..."
cd backend
php artisan serve &
BACKEND_PID=$!
cd ..

echo "[2/2] Starting Frontend (Vite) at http://localhost:5173..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo "========================================="
echo " Both servers are running!"
echo " Press Ctrl+C to stop both servers."
echo "========================================="

trap "echo -e '\nShutting down servers...'; kill $BACKEND_PID $FRONTEND_PID; exit" SIGINT SIGTERM

wait