# SalesCoach AI

## Overview

SalesCoach AI is a full-stack web application that provides AI-powered sales coaching and meeting management. The application features intelligent note-taking, real-time coaching suggestions, AI-driven meeting analysis, and CRM integration capabilities. It's built with a modern tech stack including React, Express.js, PostgreSQL, and integrates with OpenAI and Salesforce APIs.

## Features

- **AI-Powered Note Taking**: Intelligent note-taking with real-time analysis
- **Contextual Coaching**: Get AI-generated coaching suggestions during meetings
- **Deal Stage Analysis**: Automatically identify deal stages and pain points
- **CRM Integration**: Seamless sync with Salesforce and other CRM platforms
- **Real-time Insights**: Live sentiment analysis and stakeholder identification
- **Clean Interface**: Uncluttered three-panel layout with proper spacing

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
- **Authentication**: OpenID Connect with session management
- **Session Management**: Express sessions with PostgreSQL store
- **API Design**: RESTful endpoints with JSON responses

### Database Schema
The application uses a PostgreSQL database with these core tables:
- `sessions` - Session storage for authentication with expiration handling
- `users` - User profiles with authentication integration
- `meetings` - Meeting records with client information and status tracking
- `notes` - Meeting notes with AI analysis results and content
- `coaching_suggestions` - AI-generated coaching recommendations with usage tracking
- `crm_sync_logs` - CRM synchronization logs for audit trails

## Key Components

### Authentication System
- **Provider**: OpenID Connect for secure authentication
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
- **Salesforce**: Bidirectional sync with Salesforce CRM
- **Authentication**: OAuth 2.0 with refresh token support
- **Data Sync**: Meeting notes and analysis results
- **Sync Logging**: Track synchronization status and errors

### UI Components
- **Design System**: shadcn/ui components with Tailwind CSS
- **Layout**: Three-panel layout with sidebar, main notes area, and AI coaching panel
- **Responsive**: Clean, uncluttered interface with proper spacing
- **Interactive**: Real-time updates and loading states

## Data Flow

1. **User Authentication**: Users authenticate via OpenID Connect, creating sessions in PostgreSQL
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

### Environment Variables
- `DATABASE_URL` - PostgreSQL connection string
- `OPENAI_API_KEY` - OpenAI API authentication
- `SALESFORCE_*` or `SF_*` - Salesforce CRM credentials
- `SESSION_SECRET` - Session encryption key

### NPM Packages
- Core: React, Express, TypeScript, Tailwind CSS
- Database: Drizzle ORM, Neon serverless driver
- AI: OpenAI SDK
- CRM: JSForce for Salesforce integration
- Auth: Passport.js with OpenID Connect strategy
- UI: Radix UI primitives, Lucide icons

## Development

### Getting Started
1. Install dependencies: `npm install`
2. Set up environment variables
3. Run database migrations: `npm run db:push`
4. Start development server: `npm run dev`

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

## Deployment

### Requirements
- Node.js runtime environment
- PostgreSQL database instance
- Environment variables configured
- SSL/TLS certificates for HTTPS
- Domain configuration for authentication

The application can be deployed on various hosting platforms with minimal configuration changes.