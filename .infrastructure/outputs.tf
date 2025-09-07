# Outputs for Salespring infrastructure

output "vpc_id" {
  description = "ID of the VPC"
  value       = aws_vpc.main.id
}

output "public_subnet_ids" {
  description = "IDs of the public subnets"
  value       = aws_subnet.public[*].id
}

output "private_subnet_ids" {
  description = "IDs of the private subnets"
  value       = aws_subnet.private[*].id
}

output "load_balancer_dns" {
  description = "DNS name of the load balancer"
  value       = aws_lb.main.dns_name
}

output "load_balancer_zone_id" {
  description = "Zone ID of the load balancer"
  value       = aws_lb.main.zone_id
}

output "ecs_cluster_name" {
  description = "Name of the ECS cluster"
  value       = aws_ecs_cluster.main.name
}

output "ecs_cluster_arn" {
  description = "ARN of the ECS cluster"
  value       = aws_ecs_cluster.main.arn
}

output "ecr_repository_url" {
  description = "URL of the ECR repository"
  value       = aws_ecr_repository.app.repository_url
}

output "ecr_repository_arn" {
  description = "ARN of the ECR repository"
  value       = aws_ecr_repository.app.arn
}

output "database_endpoint" {
  description = "RDS instance endpoint"
  value       = aws_db_instance.main.endpoint
  sensitive   = true
}

output "database_port" {
  description = "RDS instance port"
  value       = aws_db_instance.main.port
}

output "database_name" {
  description = "Database name"
  value       = aws_db_instance.main.db_name
}

output "database_username" {
  description = "Database username"
  value       = aws_db_instance.main.username
  sensitive   = true
}

output "database_password_parameter" {
  description = "SSM Parameter name for database password"
  value       = aws_ssm_parameter.db_password.name
}

output "database_url_parameter" {
  description = "SSM Parameter name for database URL"
  value       = aws_ssm_parameter.database_url.name
}

output "openai_api_key_parameter" {
  description = "SSM Parameter name for OpenAI API key"
  value       = aws_ssm_parameter.openai_api_key.name
}

output "cloudwatch_log_group_name" {
  description = "CloudWatch log group name"
  value       = aws_cloudwatch_log_group.app.name
}

output "ecs_task_execution_role_arn" {
  description = "ARN of the ECS task execution role"
  value       = aws_iam_role.ecs_task_execution_role.arn
}

output "ecs_task_role_arn" {
  description = "ARN of the ECS task role"
  value       = aws_iam_role.ecs_task_role.arn
}

output "alb_target_group_arn" {
  description = "ARN of the ALB target group"
  value       = aws_lb_target_group.app.arn
}

output "alb_security_group_id" {
  description = "ID of the ALB security group"
  value       = aws_security_group.alb.id
}

output "ecs_security_group_id" {
  description = "ID of the ECS security group"
  value       = aws_security_group.ecs_tasks.id
}

output "rds_security_group_id" {
  description = "ID of the RDS security group"
  value       = aws_security_group.rds.id
}

output "application_url" {
  description = "Application URL"
  value       = "http://${aws_lb.main.dns_name}"
}

# Resource identifiers for reference
output "resource_suffix" {
  description = "Random suffix used for resource naming"
  value       = random_string.resource_suffix.result
}

output "project_name" {
  description = "Project name used in resource naming"
  value       = var.project_name
}

output "environment" {
  description = "Environment name"
  value       = var.environment
}

output "aws_region" {
  description = "AWS region"
  value       = var.aws_region
}

# Authentication Outputs

output "cognito_user_pool_id" {
  description = "Cognito User Pool ID"
  value       = aws_cognito_user_pool.main.id
}

output "cognito_user_pool_arn" {
  description = "Cognito User Pool ARN"
  value       = aws_cognito_user_pool.main.arn
}

output "cognito_client_id" {
  description = "Cognito User Pool Client ID"
  value       = aws_cognito_user_pool_client.main.id
}

output "cognito_domain" {
  description = "Cognito domain"
  value       = aws_cognito_user_pool_domain.main.domain
}

output "cognito_identity_pool_id" {
  description = "Cognito Identity Pool ID"
  value       = aws_cognito_identity_pool.main.id
}

# SSL/HTTPS Outputs

output "acm_certificate_arn" {
  description = "ACM certificate ARN"
  value       = aws_acm_certificate.app.arn
}

output "https_listener_arn" {
  description = "HTTPS ALB listener ARN"
  value       = var.domain_name != "" ? aws_lb_listener.app_https[0].arn : null
}

# Storage Outputs

output "s3_bucket_name" {
  description = "S3 storage bucket name"
  value       = aws_s3_bucket.app_storage.bucket
}

output "s3_bucket_arn" {
  description = "S3 storage bucket ARN"
  value       = aws_s3_bucket.app_storage.arn
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID"
  value       = var.enable_cloudfront ? aws_cloudfront_distribution.app_storage[0].id : null
}

