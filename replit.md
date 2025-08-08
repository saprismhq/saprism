# Salespring - AI-Powered Sales Coaching Platform

## Overview

Salespring is a full-stack web application that provides AI-powered sales coaching and meeting management. The application features intelligent note-taking, real-time coaching suggestions, AI-driven analysis, and CRM integration to help sales professionals improve their performance and close more deals.

## User Preferences

Preferred communication style: Simple, everyday language.
Branding preference: Use "Growth Guide" instead of "AI Coach" for coaching features to align with spring/growth theme.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Build Tool**: Vite for fast development and optimized production builds
- **UI Framework**: Tailwind CSS with shadcn/ui components for consistent design
- **State Management**: TanStack Query (React Query) for server state management with caching and synchronization
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation for type-safe form management
- **Styling**: Custom green-themed color palette reflecting growth and spring themes

### Backend Architecture
- **Framework**: Express.js with TypeScript for API development
- **Database**: PostgreSQL with Neon serverless driver for scalable cloud database
- **ORM**: Prisma ORM for type-safe database operations and migrations
- **Authentication**: OpenID Connect with Replit authentication provider
- **Session Management**: Express sessions with PostgreSQL store for persistence
- **API Design**: RESTful endpoints with JSON responses and proper error handling

### Modern Architecture Patterns
- **SOLID Principles**: Complete refactoring following Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion principles
- **Repository Pattern**: Separate data access layer with interfaces for each entity (User, Meeting, Note, CoachingSuggestion, CrmSyncLog)
- **Service Layer**: Business logic separated into dedicated services with clear interfaces
- **Dependency Injection**: Container-based DI system for managing service dependencies
- **Controller Pattern**: Dedicated controllers for handling HTTP requests and responses
- **Separation of Concerns**: Clean separation between data access, business logic, and presentation layers

## Key Components

### Authentication System
- **Provider**: OpenID Connect integration with Replit's authentication service
- **Session Management**: PostgreSQL-backed sessions with 7-day TTL for security
- **Authorization**: Route-level protection with middleware validation
- **User Management**: Automatic user creation and profile synchronization

### AI Integration
- **OpenAI Integration**: Uses GPT-4o model for note analysis and coaching suggestions
- **Note Analysis**: Extracts deal stage, pain points, budget, timeline, stakeholders, and sentiment
- **Coaching Suggestions**: Generates contextual sales coaching recommendations
- **Real-time Processing**: Debounced analysis for seamless user experience

### CRM Integration
- **Salesforce Integration**: Bidirectional sync with Salesforce CRM
- **Data Synchronization**: Meeting notes, analysis, and coaching suggestions sync
- **Audit Logging**: Comprehensive logging of all CRM sync operations
- **Connection Management**: Robust error handling and authentication

### Meeting Management
- **Meeting Creation**: Simple interface for creating client meetings
- **Note Taking**: Real-time note-taking with auto-save functionality
- **AI Analysis**: Automatic analysis of meeting content
- **Status Tracking**: Meeting lifecycle management

### Telephony Integration
- **Call Interface**: Collapsible call panel with audio/video controls
- **Demo Mode**: Simulated call functionality for base tier users
- **LiveKit Integration**: Full real-time communication for premium tier
- **Pricing Tiers**: Base tier (notes + demo calls) and Premium tier (notes + live calls)
- **Call Management**: Session tracking, participant management, and call controls

## Pricing Tier Architecture

The application is designed with a multi-tier pricing strategy:

### Base Tier
- **Core Features**: Full meeting notes functionality, AI analysis, and coaching suggestions
- **Telephony**: Demo mode call interface with simulated functionality
- **Target Users**: Individual sales reps and small teams testing the platform
- **Technical Implementation**: All call functions work in simulation mode with visual feedback

### Premium Tier  
- **Core Features**: All base tier functionality
- **Telephony**: Full LiveKit integration with real audio/video calls
- **Advanced Features**: Real-time transcription, call recording, CRM sync of call data
- **Target Users**: Professional sales teams and enterprise customers
- **Technical Implementation**: Complete LiveKit WebRTC integration with backend infrastructure

## Data Flow

1. **User Authentication**: Users authenticate through Replit OpenID Connect
2. **Meeting Creation**: Users create meetings with client information
3. **Note Taking**: Users input meeting notes with real-time auto-save
4. **AI Analysis**: Notes are automatically analyzed for insights and coaching suggestions
5. **Call Management**: Base tier uses demo mode, Premium tier connects via LiveKit
6. **CRM Sync**: Meeting data and insights are synchronized with Salesforce
7. **Coaching Delivery**: AI-generated coaching suggestions are presented to users

