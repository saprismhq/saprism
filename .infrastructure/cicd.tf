# CI/CD Pipeline Configuration
# This file configures CodePipeline and CodeBuild for automated deployments

# S3 Bucket for CodePipeline artifacts
resource "aws_s3_bucket" "codepipeline_artifacts" {
  count = var.enable_cicd ? 1 : 0
  
  bucket = "${var.project_name}-pipeline-artifacts-${random_string.resource_suffix.result}"

  tags = {
    Name        = "${var.project_name}-pipeline-artifacts-${random_string.resource_suffix.result}"
    Environment = var.environment
    Project     = var.project_name
  }
}

# S3 Bucket Versioning for artifacts
resource "aws_s3_bucket_versioning" "codepipeline_artifacts" {
  count = var.enable_cicd ? 1 : 0
  
  bucket = aws_s3_bucket.codepipeline_artifacts[0].id
  versioning_configuration {
    status = "Enabled"
  }
}

# S3 Bucket Encryption for artifacts
resource "aws_s3_bucket_server_side_encryption_configuration" "codepipeline_artifacts" {
  count = var.enable_cicd ? 1 : 0
  
  bucket = aws_s3_bucket.codepipeline_artifacts[0].id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

# IAM Role for CodePipeline
resource "aws_iam_role" "codepipeline_role" {
  count = var.enable_cicd ? 1 : 0
  
  name = "${var.project_name}-codepipeline-role-${random_string.resource_suffix.result}"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "codepipeline.amazonaws.com"
        }
      }
    ]
  })

  tags = {
    Name        = "${var.project_name}-codepipeline-role-${random_string.resource_suffix.result}"
    Environment = var.environment
    Project     = var.project_name
  }
}

# IAM Policy for CodePipeline
resource "aws_iam_role_policy" "codepipeline_policy" {
  count = var.enable_cicd ? 1 : 0
  
  name = "${var.project_name}-codepipeline-policy-${random_string.resource_suffix.result}"
  role = aws_iam_role.codepipeline_role[0].id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "s3:GetBucketVersioning",
          "s3:GetObject",
          "s3:GetObjectVersion",
          "s3:PutObject"
        ]
        Resource = [
          aws_s3_bucket.codepipeline_artifacts[0].arn,
          "${aws_s3_bucket.codepipeline_artifacts[0].arn}/*"
        ]
      },
      {
        Effect = "Allow"
        Action = [
          "codebuild:BatchGetBuilds",
          "codebuild:StartBuild"
        ]
        Resource = "*"
      },
      {
        Effect = "Allow"
        Action = [
          "ecs:DescribeServices",
          "ecs:DescribeTaskDefinition",
          "ecs:DescribeTasks",
          "ecs:ListTasks",
          "ecs:RegisterTaskDefinition",
          "ecs:UpdateService"
        ]
        Resource = "*"
      },
      {
        Effect = "Allow"
        Action = [
          "iam:PassRole"
        ]
        Resource = "*"
      }
    ]
  })
}

# IAM Role for CodeBuild
resource "aws_iam_role" "codebuild_role" {
  count = var.enable_cicd ? 1 : 0
  
  name = "${var.project_name}-codebuild-role-${random_string.resource_suffix.result}"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "codebuild.amazonaws.com"
        }
      }
    ]
  })

  tags = {
    Name        = "${var.project_name}-codebuild-role-${random_string.resource_suffix.result}"
    Environment = var.environment
    Project     = var.project_name
  }
}

# IAM Policy for CodeBuild
resource "aws_iam_role_policy" "codebuild_policy" {
  count = var.enable_cicd ? 1 : 0
  
  name = "${var.project_name}-codebuild-policy-${random_string.resource_suffix.result}"
  role = aws_iam_role.codebuild_role[0].id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Resource = "arn:aws:logs:${var.aws_region}:*:*"
      },
      {
        Effect = "Allow"
        Action = [
          "s3:GetObject",
          "s3:GetObjectVersion",
          "s3:PutObject"
        ]
        Resource = [
          aws_s3_bucket.codepipeline_artifacts[0].arn,
          "${aws_s3_bucket.codepipeline_artifacts[0].arn}/*"
        ]
      },
      {
        Effect = "Allow"
        Action = [
          "ecr:BatchCheckLayerAvailability",
          "ecr:GetDownloadUrlForLayer",
          "ecr:BatchGetImage",
          "ecr:GetAuthorizationToken",
          "ecr:PutImage",
          "ecr:InitiateLayerUpload",
          "ecr:UploadLayerPart",
          "ecr:CompleteLayerUpload"
        ]
        Resource = "*"
      },
      {
        Effect = "Allow"
        Action = [
          "ssm:GetParameter",
          "ssm:GetParameters"
        ]
        Resource = "arn:aws:ssm:${var.aws_region}:*:parameter/${var.project_name}/${var.environment}/*"
      }
    ]
  })
}

