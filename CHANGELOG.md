# Changelog

All notable changes to Salespring will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Complete rebrand from "SalesCoach AI" to "Salespring" with spring-inspired theme
- Custom SVG logo with spring coil design and leaf accents
- Fresh green color palette reflecting growth and new beginnings
- Growth-oriented content strategy with nurturing metaphors
- Comprehensive README.md documentation
- Professional CHANGELOG.md for version tracking

### Changed
- Updated theme colors to green-based scheme (hsl(142, 76%, 36%) primary, hsl(95, 60%, 88%) accent)
- Rebranded all UI components and pages with Salespring identity
- Updated landing page with spring-themed messaging
- Modified sidebar to use new logo component
- Reorganized documentation structure with separate README and CHANGELOG

### Fixed
- Database schema synchronization with Prisma to match actual database structure
- Removed non-existent columns from coaching_suggestions table
- Corrected column mappings in Prisma schema
- AI coaching suggestions validation error by making isUsed field optional in insert schema

## [1.0.0] - 2025-01-14

### Added
- Complete server architecture refactoring with SOLID principles
- Repository pattern implementation for all entities
- Service layer with clear business logic separation
- Dependency injection container system
- Controller pattern for HTTP request handling
- Dedicated authentication service

### Changed
- Migrated from Drizzle ORM to Prisma ORM
- Restructured server code into layers (repositories, services, controllers)
- Improved error handling and logging
- Enhanced type safety across the application

### Technical
- Applied Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion principles
- Maintained backward compatibility with existing authentication system
- Implemented comprehensive interfaces for all service layers
- Added proper dependency management through container pattern

## Initial Release

### Added
- AI-powered sales coaching platform
- Real-time note-taking with AI analysis
- OpenAI GPT-4o integration for insights
- Salesforce CRM synchronization
- Meeting management system
- User authentication with OpenID Connect
- Responsive three-panel UI layout
- PostgreSQL database with session management
- React frontend with TypeScript
- Express.js backend with TypeScript