## Database Schema

The application uses PostgreSQL with these core tables:
- `sessions` - Session storage for authentication with automatic expiration
- `users` - User profiles linked to authentication system
- `meetings` - Meeting records with client information and status tracking
- `notes` - Meeting notes with AI analysis results stored as JSONB
- `coaching_suggestions` - AI-generated coaching recommendations with usage tracking
- `crm_sync_logs` - CRM synchronization audit logs for troubleshooting

## External Dependencies

### Core Dependencies
- **@prisma/client**: Database ORM and type generation
- **@neondatabase/serverless**: PostgreSQL connection for serverless environments
- **@tanstack/react-query**: Client-side state management and caching
- **@radix-ui/react-***: UI component primitives
- **openai**: AI integration for note analysis and coaching
- **jsforce**: Salesforce CRM integration
- **passport**: Authentication middleware
- **express-session**: Session management
- **connect-pg-simple**: PostgreSQL session store

### Development Dependencies
- **TypeScript**: Type safety across the stack
- **Vite**: Build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Zod**: Schema validation and type inference

## Deployment Strategy

The application supports multiple deployment options:

### Local Development (Docker Compose)
- **Complete Stack**: Docker Compose setup in `.dev/` folder with PostgreSQL, Redis, and management tools
- **Quick Setup**: Single command setup with `make dev-setup` or `docker-compose up -d`
- **Development Tools**: Adminer for database management, Redis Commander, and Mailhog for email testing
- **Environment Management**: Template environment file with local configuration
- **Service Management**: Scripts for setup, cleanup, and service management
- **Production Testing**: Additional production-like Docker configuration for local testing

### Replit Deployment
- **Build Process**: Vite builds the frontend, ESBuild bundles the backend
- **Environment Variables**: Database connection, API keys, and authentication secrets
- **Session Storage**: PostgreSQL-backed sessions for scalability
- **Static Assets**: Served through Express middleware
- **Development Mode**: Hot reloading with Vite middleware integration

### AWS Infrastructure (Terraform)
- **Infrastructure as Code**: Complete Terraform configuration in `.infrastructure/` folder
- **Container Orchestration**: ECS Fargate with auto-scaling and load balancing
- **Database**: RDS PostgreSQL with automated backups and Multi-AZ support
- **Security**: VPC isolation, security groups, and IAM roles with least privilege
- **Monitoring**: CloudWatch logs, metrics, and alarms for health monitoring
- **Secrets Management**: AWS Systems Manager Parameter Store for secure configuration
- **Container Registry**: ECR for Docker image storage and vulnerability scanning
- **Load Balancing**: Application Load Balancer with health checks and SSL termination

## Brand Identity

The application has been rebranded to "Salespring" with a spring-themed design:
- **Color Palette**: Green-based scheme (hsl(142, 76%, 36%) primary, hsl(95, 60%, 88%) accent)
- **Logo**: Custom SVG with spring coil design and leaf accents
- **Messaging**: Growth-oriented content with nurturing metaphors
- **Theme**: Emphasizes growth, new beginnings, and flourishing sales relationships

## Development Infrastructure

### Local Development Stack
The `.dev/` folder contains a complete Docker Compose stack for local development:

#### Core Services
- **PostgreSQL 15**: Primary database with automatic initialization scripts
- **Redis 7**: Session storage and caching with persistent data
- **Adminer**: Web-based database management (localhost:8080)
- **Redis Commander**: Redis management interface (localhost:8081)
- **Mailhog**: Email testing service (localhost:8025)

#### Development Tools
- **Setup Scripts**: Automated environment setup with `setup.sh` and `cleanup.sh`
- **Makefile**: Convenient commands for all development operations
- **Environment Templates**: Pre-configured environment variables for local development
- **Health Checks**: Service health monitoring and dependency management

#### Production Testing
- **Production Docker Compose**: `docker-compose.prod.yml` for production-like local testing
- **Dockerfile**: Multi-stage build for optimized production containers
- **Nginx Configuration**: Reverse proxy with rate limiting and security headers
- **Service Architecture**: Separate containers for app, database, cache, and proxy

#### Quick Start Commands
```bash
make dev-setup          # Complete environment setup
make dev-services       # Start Docker services
make install           # Install npm dependencies
make db-push           # Apply database schema
make dev               # Start development server
```