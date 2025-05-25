#!/bin/bash

# Navigate to the docs-site directory
cd "$(dirname "$0")/../docs-site"

# Check if mintlify is installed
if ! command -v mintlify &> /dev/null; then
    echo "Mintlify CLI not found. Installing..."
    npm install -g @mintlify/cli
fi

# Start the Mintlify development server
echo "Starting Mintlify development server..."
mintlify dev

echo "Documentation is available at: http://localhost:3000"
