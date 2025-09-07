# Additional Secrets Management
# This file configures SSM parameters for external services and authentication

# Cognito Configuration Parameters
resource "aws_ssm_parameter" "cognito_user_pool_id" {
  name  = "/${var.project_name}/${var.environment}/cognito_user_pool_id"
  type  = "String"
  value = aws_cognito_user_pool.main.id

  tags = {
    Name        = "${var.project_name}-cognito-pool-id-${random_string.resource_suffix.result}"
    Environment = var.environment
    Project     = var.project_name
  }
}

resource "aws_ssm_parameter" "cognito_client_id" {
  name  = "/${var.project_name}/${var.environment}/cognito_client_id"
  type  = "String"
  value = aws_cognito_user_pool_client.main.id

  tags = {
    Name        = "${var.project_name}-cognito-client-id-${random_string.resource_suffix.result}"
    Environment = var.environment
    Project     = var.project_name
  }
}

resource "aws_ssm_parameter" "cognito_client_secret" {
  name  = "/${var.project_name}/${var.environment}/cognito_client_secret"
  type  = "SecureString"
  value = aws_cognito_user_pool_client.main.client_secret

  tags = {
    Name        = "${var.project_name}-cognito-client-secret-${random_string.resource_suffix.result}"
    Environment = var.environment
    Project     = var.project_name
  }
}

resource "aws_ssm_parameter" "cognito_domain" {
  name  = "/${var.project_name}/${var.environment}/cognito_domain"
  type  = "String"
  value = aws_cognito_user_pool_domain.main.domain

  tags = {
    Name        = "${var.project_name}-cognito-domain-${random_string.resource_suffix.result}"
    Environment = var.environment
    Project     = var.project_name
  }
}

# Salesforce Configuration Parameters
resource "aws_ssm_parameter" "salesforce_client_id" {
  name  = "/${var.project_name}/${var.environment}/salesforce_client_id"
  type  = "SecureString"
  value = "PLACEHOLDER_SET_ACTUAL_VALUE"

  tags = {
    Name        = "${var.project_name}-salesforce-client-id-${random_string.resource_suffix.result}"
    Environment = var.environment
    Project     = var.project_name
  }

  lifecycle {
    ignore_changes = [value]
  }
}

resource "aws_ssm_parameter" "salesforce_client_secret" {
  name  = "/${var.project_name}/${var.environment}/salesforce_client_secret"
  type  = "SecureString"
  value = "PLACEHOLDER_SET_ACTUAL_VALUE"

  tags = {
    Name        = "${var.project_name}-salesforce-client-secret-${random_string.resource_suffix.result}"
    Environment = var.environment
    Project     = var.project_name
  }

  lifecycle {
    ignore_changes = [value]
  }
}

resource "aws_ssm_parameter" "salesforce_instance_url" {
  name  = "/${var.project_name}/${var.environment}/salesforce_instance_url"
  type  = "String"
  value = "https://your-instance.salesforce.com"

  tags = {
    Name        = "${var.project_name}-salesforce-instance-url-${random_string.resource_suffix.result}"
    Environment = var.environment
    Project     = var.project_name
  }

  lifecycle {
    ignore_changes = [value]
  }
}

# LiveKit Configuration Parameters
resource "aws_ssm_parameter" "livekit_api_key" {
  name  = "/${var.project_name}/${var.environment}/livekit_api_key"
  type  = "SecureString"
  value = "PLACEHOLDER_SET_ACTUAL_VALUE"

  tags = {
    Name        = "${var.project_name}-livekit-api-key-${random_string.resource_suffix.result}"
    Environment = var.environment
    Project     = var.project_name
  }

  lifecycle {
    ignore_changes = [value]
  }
}

resource "aws_ssm_parameter" "livekit_secret_key" {
  name  = "/${var.project_name}/${var.environment}/livekit_secret_key"
  type  = "SecureString"
  value = "PLACEHOLDER_SET_ACTUAL_VALUE"

  tags = {
    Name        = "${var.project_name}-livekit-secret-key-${random_string.resource_suffix.result}"
    Environment = var.environment
    Project     = var.project_name
  }

  lifecycle {
    ignore_changes = [value]
  }
}

resource "aws_ssm_parameter" "livekit_ws_url" {
  name  = "/${var.project_name}/${var.environment}/livekit_ws_url"
  type  = "String"
  value = "wss://your-livekit-server.com"

  tags = {
    Name        = "${var.project_name}-livekit-ws-url-${random_string.resource_suffix.result}"
    Environment = var.environment
    Project     = var.project_name
  }

  lifecycle {
    ignore_changes = [value]
  }
}

# Session Secret for Express sessions
resource "random_password" "session_secret" {
  length  = 64
  special = true
}

resource "aws_ssm_parameter" "session_secret" {
  name  = "/${var.project_name}/${var.environment}/session_secret"
  type  = "SecureString"
  value = random_password.session_secret.result

  tags = {
    Name        = "${var.project_name}-session-secret-${random_string.resource_suffix.result}"
    Environment = var.environment
    Project     = var.project_name
  }
}

# JWT Secret for token signing
resource "random_password" "jwt_secret" {
  length  = 64
  special = true
}

resource "aws_ssm_parameter" "jwt_secret" {
  name  = "/${var.project_name}/${var.environment}/jwt_secret"
  type  = "SecureString"
  value = random_password.jwt_secret.result

  tags = {
    Name        = "${var.project_name}-jwt-secret-${random_string.resource_suffix.result}"
    Environment = var.environment
    Project     = var.project_name
  }
}

# Application Domain/URL
resource "aws_ssm_parameter" "app_url" {
  name  = "/${var.project_name}/${var.environment}/app_url"
  type  = "String"
  value = var.domain_name != "" ? "https://${var.domain_name}" : "http://${aws_lb.main.dns_name}"

  tags = {
    Name        = "${var.project_name}-app-url-${random_string.resource_suffix.result}"
    Environment = var.environment
    Project     = var.project_name
  }
}