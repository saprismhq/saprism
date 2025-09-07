# Cognito Authentication Configuration
# This file sets up AWS Cognito to replace Replit OpenID Connect

# Cognito User Pool
resource "aws_cognito_user_pool" "main" {
  name = "${var.project_name}-user-pool-${random_string.resource_suffix.result}"

  # User attributes
  alias_attributes = ["email"]
  username_attributes = ["email"]

  # Password policy
  password_policy {
    minimum_length    = 8
    require_lowercase = true
    require_numbers   = true
    require_symbols   = true
    require_uppercase = true
  }

  # Account recovery
  account_recovery_setting {
    recovery_mechanism {
      name     = "verified_email"
      priority = 1
    }
  }

  # Email configuration
  email_configuration {
    email_sending_account = "COGNITO_DEFAULT"
  }

  # Auto verification
  auto_verified_attributes = ["email"]

  # User pool schema
  schema {
    name     = "email"
    required = true
    mutable  = true

    attribute_data_type = "String"
  }

  schema {
    name     = "name"
    required = true
    mutable  = true

    attribute_data_type = "String"
  }

  tags = {
    Name        = "${var.project_name}-user-pool-${random_string.resource_suffix.result}"
    Environment = var.environment
    Project     = var.project_name
  }
}

# Cognito User Pool Client
resource "aws_cognito_user_pool_client" "main" {
  name         = "${var.project_name}-client-${random_string.resource_suffix.result}"
  user_pool_id = aws_cognito_user_pool.main.id

  # OAuth configuration
  generate_secret = true
  
  allowed_oauth_flows = ["code"]
  allowed_oauth_scopes = ["email", "openid", "profile"]
  allowed_oauth_flows_user_pool_client = true

  # Callback URLs
  callback_urls = var.domain_name != "" ? [
    "https://${var.domain_name}/api/callback",
    "http://localhost:5000/api/callback"
  ] : [
    "http://${aws_lb.main.dns_name}/api/callback",
    "http://localhost:5000/api/callback"
  ]

  # Logout URLs
  logout_urls = var.domain_name != "" ? [
    "https://${var.domain_name}/",
    "http://localhost:5000/"
  ] : [
    "http://${aws_lb.main.dns_name}/",
    "http://localhost:5000/"
  ]

  # Supported identity providers
  supported_identity_providers = concat(
    ["COGNITO"],
    var.enable_google_login ? ["Google"] : [],
    var.enable_facebook_login ? ["Facebook"] : [],
    var.enable_apple_login ? ["SignInWithApple"] : [],
    var.enable_amazon_login ? ["LoginWithAmazon"] : []
  )

  # Token validity
  access_token_validity = 60  # 1 hour
  id_token_validity     = 60  # 1 hour
  refresh_token_validity = 30 # 30 days

  token_validity_units {
    access_token  = "minutes"
    id_token      = "minutes"
    refresh_token = "days"
  }

  # Prevent user existence errors
  prevent_user_existence_errors = "ENABLED"

  # Read and write attributes
  read_attributes  = ["email", "name", "email_verified"]
  write_attributes = ["email", "name"]
}

# Cognito User Pool Domain
resource "aws_cognito_user_pool_domain" "main" {
  domain       = "${var.project_name}-auth-${random_string.resource_suffix.result}"
  user_pool_id = aws_cognito_user_pool.main.id
}

# Cognito Identity Pool
resource "aws_cognito_identity_pool" "main" {
  identity_pool_name               = "${var.project_name}-identity-pool-${random_string.resource_suffix.result}"
  allow_unauthenticated_identities = false

  cognito_identity_providers {
    client_id               = aws_cognito_user_pool_client.main.id
    provider_name           = aws_cognito_user_pool.main.endpoint
    server_side_token_check = false
  }

  tags = {
    Name        = "${var.project_name}-identity-pool-${random_string.resource_suffix.result}"
    Environment = var.environment
    Project     = var.project_name
  }
}

