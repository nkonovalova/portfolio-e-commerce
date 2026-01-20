#!/usr/bin/env bash
set -e

echo "Building frontend..."
cd frontend
npm install
npm run build

echo "Installing backend deps..."
cd ../backend
npm install
npm run api