# CodeBuild Project
resource "aws_codebuild_project" "app" {
  count = var.enable_cicd ? 1 : 0
  
  name         = "${var.project_name}-build-${random_string.resource_suffix.result}"
  description  = "Build project for ${var.project_name}"
  service_role = aws_iam_role.codebuild_role[0].arn

  artifacts {
    type = "CODEPIPELINE"
  }

  environment {
    compute_type                = "BUILD_GENERAL1_MEDIUM"
    image                      = "aws/codebuild/standard:5.0"
    type                       = "LINUX_CONTAINER"
    image_pull_credentials_type = "CODEBUILD"
    privileged_mode            = true

    environment_variable {
      name  = "AWS_DEFAULT_REGION"
      value = var.aws_region
    }

    environment_variable {
      name  = "AWS_ACCOUNT_ID"
      value = data.aws_caller_identity.current.account_id
    }

    environment_variable {
      name  = "IMAGE_REPO_NAME"
      value = aws_ecr_repository.app.name
    }

    environment_variable {
      name  = "IMAGE_TAG"
      value = "latest"
    }

    environment_variable {
      name  = "CONTAINER_NAME"
      value = "${var.project_name}-container"
    }
  }

  source {
    type = "CODEPIPELINE"
    buildspec = "buildspec.yml"
  }

  tags = {
    Name        = "${var.project_name}-codebuild-${random_string.resource_suffix.result}"
    Environment = var.environment
    Project     = var.project_name
  }
}

# CodePipeline
resource "aws_codepipeline" "app" {
  count = var.enable_cicd ? 1 : 0
  
  name     = "${var.project_name}-pipeline-${random_string.resource_suffix.result}"
  role_arn = aws_iam_role.codepipeline_role[0].arn

  artifact_store {
    location = aws_s3_bucket.codepipeline_artifacts[0].bucket
    type     = "S3"
  }

  stage {
    name = "Source"

    action {
      name             = "Source"
      category         = "Source"
      owner            = "ThirdParty"
      provider         = "GitHub"
      version          = "1"
      output_artifacts = ["source_output"]

      configuration = {
        Owner      = var.github_owner
        Repo       = var.github_repo
        Branch     = var.github_branch
        OAuthToken = var.github_token
      }
    }
  }

  stage {
    name = "Build"

    action {
      name             = "Build"
      category         = "Build"
      owner            = "AWS"
      provider         = "CodeBuild"
      input_artifacts  = ["source_output"]
      output_artifacts = ["build_output"]
      version          = "1"

      configuration = {
        ProjectName = aws_codebuild_project.app[0].name
      }
    }
  }

  stage {
    name = "Deploy"

    action {
      name            = "Deploy"
      category        = "Deploy"
      owner           = "AWS"
      provider        = "ECS"
      input_artifacts = ["build_output"]
      version         = "1"

      configuration = {
        ClusterName = aws_ecs_cluster.main.name
        ServiceName = aws_ecs_service.app.name
        FileName    = "imagedefinitions.json"
      }
    }
  }

  tags = {
    Name        = "${var.project_name}-pipeline-${random_string.resource_suffix.result}"
    Environment = var.environment
    Project     = var.project_name
  }
}

# Data source for current AWS account ID
data "aws_caller_identity" "current" {}

# CloudWatch Event Rule for pipeline triggers
resource "aws_cloudwatch_event_rule" "pipeline_trigger" {
  count = var.enable_cicd ? 1 : 0
  
  name        = "${var.project_name}-pipeline-trigger-${random_string.resource_suffix.result}"
  description = "Trigger pipeline on ECR image push"

  event_pattern = jsonencode({
    source      = ["aws.ecr"]
    detail-type = ["ECR Image Action"]
    detail = {
      action-type = ["PUSH"]
      repository-name = [aws_ecr_repository.app.name]
    }
  })

  tags = {
    Name        = "${var.project_name}-pipeline-trigger-${random_string.resource_suffix.result}"
    Environment = var.environment
    Project     = var.project_name
  }
}

# CloudWatch Event Target
resource "aws_cloudwatch_event_target" "pipeline" {
  count = var.enable_cicd ? 1 : 0
  
  rule      = aws_cloudwatch_event_rule.pipeline_trigger[0].name
  target_id = "TriggerPipeline"
  arn       = aws_codepipeline.app[0].arn
  role_arn  = aws_iam_role.pipeline_event_role[0].arn
}

# IAM Role for CloudWatch Events
resource "aws_iam_role" "pipeline_event_role" {
  count = var.enable_cicd ? 1 : 0
  
  name = "${var.project_name}-pipeline-event-role-${random_string.resource_suffix.result}"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "events.amazonaws.com"
        }
      }
    ]
  })

  inline_policy {
    name = "pipeline-execution"
    policy = jsonencode({
      Version = "2012-10-17"
      Statement = [
        {
          Effect = "Allow"
          Action = [
            "codepipeline:StartPipelineExecution"
          ]
          Resource = aws_codepipeline.app[0].arn
        }
      ]
    })
  }

  tags = {
    Name        = "${var.project_name}-pipeline-event-role-${random_string.resource_suffix.result}"
    Environment = var.environment
    Project     = var.project_name
  }
}