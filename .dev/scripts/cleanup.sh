#!/bin/bash

# Salespring Local Development Cleanup Script

set -e

echo "🧹 Cleaning up Salespring local development environment..."

# Navigate to the .dev directory
cd "$(dirname "$0")/.."

echo "⏹️  Stopping all services..."
docker-compose down

# Ask if user wants to remove volumes (data)
read -p "🗑️  Do you want to remove all data (volumes)? This will delete your local database! (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🗑️  Removing volumes and data..."
    docker-compose down -v
    echo "✅ All data removed!"
else
    echo "💾 Data preserved. Services stopped."
fi

# Ask if user wants to remove images
read -p "🗑️  Do you want to remove Docker images? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🗑️  Removing Docker images..."
    docker-compose down --rmi all
    echo "✅ Images removed!"
fi

echo "🎉 Cleanup complete!"