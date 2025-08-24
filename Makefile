# Saprism Development Makefile

.PHONY: help dev-setup dev-cleanup dev-services dev-services-stop dev-services-logs dev build start install db-push test test-watch test-coverage test-unit test-integration test-e2e

# Default target
help:
        @echo "Saprism Development Commands:"
        @echo ""
        @echo "Local Development:"
        @echo "  make dev-setup      - Set up complete local development environment"
        @echo "  make dev-cleanup    - Clean up development environment"
        @echo "  make dev-services   - Start Docker services (PostgreSQL, Redis, etc.)"
        @echo "  make dev-services-stop - Stop Docker services"
        @echo "  make dev-services-logs - View Docker service logs"
        @echo ""
        @echo "Application:"
        @echo "  make install        - Install npm dependencies"
        @echo "  make dev            - Start development server"
        @echo "  make build          - Build for production"
        @echo "  make start          - Start production server"
        @echo "  make db-push        - Push database schema changes"
        @echo ""
        @echo "Testing:"
        @echo "  make test           - Run all tests"
        @echo "  make test-watch     - Run tests in watch mode"
        @echo "  make test-coverage  - Run tests with coverage report"
        @echo "  make test-unit      - Run unit tests only"
        @echo "  make test-integration - Run integration tests only"
        @echo "  make test-e2e       - Run end-to-end tests only"
        @echo ""
        @echo "Quick Start:"
        @echo "  make dev-setup && make install && make db-push && make dev"

# Local development setup
dev-setup:
        @echo "🚀 Setting up Saprism local development environment..."
        cd .dev && ./scripts/setup.sh

dev-cleanup:
        @echo "🧹 Cleaning up development environment..."
        cd .dev && ./scripts/cleanup.sh

# Docker services management
dev-services:
        @echo "📋 Starting Docker services..."
        cd .dev && docker-compose up -d

dev-services-stop:
        @echo "⏹️ Stopping Docker services..."
        cd .dev && docker-compose down

dev-services-logs:
        @echo "📊 Viewing Docker service logs..."
        cd .dev && docker-compose logs -f

# Application commands
install:
        @echo "📦 Installing dependencies..."
        npm install

dev:
        @echo "🚀 Starting development server..."
        NODE_ENV=development npm run dev

build:
        @echo "🏗️ Building for production..."
        npm run build

start:
        @echo "▶️ Starting production server..."
        NODE_ENV=production npm run start

db-push:
        @echo "📊 Pushing database schema..."
        npx prisma db push

# Testing commands
test:
        @echo "🧪 Running all tests..."
        npm run test

test-watch:
        @echo "👀 Running tests in watch mode..."
        npm run test:watch

test-coverage:
        @echo "📊 Running tests with coverage..."
        npm run test:coverage

test-unit:
        @echo "🔬 Running unit tests..."
        npm run test:unit

test-integration:
        @echo "🔗 Running integration tests..."
        npm run test:integration

test-e2e:
        @echo "🌐 Running end-to-end tests..."
        npm run test:e2e

# Quick development workflow
quick-start: dev-setup install db-push
        @echo "🎉 Setup complete! Starting development server..."
        @echo "Access your app at: http://localhost:5000"
        @echo "Database UI at: http://localhost:8080"
        @echo "Redis UI at: http://localhost:8081"
        @echo "Email testing at: http://localhost:8025"
        $(MAKE) dev