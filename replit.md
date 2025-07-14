# SalesCoach AI - Replit Application Guide

## Overview

SalesCoach AI is a full-stack web application that provides AI-powered sales coaching and meeting management. The application features intelligent note-taking, real-time coaching suggestions, AI-driven meeting analysis, and CRM integration capabilities. It's built with a modern tech stack including React, Express.js, PostgreSQL, and integrates with OpenAI and Salesforce APIs.

## User Preferences

Preferred communication style: Simple, everyday language.
UX/UI Preferences: Clean, uncluttered interface with proper spacing and clear navigation.
Development Preferences: Don't route to home page by default during local development for testing core features.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Build Tool**: Vite for development and production builds
- **UI Framework**: Tailwind CSS with shadcn/ui components
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for client-side routing
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Neon serverless driver
- **ORM**: Drizzle ORM for database operations
- **Authentication**: Replit Auth with OpenID Connect
- **Session Management**: Express sessions with PostgreSQL store
- **API Design**: RESTful endpoints with JSON responses

### Database Schema
The application uses a PostgreSQL database with the following key tables:
- `users` - User profiles and authentication data
- `sessions` - Session storage for authentication
- `meetings` - Meeting records with client information
- `notes` - Meeting notes with AI analysis results
- `coaching_suggestions` - AI-generated coaching recommendations
- `crm_sync_logs` - CRM synchronization tracking

## Key Components

### Authentication System
- **Provider**: Replit Auth with OpenID Connect
- **Session Management**: PostgreSQL-backed sessions with 7-day TTL
- **Authorization**: Route-level protection with middleware
- **User Management**: Automatic user creation and profile management

### Meeting Management
- **Creation**: Simple meeting setup with client information
- **Note Taking**: Rich text note editing with auto-save
- **AI Analysis**: Real-time content analysis for deal insights
- **Status Tracking**: Meeting lifecycle management

### AI Integration
- **OpenAI Service**: GPT-4o for content analysis and coaching
- **Analysis Features**: Deal stage detection, sentiment analysis, pain point identification
- **Coaching Suggestions**: Context-aware recommendations for sales improvement
- **Confidence Scoring**: AI confidence metrics for reliability assessment

### CRM Integration
- **Salesforce**: Bidirectional sync with Salesforce CRM
- **Authentication**: OAuth 2.0 with refresh token support
- **Data Sync**: Meeting notes and analysis results
- **Sync Logging**: Track synchronization status and errors

### UI Components
- **Design System**: shadcn/ui components with Tailwind CSS
- **Layout**: Three-panel layout with sidebar, main notes area, and AI coaching panel
- **Responsive**: Clean, uncluttered interface with proper spacing
- **Interactive**: Real-time updates and loading states
- **UX Improvements**: Reduced visual clutter, improved spacing, cleaner navigation

## Data Flow

1. **User Authentication**: Users authenticate via Replit Auth, creating sessions in PostgreSQL
2. **Meeting Creation**: Users create meetings with client information stored in the database
3. **Note Taking**: Real-time note editing with periodic saves to the database
4. **AI Analysis**: Notes are analyzed by OpenAI API, results stored with meetings
5. **Coaching Generation**: AI generates contextual coaching suggestions based on meeting data
6. **CRM Sync**: Meeting data and analysis results sync to Salesforce CRM
7. **Real-time Updates**: UI updates reflect database changes via React Query

## External Dependencies

### Required Services
- **PostgreSQL Database**: Primary data storage (configured via DATABASE_URL)
- **OpenAI API**: AI analysis and coaching (requires OPENAI_API_KEY)
- **Salesforce CRM**: Optional CRM integration (requires SF_* environment variables)
- **Replit Auth**: Authentication service (requires REPLIT_DOMAINS and SESSION_SECRET)

### Environment Variables
- `DATABASE_URL` - PostgreSQL connection string
- `OPENAI_API_KEY` - OpenAI API authentication
- `SALESFORCE_*` or `SF_*` - Salesforce CRM credentials
- `REPLIT_DOMAINS` - Replit authentication domains
- `SESSION_SECRET` - Session encryption key

### NPM Packages
- Core: React, Express, TypeScript, Tailwind CSS
- Database: Drizzle ORM, Neon serverless driver
- AI: OpenAI SDK
- CRM: JSForce for Salesforce integration
- Auth: Passport.js with OpenID Connect strategy
- UI: Radix UI primitives, Lucide icons

## Deployment Strategy

### Development Environment
- **Server**: Node.js with tsx for TypeScript execution
- **Client**: Vite dev server with HMR
- **Database**: Drizzle migrations with push commands
- **Environment**: Local development with environment variables

### Production Build
- **Client**: Vite build to `dist/public`
- **Server**: ESBuild bundle to `dist/index.js`
- **Database**: Automated migrations via Drizzle
- **Assets**: Static file serving from build directory

### Deployment Requirements
- Node.js runtime environment
- PostgreSQL database instance
- Environment variables configured
- SSL/TLS certificates for HTTPS
- Domain configuration for authentication

The application is designed to be deployed on Replit with automatic environment provisioning, but can be adapted for other hosting platforms with minimal configuration changes.