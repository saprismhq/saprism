# Variables for Salespring infrastructure

variable "project_name" {
  description = "Name of the project"
  type        = string
  default     = "salespring"
}

variable "environment" {
  description = "Environment name (development, staging, production)"
  type        = string
  default     = "development"
}

variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "app_port" {
  description = "Port on which the application runs"
  type        = number
  default     = 5000
}

variable "db_instance_class" {
  description = "RDS instance class"
  type        = string
  default     = "db.t3.micro"
}

variable "db_name" {
  description = "Name of the database"
  type        = string
  default     = "salespring"
}

variable "db_username" {
  description = "Database username"
  type        = string
  default     = "salespring_user"
}

variable "domain_name" {
  description = "Domain name for the application (optional)"
  type        = string
  default     = ""
}

variable "certificate_arn" {
  description = "ARN of the SSL certificate (optional)"
  type        = string
  default     = ""
}

variable "enable_https" {
  description = "Enable HTTPS listener"
  type        = bool
  default     = false
}

variable "ecs_desired_count" {
  description = "Desired number of ECS tasks"
  type        = number
  default     = 1
}

variable "ecs_cpu" {
  description = "CPU units for ECS task"
  type        = number
  default     = 256
}

variable "ecs_memory" {
  description = "Memory for ECS task"
  type        = number
  default     = 512
}

variable "log_retention_days" {
  description = "CloudWatch log retention in days"
  type        = number
  default     = 14
}

variable "backup_retention_period" {
  description = "RDS backup retention period in days"
  type        = number
  default     = 7
}

variable "enable_deletion_protection" {
  description = "Enable deletion protection for RDS"
  type        = bool
  default     = false
}

variable "multi_az" {
  description = "Enable Multi-AZ deployment for RDS"
  type        = bool
  default     = false
}

variable "allocated_storage" {
  description = "Initial storage size for RDS"
  type        = number
  default     = 20
}

variable "max_allocated_storage" {
  description = "Maximum storage size for RDS auto-scaling"
  type        = number
  default     = 100
}

variable "storage_type" {
  description = "Storage type for RDS"
  type        = string
  default     = "gp2"
}

variable "storage_encrypted" {
  description = "Enable encryption for RDS storage"
  type        = bool
  default     = true
}

variable "backup_window" {
  description = "RDS backup window"
  type        = string
  default     = "03:00-04:00"
}

variable "maintenance_window" {
  description = "RDS maintenance window"
  type        = string
  default     = "sun:04:00-sun:05:00"
}

variable "enable_performance_insights" {
  description = "Enable Performance Insights for RDS"
  type        = bool
  default     = false
}

variable "performance_insights_retention_period" {
  description = "Performance Insights retention period"
  type        = number
  default     = 7
}

variable "enable_monitoring" {
  description = "Enable enhanced monitoring for RDS"
  type        = bool
  default     = false
}

variable "monitoring_interval" {
  description = "Monitoring interval for RDS"
  type        = number
  default     = 60
}

variable "auto_minor_version_upgrade" {
  description = "Enable automatic minor version upgrades for RDS"
  type        = bool
  default     = true
}

variable "allow_major_version_upgrade" {
  description = "Allow major version upgrades for RDS"
  type        = bool
  default     = false
}

variable "apply_immediately" {
  description = "Apply changes immediately"
  type        = bool
  default     = false
}

variable "tags" {
  description = "Additional tags for all resources"
  type        = map(string)
  default     = {}
}

# Security and Monitoring Variables

variable "waf_rate_limit" {
  description = "Rate limit for WAF (requests per 5 minutes)"
  type        = number
  default     = 2000
}

variable "enable_vpc_endpoints" {
  description = "Enable VPC endpoints for AWS services"
  type        = bool
  default     = false
}

variable "enable_cloudfront" {
  description = "Enable CloudFront CDN for S3 storage"
  type        = bool
  default     = false
}

variable "enable_xray" {
  description = "Enable X-Ray tracing"
  type        = bool
  default     = false
}

variable "alert_email" {
  description = "Email address for CloudWatch alerts"
  type        = string
  default     = ""
}

# CI/CD Variables

variable "enable_cicd" {
  description = "Enable CI/CD pipeline with CodePipeline and CodeBuild"
  type        = bool
  default     = false
}

variable "github_owner" {
  description = "GitHub repository owner/organization"
  type        = string
  default     = ""
}

variable "github_repo" {
  description = "GitHub repository name"
  type        = string
  default     = ""
}

variable "github_branch" {
  description = "GitHub branch to track"
  type        = string
  default     = "main"
}

variable "github_token" {
  description = "GitHub personal access token for CodePipeline"
  type        = string
  default     = ""
  sensitive   = true
}

# Social Login Variables

variable "enable_google_login" {
  description = "Enable Google OAuth login"
  type        = bool
  default     = false
}

variable "google_client_id" {
  description = "Google OAuth client ID"
  type        = string
  default     = ""
}

variable "google_client_secret" {
  description = "Google OAuth client secret"
  type        = string
  default     = ""
  sensitive   = true
}

variable "enable_facebook_login" {
  description = "Enable Facebook login"
  type        = bool
  default     = false
}

variable "facebook_app_id" {
  description = "Facebook App ID"
  type        = string
  default     = ""
}

variable "facebook_app_secret" {
  description = "Facebook App Secret"
  type        = string
  default     = ""
  sensitive   = true
}

variable "enable_apple_login" {
  description = "Enable Apple Sign In"
  type        = bool
  default     = false
}

variable "apple_client_id" {
  description = "Apple Sign In client ID (Service ID)"
  type        = string
  default     = ""
}

variable "apple_team_id" {
  description = "Apple Developer Team ID"
  type        = string
  default     = ""
}

variable "apple_key_id" {
  description = "Apple Sign In Key ID"
  type        = string
  default     = ""
}

variable "apple_private_key" {
  description = "Apple Sign In private key content"
  type        = string
  default     = ""
  sensitive   = true
}

variable "enable_amazon_login" {
  description = "Enable Amazon Login"
  type        = bool
  default     = false
}

variable "amazon_client_id" {
  description = "Amazon Login client ID"
  type        = string
  default     = ""
}

variable "amazon_client_secret" {
  description = "Amazon Login client secret"
  type        = string
  default     = ""
  sensitive   = true
}