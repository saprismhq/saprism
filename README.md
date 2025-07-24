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

### 🏗️ Modern Architecture
- **Full-Stack TypeScript**: Type safety across the entire application
- **React Frontend**: Modern, responsive user interface
- **Express.js Backend**: Robust API with authentication and data validation
- **PostgreSQL Database**: Reliable, scalable data storage
- **Replit Authentication**: Secure user management with OpenID Connect

## Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** + shadcn/ui components
- **TanStack Query** for server state management
- **TipTap** rich text editor
- **Wouter** for routing

### Backend
- **Express.js** with TypeScript
- **Prisma ORM** for database operations
- **OpenAI GPT-4o** for AI analysis
- **Salesforce jsforce** for CRM integration
- **Express sessions** with PostgreSQL storage

### Infrastructure
- **PostgreSQL** database with Neon serverless
- **Replit** hosting and deployment
- **OpenID Connect** authentication

## Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- OpenAI API key
- Salesforce developer account (optional)

### Environment Variables
```bash
DATABASE_URL=your_postgresql_connection_string
OPENAI_API_KEY=your_openai_api_key
SESSION_SECRET=your_session_secret
REPL_ID=your_replit_id
REPLIT_DOMAINS=your_domain
```

### Installation
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

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions, please open an issue in the GitHub repository.