output "cloudfront_domain_name" {
  description = "CloudFront distribution domain name"
  value       = var.enable_cloudfront ? aws_cloudfront_distribution.app_storage[0].domain_name : null
}

# Security Outputs

output "waf_web_acl_arn" {
  description = "WAF Web ACL ARN"
  value       = aws_wafv2_web_acl.main.arn
}

output "waf_web_acl_id" {
  description = "WAF Web ACL ID"
  value       = aws_wafv2_web_acl.main.id
}

# Monitoring Outputs

output "sns_alerts_topic_arn" {
  description = "SNS alerts topic ARN"
  value       = aws_sns_topic.alerts.arn
}

output "cloudwatch_dashboard_url" {
  description = "CloudWatch dashboard URL"
  value       = "https://${var.aws_region}.console.aws.amazon.com/cloudwatch/home?region=${var.aws_region}#dashboards:name=${aws_cloudwatch_dashboard.main.dashboard_name}"
}

# WebSocket Outputs

output "websocket_target_group_arn" {
  description = "WebSocket target group ARN"
  value       = aws_lb_target_group.websocket.arn
}

# CI/CD Outputs

output "codepipeline_name" {
  description = "CodePipeline name"
  value       = var.enable_cicd ? aws_codepipeline.app[0].name : null
}

output "codebuild_project_name" {
  description = "CodeBuild project name"
  value       = var.enable_cicd ? aws_codebuild_project.app[0].name : null
}

output "pipeline_artifacts_bucket" {
  description = "Pipeline artifacts S3 bucket"
  value       = var.enable_cicd ? aws_s3_bucket.codepipeline_artifacts[0].bucket : null
}

# SSM Parameters Outputs

output "all_ssm_parameters" {
  description = "List of all SSM parameter names for the application"
  value = merge(
    {
      database_url          = aws_ssm_parameter.database_url.name
      database_password     = aws_ssm_parameter.db_password.name
      openai_api_key       = aws_ssm_parameter.openai_api_key.name
      cognito_user_pool_id = aws_ssm_parameter.cognito_user_pool_id.name
      cognito_client_id    = aws_ssm_parameter.cognito_client_id.name
      cognito_client_secret = aws_ssm_parameter.cognito_client_secret.name
      cognito_domain       = aws_ssm_parameter.cognito_domain.name
      salesforce_client_id = aws_ssm_parameter.salesforce_client_id.name
      salesforce_client_secret = aws_ssm_parameter.salesforce_client_secret.name
      salesforce_instance_url = aws_ssm_parameter.salesforce_instance_url.name
      livekit_api_key      = aws_ssm_parameter.livekit_api_key.name
      livekit_secret_key   = aws_ssm_parameter.livekit_secret_key.name
      livekit_ws_url       = aws_ssm_parameter.livekit_ws_url.name
      session_secret       = aws_ssm_parameter.session_secret.name
      jwt_secret          = aws_ssm_parameter.jwt_secret.name
      app_url             = aws_ssm_parameter.app_url.name
    },
    var.enable_google_login ? {
      google_client_id     = aws_ssm_parameter.google_client_id[0].name
      google_client_secret = aws_ssm_parameter.google_client_secret[0].name
    } : {},
    var.enable_facebook_login ? {
      facebook_app_id      = aws_ssm_parameter.facebook_app_id[0].name
      facebook_app_secret  = aws_ssm_parameter.facebook_app_secret[0].name
    } : {},
    var.enable_apple_login ? {
      apple_client_id      = aws_ssm_parameter.apple_client_id[0].name
      apple_team_id        = aws_ssm_parameter.apple_team_id[0].name
      apple_key_id         = aws_ssm_parameter.apple_key_id[0].name
      apple_private_key    = aws_ssm_parameter.apple_private_key[0].name
    } : {},
    var.enable_amazon_login ? {
      amazon_client_id     = aws_ssm_parameter.amazon_client_id[0].name
      amazon_client_secret = aws_ssm_parameter.amazon_client_secret[0].name
    } : {}
  )
}

# Quick Setup Information

output "setup_instructions" {
  description = "Quick setup instructions"
  value = {
    dns_validation = var.domain_name != "" ? "Create DNS validation records in your domain provider for certificate: ${aws_acm_certificate.app.domain_validation_options[0].resource_record_name} -> ${aws_acm_certificate.app.domain_validation_options[0].resource_record_value}" : "No domain configured"
    a_record      = var.domain_name != "" ? "Create A record: ${var.domain_name} -> ${aws_lb.main.dns_name}" : "Use ALB DNS: ${aws_lb.main.dns_name}"
    ssm_parameters = "Update SSM parameters with actual values for external services"
    application_url = var.domain_name != "" ? "https://${var.domain_name}" : "http://${aws_lb.main.dns_name}"
  }
}