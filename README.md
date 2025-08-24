<div align="center">

<img src="assets/saprism-logo.png" alt="Saprism Logo" width="80" height="80">

# Saprism
### *AI-Powered Sales Coaching Platform*

*Transform your sales team performance through intelligent coaching, real-time insights, and seamless CRM integration*

---

[![Made with React](https://img.shields.io/badge/React-18.2-61dafb?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-4.18-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)

[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-4169e1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5.0-2d3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o-412991?style=for-the-badge&logo=openai&logoColor=white)](https://openai.com/)
[![Salesforce](https://img.shields.io/badge/Salesforce-Integration-00a1e0?style=for-the-badge&logo=salesforce&logoColor=white)](https://www.salesforce.com/)

[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-06b6d4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-4.4-646cff?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

---

### 🚀 **Core Features**
🤖 **AI-Powered Analytics** • 📝 **Rich Text Notes** • 🔗 **CRM Integration** • 📞 **Real-time Transcription**

### 🛠️ **Tech Stack**
<img src="https://skillicons.dev/icons?i=react,typescript,nodejs,express,postgres,prisma,tailwind,vite,docker" />

---

</div>

An intelligent sales enablement platform that transforms sales team performance through AI-driven insights, real-time coaching, and comprehensive CRM integration.

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

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

For support and questions, please open an issue in the GitHub repository.