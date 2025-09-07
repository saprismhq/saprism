## 🏗️ Architecture Overview

The infrastructure deploys a complete production-ready environment with:

- **Container Orchestration**: ECS Fargate with auto-scaling
- **Database**: RDS PostgreSQL with encryption and automated backups
- **Authentication**: AWS Cognito replacing Replit OpenID Connect
- **Load Balancing**: Application Load Balancer with SSL/TLS termination
- **Security**: WAF protection, VPC isolation, encrypted storage
- **Monitoring**: CloudWatch dashboards, alarms, and alerting
- **Storage**: S3 with optional CloudFront CDN
- **CI/CD**: CodePipeline with CodeBuild for automated deployments
- **WebSocket Support**: Configured for real-time features

## 📁 File Structure

| File | Purpose |
|------|---------|
| `main.tf` | Core infrastructure (VPC, subnets, security groups, RDS, ECS, ALB) |
| `ecs.tf` | ECS task definitions, services, and auto-scaling configuration |
| `auth.tf` | AWS Cognito user pools, identity pools, and authentication setup |
| `ssl.tf` | ACM certificates and HTTPS configuration |
| `secrets.tf` | SSM Parameter Store for secure configuration management |
| `websocket.tf` | WebSocket-specific ALB configuration and target groups |
| `storage.tf` | S3 bucket and optional CloudFront CDN setup |
| `security.tf` | WAF, VPC endpoints, and enhanced security policies |
| `monitoring.tf` | CloudWatch dashboards, alarms, and SNS alerting |
| `cicd.tf` | CodePipeline and CodeBuild for automated deployments |
| `variables.tf` | Input variables with descriptions and defaults |
| `outputs.tf` | Output values for integration and reference |
| `terraform.tfvars.example` | Example configuration file |

## 🚀 Quick Start

### Prerequisites

1. **AWS CLI** configured with appropriate credentials
2. **Terraform** >= 1.0 installed
3. **Domain name** (optional but recommended for production)
4. **GitHub repository** (if using CI/CD)

### Basic Deployment

1. **Clone and configure**:
   ```bash
   cd .infrastructure
   cp terraform.tfvars.example terraform.tfvars
   ```

2. **Edit `terraform.tfvars`** with your specific values:
   ```hcl
   project_name = "saprism"
   environment  = "production"
   domain_name  = "your-domain.com"  # Optional
   alert_email  = "admin@your-domain.com"  # Optional
   ```

3. **Initialize and deploy**:
   ```bash
   terraform init
   terraform plan
   terraform apply
   ```

4. **Configure DNS** (if using custom domain):
   - Create certificate validation records in your DNS provider
   - Create an A record pointing to the ALB DNS name

5. **Update secrets** with actual values:
   ```bash
   # Update SSM parameters with real API keys
   aws ssm put-parameter --name "/saprism/production/openai_api_key" --value "your-key" --type "SecureString" --overwrite
   aws ssm put-parameter --name "/saprism/production/salesforce_client_id" --value "your-id" --type "SecureString" --overwrite
   # ... repeat for other external service credentials
   ```

## ⚙️ Configuration Options

### Environment Variables

The infrastructure automatically configures these environment variables in ECS:

| Variable | Source | Purpose |
|----------|---------|---------|
| `DATABASE_URL` | SSM Parameter | PostgreSQL connection string |
| `NODE_ENV` | Direct | Environment name (production/staging/development) |
| `PORT` | Direct | Application port (5000) |
| `COGNITO_USER_POOL_ID` | SSM Parameter | Cognito authentication |
| `COGNITO_CLIENT_ID` | SSM Parameter | Cognito client configuration |
| `OPENAI_API_KEY` | SSM Parameter | AI integration |
| `SALESFORCE_CLIENT_ID` | SSM Parameter | CRM integration |
| `LIVEKIT_API_KEY` | SSM Parameter | Video/audio calling |

### Feature Flags

Enable/disable major features via variables:

```hcl
# SSL and custom domain
domain_name = "your-domain.com"

# Enhanced security
enable_vpc_endpoints = true
waf_rate_limit = 2000

# Storage and CDN
enable_cloudfront = true

# Monitoring and alerting
enable_xray = true
alert_email = "admin@company.com"

# CI/CD pipeline
enable_cicd = true
github_owner = "your-org"
github_repo = "saprism"
github_token = "your-token"
```

## 🔐 Security Features

### Network Security
- **VPC Isolation**: Private subnets for database, public for ALB
- **Security Groups**: Least-privilege access rules
- **WAF Protection**: Rate limiting and common attack protection
- **VPC Endpoints**: Private communication with AWS services (optional)

### Data Security
- **Encryption at Rest**: RDS and S3 with AWS-managed keys
- **Encryption in Transit**: TLS/SSL for all communications
- **Secrets Management**: SSM Parameter Store with SecureString
- **IAM Roles**: Least-privilege access for all services

### Application Security
- **Authentication**: AWS Cognito with secure token handling
- **HTTPS Redirect**: Automatic HTTP to HTTPS redirection
- **Container Security**: ECS with security scanning
- **Access Logging**: Comprehensive audit trails

## 📊 Monitoring & Alerting

### CloudWatch Dashboards
- **Application Metrics**: Request rates, response times, error rates
- **Infrastructure Metrics**: CPU, memory, database performance
- **Custom Metrics**: Business-specific monitoring

