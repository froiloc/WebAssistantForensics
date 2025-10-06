#!/bin/bash

# WebAssistentForensics - Development Environment Setup & Test Runner
set -e # Exit immediately if a command fails

echo "🧪 Phoenix: Starting WebAssistentForensics development environment..."

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is not installed. Please install it first."
    exit 1
fi

# Install npm dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing npm dependencies..."
    npm install
else
    echo "✅ Dependencies already installed."
fi

# (Optional) Set up Git Hooks
echo "🔧 Setting up Git hooks..."
#npx -ddd --verbose --loglevel silly --yes --save-dev simple-git-hooks || true
npx --yes simple-git-hooks

# Run the test suite
echo "🚀 Running test suite..."
npm test

echo "✅ Phoenix: Development setup and test run complete!"
