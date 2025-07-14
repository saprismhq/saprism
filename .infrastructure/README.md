# Salespring Infrastructure

This directory contains Terraform configuration files for deploying Salespring infrastructure on AWS.

## Architecture

The infrastructure includes:

- **VPC**: Custom VPC with public and private subnets across 2 availability zones
- **ECS Fargate**: Container orchestration for running the application
- **Application Load Balancer**: Load balancing and SSL termination
- **RDS PostgreSQL**: Managed database service
- **ECR**: Container registry for Docker images
- **CloudWatch**: Logging and monitoring
- **Auto Scaling**: Automatic scaling based on CPU/Memory usage
- **Security Groups**: Network security rules
- **IAM Roles**: Permissions for ECS tasks
- **Systems Manager**: Secure parameter storage for secrets

## Prerequisites

1. **AWS CLI** configured with appropriate credentials
2. **Terraform** (>= 1.0) installed
3. **Docker** for building and pushing images
4. **OpenAI API Key** for AI functionality

## Quick Start

1. **Copy the example variables file:**
   ```bash
   cp terraform.tfvars.example terraform.tfvars
   ```

2. **Edit terraform.tfvars with your configuration:**
   ```bash
   vim terraform.tfvars
   ```

3. **Initialize Terraform:**
   ```bash
   terraform init
   ```

4. **Plan the deployment:**
   ```bash
   terraform plan
   ```

5. **Apply the configuration:**
   ```bash
   terraform apply
   ```

## Environment Configuration

### Development
- Single AZ deployment
- Minimal resources (t3.micro)
- No deletion protection
- Short backup retention

### Production
- Multi-AZ deployment
- Larger instance classes
- Deletion protection enabled
- Extended backup retention
- Performance monitoring enabled

## Container Deployment

After infrastructure is created:

1. **Build and tag your Docker image:**
   ```bash
   docker build -t salespring .
   docker tag salespring:latest <ECR_REPOSITORY_URL>:latest
   ```

2. **Push to ECR:**
   ```bash
   aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <ECR_REPOSITORY_URL>
   docker push <ECR_REPOSITORY_URL>:latest
   ```

3. **Update ECS service:**
   ```bash
   aws ecs update-service --cluster <CLUSTER_NAME> --service <SERVICE_NAME> --force-new-deployment
   ```

## Secrets Management

The infrastructure creates SSM parameters for:
- Database connection URL
- OpenAI API key (placeholder - update manually)

Update the OpenAI API key:
```bash
aws ssm put-parameter --name "/salespring/development/openai_api_key" --value "your-api-key" --type "SecureString" --overwrite
```

## Monitoring

CloudWatch alarms are configured for:
- High CPU utilization (>80%)
- High memory utilization (>80%)
- Application health checks

## Security

- All traffic encrypted in transit
- Database encrypted at rest
- Secrets stored in SSM Parameter Store
- Network isolation using VPC and security groups
- IAM roles with least privilege principle

## Scaling

Auto-scaling policies are configured for:
- CPU utilization (target: 70%)
- Memory utilization (target: 80%)
- Min capacity: 1 task
- Max capacity: 10 tasks

## Backup and Recovery

- RDS automated backups (7 days retention)
- Point-in-time recovery enabled
- Multi-AZ deployment for production
- CloudWatch logs retention (14 days)

## Cost Optimization

- Fargate Spot instances for development
- RDS storage auto-scaling
- CloudWatch log retention limits
- Resource tagging for cost tracking

## Outputs

After deployment, Terraform provides:
- Application URL
- Database endpoint
- ECR repository URL
- Resource ARNs and IDs

## Cleanup

To destroy all resources:
```bash
terraform destroy
```

**Warning**: This will permanently delete all resources and data.

## Troubleshooting

### Common Issues

1. **ECS Task Fails to Start**
   - Check CloudWatch logs
   - Verify environment variables
   - Ensure Docker image is available in ECR

2. **Database Connection Issues**
   - Verify security group rules
   - Check database endpoint and credentials
   - Ensure tasks are in correct subnets

3. **Load Balancer Health Checks Fail**
   - Verify application exposes health endpoint
   - Check security group inbound rules
   - Ensure application binds to 0.0.0.0

### Useful Commands

```bash
# Check ECS service status
aws ecs describe-services --cluster <CLUSTER_NAME> --services <SERVICE_NAME>

# View CloudWatch logs
aws logs tail /ecs/salespring-<SUFFIX> --follow

# Check ALB target health
aws elbv2 describe-target-health --target-group-arn <TARGET_GROUP_ARN>

# Update ECS service
aws ecs update-service --cluster <CLUSTER_NAME> --service <SERVICE_NAME> --force-new-deployment
```

## Support

For issues with:
- AWS resources: Check AWS documentation
- Terraform: Check Terraform documentation
- Application: Check application logs in CloudWatch