# IAM Role for authenticated users
resource "aws_iam_role" "cognito_authenticated" {
  name = "${var.project_name}-cognito-authenticated-${random_string.resource_suffix.result}"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRoleWithWebIdentity"
        Effect = "Allow"
        Principal = {
          Federated = "cognito-identity.amazonaws.com"
        }
        Condition = {
          StringEquals = {
            "cognito-identity.amazonaws.com:aud" = aws_cognito_identity_pool.main.id
          }
          "ForAnyValue:StringLike" = {
            "cognito-identity.amazonaws.com:amr" = "authenticated"
          }
        }
      }
    ]
  })

  tags = {
    Name        = "${var.project_name}-cognito-authenticated-${random_string.resource_suffix.result}"
    Environment = var.environment
    Project     = var.project_name
  }
}

# IAM Policy for authenticated users
resource "aws_iam_role_policy" "cognito_authenticated_policy" {
  name = "${var.project_name}-cognito-authenticated-policy-${random_string.resource_suffix.result}"
  role = aws_iam_role.cognito_authenticated.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "cognito-sync:*",
          "cognito-identity:*"
        ]
        Resource = "*"
      }
    ]
  })
}

# Cognito Identity Pool Role Attachment
resource "aws_cognito_identity_pool_roles_attachment" "main" {
  identity_pool_id = aws_cognito_identity_pool.main.id

  roles = {
    "authenticated" = aws_iam_role.cognito_authenticated.arn
  }
}

# Social Identity Providers

# Google Identity Provider
resource "aws_cognito_identity_provider" "google" {
  count = var.enable_google_login ? 1 : 0
  
  user_pool_id  = aws_cognito_user_pool.main.id
  provider_name = "Google"
  provider_type = "Google"

  provider_details = {
    client_id        = var.google_client_id
    client_secret    = var.google_client_secret
    authorize_scopes = "email openid profile"
  }

  attribute_mapping = {
    email      = "email"
    username   = "sub"
    name       = "name"
    given_name = "given_name"
    family_name = "family_name"
    picture    = "picture"
  }

  tags = {
    Name        = "${var.project_name}-google-provider-${random_string.resource_suffix.result}"
    Environment = var.environment
    Project     = var.project_name
  }
}

# Facebook Identity Provider
resource "aws_cognito_identity_provider" "facebook" {
  count = var.enable_facebook_login ? 1 : 0
  
  user_pool_id  = aws_cognito_user_pool.main.id
  provider_name = "Facebook"
  provider_type = "Facebook"

  provider_details = {
    client_id        = var.facebook_app_id
    client_secret    = var.facebook_app_secret
    authorize_scopes = "email,public_profile"
  }

  attribute_mapping = {
    email      = "email"
    username   = "id"
    name       = "name"
    given_name = "first_name"
    family_name = "last_name"
    picture    = "picture"
  }

  tags = {
    Name        = "${var.project_name}-facebook-provider-${random_string.resource_suffix.result}"
    Environment = var.environment
    Project     = var.project_name
  }
}

# Apple Identity Provider
resource "aws_cognito_identity_provider" "apple" {
  count = var.enable_apple_login ? 1 : 0
  
  user_pool_id  = aws_cognito_user_pool.main.id
  provider_name = "SignInWithApple"
  provider_type = "SignInWithApple"

  provider_details = {
    client_id      = var.apple_client_id
    team_id        = var.apple_team_id
    key_id         = var.apple_key_id
    private_key    = var.apple_private_key
    authorize_scopes = "email name"
  }

  attribute_mapping = {
    email      = "email"
    username   = "sub"
    name       = "name"
    given_name = "firstName"
    family_name = "lastName"
  }

  tags = {
    Name        = "${var.project_name}-apple-provider-${random_string.resource_suffix.result}"
    Environment = var.environment
    Project     = var.project_name
  }
}

# Amazon Identity Provider
resource "aws_cognito_identity_provider" "amazon" {
  count = var.enable_amazon_login ? 1 : 0
  
  user_pool_id  = aws_cognito_user_pool.main.id
  provider_name = "LoginWithAmazon"
  provider_type = "LoginWithAmazon"

  provider_details = {
    client_id        = var.amazon_client_id
    client_secret    = var.amazon_client_secret
    authorize_scopes = "profile"
  }

  attribute_mapping = {
    email      = "email"
    username   = "user_id"
    name       = "name"
  }

  tags = {
    Name        = "${var.project_name}-amazon-provider-${random_string.resource_suffix.result}"
    Environment = var.environment
    Project     = var.project_name
  }
}