### Automated Alerts
- High error rates (5XX responses > 10 in 5 minutes)
- Slow response times (average > 2 seconds)
- Database connection issues
- Low storage space
- Service health problems

### Log Analysis
- **Centralized Logging**: All application logs in CloudWatch
- **Log Insights**: Pre-configured queries for common issues
- **Metric Filters**: Automatic metric extraction from logs

## 🚀 CI/CD Pipeline

When enabled, the pipeline provides:

### Automated Workflow
1. **Source**: GitHub repository monitoring
2. **Build**: Containerized build with CodeBuild
3. **Deploy**: Blue-green deployment to ECS

### Build Process
- Docker image creation
- Security scanning
- Automated testing
- Image push to ECR

### Deployment
- Zero-downtime deployments
- Automatic rollback on failure
- Health check validation

## 🌐 WebSocket Support

Configured for real-time features:

### Load Balancer Configuration
- **Sticky Sessions**: Maintain WebSocket connections
- **Path Routing**: `/ws/*` routes to WebSocket targets
- **Protocol Upgrade**: HTTP to WebSocket upgrade support

### Target Groups
- Separate target group for WebSocket traffic
- Health checks compatible with WebSocket endpoints
- Auto-scaling based on connection count

## 📈 Scaling Configuration

### Auto Scaling
- **ECS Service**: 1-10 tasks based on CPU/memory
- **RDS Storage**: Automatic storage scaling up to 100GB
- **Application Load Balancer**: Automatic scaling

### Performance Tuning
- **ECS Tasks**: 256 CPU, 512 MB memory (configurable)
- **RDS Instance**: db.t3.micro (configurable)
- **Connection Pooling**: Optimized database connections

## 🔧 Maintenance

### Backup Strategy
- **RDS Automated Backups**: 7-day retention
- **S3 Versioning**: File version management
- **Snapshot Management**: Automated snapshot lifecycle

### Updates
- **Minor Version Upgrades**: Automatic for RDS
- **Security Patches**: Automatic for managed services
- **Application Updates**: Via CI/CD pipeline

### Monitoring
- **Health Checks**: ALB and ECS health monitoring
- **Performance Insights**: Database performance monitoring
- **Cost Optimization**: Resource utilization tracking

## 💰 Cost Optimization

### Resource Sizing
- **Development**: Minimal instance sizes for cost efficiency
- **Production**: Right-sized instances for performance
- **Auto Scaling**: Automatic resource adjustment

### Optional Features
- **CloudFront**: Enable only if global CDN needed
- **VPC Endpoints**: Enable for enhanced security (additional cost)
- **Enhanced Monitoring**: Optional detailed monitoring

## 🔍 Troubleshooting

### Common Issues

**Certificate Validation Fails**
```bash
# Check DNS records are created correctly
dig TXT _acme-challenge.your-domain.com
```

**Application Won't Start**
```bash
# Check ECS service logs
aws logs describe-log-groups --log-group-name-prefix "/ecs/saprism"
aws logs tail /ecs/saprism-xyz --follow
```

**Database Connection Issues**
```bash
# Verify security groups allow ECS to RDS communication
aws ec2 describe-security-groups --group-ids sg-xxx
```

### Useful Commands

```bash
# View all outputs
terraform output

# Get specific connection info
terraform output setup_instructions

# Check service status
aws ecs describe-services --cluster saprism-cluster-xyz --services saprism-service-xyz

# Update SSM parameter
aws ssm put-parameter --name "/saprism/production/openai_api_key" --value "new-key" --type "SecureString" --overwrite
```

## 🔗 Integration Guide

### DNS Setup (GoDaddy Example)
1. Get ALB DNS name: `terraform output load_balancer_dns`
2. In GoDaddy DNS management:
   - Create A record: `your-domain.com` → `alb-dns-name`
   - Create certificate validation record (from terraform output)

### External Service Configuration
1. **OpenAI**: Get API key from OpenAI dashboard
2. **Salesforce**: Create connected app for OAuth
3. **LiveKit**: Set up LiveKit Cloud account
4. Update all SSM parameters with actual values

### Application Configuration
Update your application code to use:
- AWS Cognito for authentication (replace Replit auth)
- SSM Parameter Store for configuration
- S3 for file storage
- CloudWatch for logging

## 📋 Deployment Checklist

### Pre-Deployment
- [ ] AWS credentials configured
- [ ] Domain name configured (if using)
- [ ] External service accounts created
- [ ] terraform.tfvars configured

### Post-Deployment
- [ ] DNS records created
- [ ] SSL certificate validated
- [ ] SSM parameters updated with real values
- [ ] Application health verified
- [ ] Monitoring alerts configured
- [ ] CI/CD pipeline tested (if enabled)

### Production Readiness
- [ ] Enable deletion protection: `enable_deletion_protection = true`
- [ ] Configure Multi-AZ: `multi_az = true`
- [ ] Set up proper backup retention
- [ ] Configure alert notifications
- [ ] Test disaster recovery procedures

## 📞 Support

For infrastructure issues:
1. Check CloudWatch logs and metrics
2. Review Terraform state and outputs
3. Verify AWS service limits and quotas
4. Check security group and IAM configurations

This infrastructure is designed to be production-ready with security, scalability, and maintainability built-in. Adjust the configuration variables to match your specific requirements and deployment environment.
