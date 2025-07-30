#!/bin/bash

# Salespring Local Development Setup Script

set -e

echo "🚀 Setting up Salespring local development environment..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Navigate to the .dev directory
cd "$(dirname "$0")/.."

echo "📋 Starting Docker services..."
docker-compose up -d

echo "⏳ Waiting for services to be ready..."
sleep 10

# Wait for PostgreSQL to be ready
echo "🔍 Checking PostgreSQL connection..."
until docker-compose exec -T postgres pg_isready -U salespring_user -d salespring; do
    echo "⏳ Waiting for PostgreSQL..."
    sleep 2
done

# Wait for Redis to be ready
echo "🔍 Checking Redis connection..."
until docker-compose exec -T redis redis-cli ping; do
    echo "⏳ Waiting for Redis..."
    sleep 2
done

echo "✅ All services are ready!"

# Copy environment file if it doesn't exist
if [ ! -f "../.env" ]; then
    echo "📝 Creating environment file..."
    cp .env.local ../.env
    echo "⚠️  Please edit .env with your actual API keys before running the application"
fi

echo "🎉 Setup complete! Next steps:"
echo "1. Edit .env with your API keys (especially OPENAI_API_KEY)"
echo "2. Run 'npm install' in the project root"
echo "3. Run 'npm run db:push' to set up the database schema"
echo "4. Run 'npm run dev' to start the development server"
echo ""
echo "🌐 Access points:"
echo "- Application: http://localhost:5000"
echo "- Database UI (Adminer): http://localhost:8080"
echo "- Redis UI: http://localhost:8081"
echo "- Email Testing (Mailhog): http://localhost:8025"