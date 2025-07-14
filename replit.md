# SalesCoach AI - Replit Application Guide

## Overview

SalesCoach AI is a full-stack web application that provides AI-powered sales coaching and meeting management. The application features intelligent note-taking, real-time coaching suggestions, AI-driven analysis, and automatic CRM synchronization to help sales teams improve their performance and close more deals.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Build Tool**: Vite for fast development and optimized production builds
- **UI Framework**: Tailwind CSS with shadcn/ui components for consistent design
- **State Management**: TanStack Query (React Query) for efficient server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation for robust form management

### Backend Architecture
- **Framework**: Express.js with TypeScript for API development
- **Database**: PostgreSQL with Neon serverless driver for scalable data storage
- **ORM**: Drizzle ORM for type-safe database operations
- **Authentication**: Replit Auth with OpenID Connect for secure user management
- **Session Management**: Express sessions with PostgreSQL store for persistent authentication
- **API Design**: RESTful endpoints with JSON responses and proper error handling

### Database Schema
The application uses a PostgreSQL database with these core tables:
- `sessions` - Session storage for authentication with expiration handling
- `users` - User profiles with Replit Auth integration
- `meetings` - Meeting records with client information and status tracking
- `notes` - Meeting notes with AI analysis results and content
- `coaching_suggestions` - AI-generated coaching recommendations with usage tracking
- `crm_sync_logs` - CRM synchronization logs for audit trails

## Key Components

### Authentication System
- **Provider**: Replit Auth with OpenID Connect for secure authentication
- **Session Management**: PostgreSQL-backed sessions with 7-day TTL
- **Authorization**: Route-level protection with middleware validation
- **User Management**: Automatic user creation and profile management

### Meeting Management
- **Creation**: Simple meeting setup with client information capture
- **Note Taking**: Rich text note editing with auto-save functionality
- **AI Analysis**: Automatic analysis of meeting notes for insights
- **Status Tracking**: Meeting lifecycle management (active, completed, archived)

### AI Integration
- **OpenAI Service**: GPT-4o integration for note analysis and coaching
- **Analysis Features**: Deal stage identification, pain point extraction, sentiment analysis
- **Coaching Suggestions**: Context-aware recommendations based on meeting content
- **Confidence Scoring**: AI confidence metrics for analysis reliability

### CRM Integration
- **Salesforce Service**: jsforce library for Salesforce API integration
- **Authentication**: OAuth 2.0 flow with refresh token management
- **Data Sync**: Meeting notes and insights synchronization to CRM
- **Sync Logging**: Comprehensive audit trail for all CRM operations

## Data Flow

1. **User Authentication**: Users authenticate via Replit Auth, creating sessions in PostgreSQL
2. **Meeting Creation**: Users create meetings with client information stored in the database
3. **Note Taking**: Notes are captured and stored with auto-save functionality
4. **AI Analysis**: Notes are sent to OpenAI for analysis, results stored in the database
5. **Coaching Generation**: AI generates coaching suggestions based on analysis
6. **CRM Sync**: Meeting data and insights are synchronized to external CRM systems

## External Dependencies

### Required Services
- **OpenAI API**: For AI-powered note analysis and coaching suggestions
- **Salesforce CRM**: For customer relationship management integration
- **Neon Database**: PostgreSQL serverless database for data storage
- **Replit Auth**: Authentication service for user management

### Optional Integrations
- **Additional CRM Systems**: Extensible architecture for multiple CRM providers
- **Analytics Services**: Future integration for usage analytics and reporting

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with Express API server
- **Hot Reload**: Vite middleware integration for seamless development
- **Environment Variables**: Separate configuration for development and production

### Production Deployment
- **Build Process**: Vite builds frontend assets, esbuild bundles backend
- **Static Assets**: Frontend served from `/dist/public` directory
- **Database**: PostgreSQL with connection pooling via Neon
- **Environment**: Production-optimized builds with proper error handling

### Database Management
- **Migrations**: Drizzle migrations for schema management
- **Connection Pooling**: Neon serverless for automatic scaling
- **Session Storage**: PostgreSQL table for session persistence

The application is designed for scalability and maintainability, with clear separation of concerns between frontend, backend, and external services. The use of TypeScript throughout ensures type safety and better developer experience.