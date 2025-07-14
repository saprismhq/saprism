# SalesCoach AI - replit.md

## Overview

SalesCoach AI is a full-stack web application that provides AI-powered sales coaching and meeting management. The application features intelligent note-taking, real-time coaching suggestions, AI-driven deal stage analysis, and seamless CRM integration with Salesforce.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Build Tool**: Vite for fast development and optimized production builds
- **UI Framework**: Tailwind CSS with shadcn/ui components for consistent design
- **State Management**: TanStack Query (React Query) for server state management with caching and synchronization
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation for type-safe form management

### Backend Architecture
- **Framework**: Express.js with TypeScript for API development
- **Database**: PostgreSQL with Neon serverless driver for scalable cloud database
- **ORM**: Drizzle ORM for type-safe database operations and migrations
- **Authentication**: OpenID Connect with Replit authentication provider
- **Session Management**: Express sessions with PostgreSQL store for persistence
- **API Design**: RESTful endpoints with JSON responses and proper error handling

### Database Schema
The application uses PostgreSQL with these core tables:
- `sessions` - Session storage for authentication with automatic expiration
- `users` - User profiles linked to authentication system
- `meetings` - Meeting records with client information and status tracking
- `notes` - Meeting notes with AI analysis results stored as JSONB
- `coaching_suggestions` - AI-generated coaching recommendations with usage tracking
- `crm_sync_logs` - CRM synchronization audit logs for troubleshooting

## Key Components

### Authentication System
- **Provider**: OpenID Connect integration with Replit's authentication service
- **Session Management**: PostgreSQL-backed sessions with 7-day TTL for security
- **Authorization**: Route-level protection with middleware validation
- **User Management**: Automatic user creation and profile synchronization

### AI Integration
- **OpenAI Service**: GPT-4o integration for note analysis and coaching suggestions
- **Analysis Features**: Deal stage identification, pain point extraction, sentiment analysis
- **Coaching Engine**: Context-aware suggestions based on meeting content and deal stage
- **Response Format**: Structured JSON responses with confidence scoring

### CRM Integration
- **Salesforce Service**: jsforce library for Salesforce API integration
- **Authentication**: OAuth 2.0 with refresh token handling
- **Data Sync**: Meeting notes and analysis results sync to Salesforce records
- **Audit Logging**: Comprehensive sync logs for troubleshooting and compliance

### UI Components
- **Three-Panel Layout**: Sidebar for meetings, center for notes, right for coaching
- **Responsive Design**: Mobile-friendly with proper breakpoints
- **Component Library**: shadcn/ui components for consistency
- **Real-time Updates**: Query invalidation for live data synchronization

## Data Flow

1. **User Authentication**: OpenID Connect flow with session creation
2. **Meeting Management**: CRUD operations with real-time updates
3. **Note Taking**: Rich text input with auto-save functionality
4. **AI Analysis**: Real-time note analysis with debounced API calls
5. **Coaching Suggestions**: Context-aware recommendations based on analysis
6. **CRM Sync**: Automatic or manual synchronization with Salesforce

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection
- **drizzle-orm**: Type-safe database operations
- **openai**: GPT-4o integration for AI features
- **jsforce**: Salesforce API integration
- **passport**: Authentication middleware
- **express-session**: Session management
- **connect-pg-simple**: PostgreSQL session store

### UI Dependencies
- **@radix-ui/***: Accessible UI primitives
- **@tanstack/react-query**: Server state management
- **tailwindcss**: Utility-first CSS framework
- **wouter**: Lightweight routing
- **react-hook-form**: Form management
- **zod**: Schema validation

## Deployment Strategy

### Development Environment
- **Node.js**: ESM modules with TypeScript compilation
- **Vite Dev Server**: Hot module replacement for frontend
- **tsx**: TypeScript execution for backend development
- **Database**: Neon PostgreSQL with connection pooling

### Production Build
- **Frontend**: Vite build with optimized bundle
- **Backend**: esbuild compilation to ESM format
- **Database**: Drizzle migrations with schema sync
- **Environment**: Production-ready with proper error handling

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string
- `OPENAI_API_KEY`: OpenAI API authentication
- `SALESFORCE_*`: Salesforce API credentials
- `SESSION_SECRET`: Session encryption key
- `REPLIT_DOMAINS`: Allowed domains for OIDC

### Security Considerations
- **Session Security**: HttpOnly cookies with secure flags
- **CORS**: Proper origin validation
- **API Rate Limiting**: Implicit through OpenAI and Salesforce limits
- **Input Validation**: Zod schemas for all API endpoints
- **SQL Injection Prevention**: Parameterized queries through Drizzle ORM