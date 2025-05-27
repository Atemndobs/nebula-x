#!/bin/bash

# Exit on error
set -e

echo "🚀 Setting up test environment..."

# Create necessary directories
echo "📂 Creating test directories..."
mkdir -p test-results/screenshots test-results/traces test-results/html-report

# Copy environment file if it doesn't exist
if [ ! -f .env.test ]; then
    echo "📄 Creating .env.test from example..."
    cp .env.test.example .env.test
    echo "⚠️  Please update .env.test with your test credentials"
else
    echo "✅ .env.test already exists"
fi

# Install Playwright browsers if not already installed
if [ ! -d "node_modules/playwright" ]; then
    echo "📦 Installing Playwright browsers..."
    npx playwright install --with-deps
else
    echo "✅ Playwright is already installed"
fi

# Set permissions for test results
echo "🔒 Setting permissions..."
chmod -R 777 test-results

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

echo "✨ Test environment setup complete!"
echo "To run tests, use: npx playwright test"
echo "For UI mode: npx playwright test --ui"
