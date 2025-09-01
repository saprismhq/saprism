# Multi-stage Dockerfile for Saprism production build

# Stage 1: Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Copy package files for dependency caching
COPY package*.json ./

# Install ALL dependencies (including devDependencies for building)
RUN npm ci && npm cache clean --force

# Copy source code
COPY . .

# Set environment for production build
ENV NODE_ENV=production

# Generate Prisma client
RUN npx prisma generate

# Build the application (Vite frontend + esbuild backend)
RUN npm run build

# Verify build outputs exist
RUN ls -la dist/ && \
    test -f dist/index.js && \
    test -d dist/assets

# Stage 2: Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Install dumb-init and curl for health checks
RUN apk add --no-cache dumb-init curl

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S saprism -u 1001

# Copy package files
COPY package*.json ./

# Install ONLY production dependencies
RUN npm ci --only=production && \
    npm cache clean --force

# Copy built application from builder stage
COPY --from=builder --chown=saprism:nodejs /app/dist ./dist

# Copy necessary runtime files
COPY --chown=saprism:nodejs prisma ./prisma

# Copy node_modules with Prisma client
COPY --from=builder --chown=saprism:nodejs /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder --chown=saprism:nodejs /app/node_modules/@prisma ./node_modules/@prisma

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Expose port
EXPOSE 5000

# Switch to non-root user
USER saprism

# Health check using the new /health endpoint
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:5000/health || exit 1

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start the application
CMD ["node", "dist/index.js"]