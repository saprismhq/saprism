# Salespring Local Development Setup

This directory contains everything needed to run Salespring locally with Docker.

## Quick Start

1. **Start the infrastructure**:
   ```bash
   cd .dev
   docker-compose up -d
   ```

2. **Set up environment variables**:
   ```bash
   cp .dev/.env.local .env
   # Edit .env with your actual API keys
   ```

3. **Install dependencies and run migrations**:
   ```bash
   npm install
   npm run db:push
   ```

4. **Start the application**:
   ```bash
   npm run dev
   ```

## Services Included

### Core Infrastructure
- **PostgreSQL** (localhost:5432): Main database
- **Redis** (localhost:6379): Session storage and caching

### Development Tools
- **Adminer** (localhost:8080): Database management interface
  - Server: `postgres`
  - Username: `salespring_user`
  - Password: `salespring_password`
  - Database: `salespring`

- **Redis Commander** (localhost:8081): Redis management interface

- **Mailhog** (localhost:8025): Email testing
  - SMTP: localhost:1025
  - Web UI: localhost:8025

## Environment Configuration

Copy `.dev/.env.local` to your project root as `.env` and configure:

### Required API Keys
- `OPENAI_API_KEY`: Get from [OpenAI Platform](https://platform.openai.com/api-keys)
- `REPL_ID`: Your Replit project ID (if using Replit auth)

### Database
The PostgreSQL database is automatically configured with:
- Database: `salespring`
- User: `salespring_user`
- Password: `salespring_password`
- Port: `5432`

## Managing Services

### Start all services
```bash
docker-compose up -d
```

### View logs
```bash
docker-compose logs -f [service-name]
```

### Stop all services
```bash
docker-compose down
```

### Reset database (removes all data)
```bash
docker-compose down -v
docker-compose up -d postgres
```

### Backup database
```bash
docker-compose exec postgres pg_dump -U salespring_user salespring > backup.sql
```

### Restore database
```bash
docker-compose exec -T postgres psql -U salespring_user salespring < backup.sql
```

## Troubleshooting

### Port Conflicts
If ports are already in use, modify the port mappings in `docker-compose.yml`:
```yaml
ports:
  - "5433:5432"  # Change 5432 to 5433 for PostgreSQL
```

### Database Connection Issues
1. Ensure PostgreSQL is healthy: `docker-compose ps`
2. Check logs: `docker-compose logs postgres`
3. Test connection: `docker-compose exec postgres psql -U salespring_user -d salespring`

### Redis Issues
1. Check Redis health: `docker-compose exec redis redis-cli ping`
2. View Redis logs: `docker-compose logs redis`

## Development Workflow

1. **Start infrastructure**: `docker-compose up -d`
2. **Run database migrations**: `npm run db:push`
3. **Start development server**: `npm run dev`
4. **Access tools**:
   - App: http://localhost:5000
   - Database UI: http://localhost:8080
   - Redis UI: http://localhost:8081
   - Email UI: http://localhost:8025

## Production Notes

This setup is for **local development only**. For production:
- Use managed databases (AWS RDS, Google Cloud SQL, etc.)
- Configure proper secrets management
- Set up SSL/TLS certificates
- Use production-grade Redis (AWS ElastiCache, etc.)
- Configure proper backup strategies