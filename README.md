# Salespring - AI-Powered Sales Coaching Platform

An intelligent sales enablement platform that transforms sales team performance through AI-driven insights, real-time coaching, and comprehensive analytics.

## Features

### 🤖 AI-Powered Analytics
- **Smart Note Analysis**: Automatic extraction of deal stage, pain points, budget, timeline, and stakeholders
- **Growth Guide Coaching**: Real-time, contextual sales coaching suggestions
- **Sentiment Analysis**: Understanding client engagement and emotional tone

### 📝 Rich Text Note-Taking
- **Professional Editor**: Word/OneNote-like formatting capabilities
- **Real-time Formatting**: Bold, italic, strikethrough, lists, colors, and highlighting
- **Auto-save**: Never lose your meeting notes with intelligent auto-save
- **Task Lists**: Checkbox lists for action items and follow-ups

### 🔗 CRM Integration
- **Salesforce Sync**: Bidirectional synchronization with Salesforce CRM
- **Automated Data Flow**: Meeting notes and insights automatically sync to CRM records
- **Audit Logging**: Complete tracking of all CRM sync operations

## Technology Stack

### Hybrid Build System
- **Vite**: Modern frontend build tool and development server
- **Express.js**: Backend API server with Vite middleware integration
- **Single Port Architecture**: Both frontend and backend served on port 5000
- **ESBuild**: Backend bundling for production deployment

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and optimized builds
- **Tailwind CSS** + shadcn/ui components
- **TanStack Query** for server state management
- **TipTap** rich text editor
- **Wouter** for lightweight routing

### Backend
- **Express.js** with TypeScript
- **Vite Middleware**: Integrated for seamless development experience
- **Prisma ORM** for type-safe database operations
- **OpenAI GPT-4o** for AI analysis and coaching
- **Salesforce jsforce** for CRM integration
- **Express sessions** with PostgreSQL storage

### Infrastructure
- **PostgreSQL** database with Neon serverless driver
- **Replit** hosting and deployment platform
- **OpenID Connect** authentication via Replit

## Getting Started

### Local Development (Recommended)

**Quick Setup with Docker:**
```bash
cd .dev
docker-compose up -d
cp .env.local ../.env
cd ..
npm install
npm run db:push
npm run dev
```

**Or use the setup script:**
```bash
cd .dev
./scripts/setup.sh
```

This will start:
- PostgreSQL database (localhost:5432)
- Redis for sessions (localhost:6379)
- Adminer database UI (localhost:8080)
- Redis Commander (localhost:8081)
- Mailhog for email testing (localhost:8025)

### Manual Setup

#### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- OpenAI API key
- Salesforce developer account (optional)

#### Environment Variables
```bash
DATABASE_URL=your_postgresql_connection_string
OPENAI_API_KEY=your_openai_api_key
SESSION_SECRET=your_session_secret
REPL_ID=your_replit_id
REPLIT_DOMAINS=your_domain
```

#### Installation
```bash
npm install
npm run db:push
npm run dev
```

## Usage

1. **Create Meeting**: Start a new client meeting with basic information
2. **Take Notes**: Use the rich text editor with formatting capabilities
3. **AI Analysis**: Get automatic insights on deal stage, pain points, and next steps
4. **Growth Guide**: Receive contextual coaching suggestions
5. **CRM Sync**: Automatically sync data to your Salesforce CRM

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

For support and questions, please open an issue in the GitHub repository.