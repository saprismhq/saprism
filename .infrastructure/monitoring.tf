# Enhanced Monitoring and Alerting Configuration
# This file configures CloudWatch dashboards, alarms, and X-Ray tracing

# SNS Topic for alerts
resource "aws_sns_topic" "alerts" {
  name = "${var.project_name}-alerts-${random_string.resource_suffix.result}"

  tags = {
    Name        = "${var.project_name}-alerts-${random_string.resource_suffix.result}"
    Environment = var.environment
    Project     = var.project_name
  }
}

# SNS Topic Subscription (email)
resource "aws_sns_topic_subscription" "email_alerts" {
  count = var.alert_email != "" ? 1 : 0
  
  topic_arn = aws_sns_topic.alerts.arn
  protocol  = "email"
  endpoint  = var.alert_email
}

# CloudWatch Dashboard
resource "aws_cloudwatch_dashboard" "main" {
  dashboard_name = "${var.project_name}-dashboard-${random_string.resource_suffix.result}"

  dashboard_body = jsonencode({
    widgets = [
      {
        type   = "metric"
        x      = 0
        y      = 0
        width  = 12
        height = 6

        properties = {
          metrics = [
            ["AWS/ApplicationELB", "RequestCount", "LoadBalancer", aws_lb.main.arn_suffix],
            [".", "TargetResponseTime", ".", "."],
            [".", "HTTPCode_Target_2XX_Count", ".", "."],
            [".", "HTTPCode_Target_4XX_Count", ".", "."],
            [".", "HTTPCode_Target_5XX_Count", ".", "."]
          ]
          view    = "timeSeries"
          stacked = false
          region  = var.aws_region
          title   = "Application Load Balancer Metrics"
          period  = 300
        }
      },
      {
        type   = "metric"
        x      = 0
        y      = 6
        width  = 12
        height = 6

        properties = {
          metrics = [
            ["AWS/ECS", "CPUUtilization", "ServiceName", aws_ecs_service.app.name, "ClusterName", aws_ecs_cluster.main.name],
            [".", "MemoryUtilization", ".", ".", ".", "."]
          ]
          view    = "timeSeries"
          stacked = false
          region  = var.aws_region
          title   = "ECS Service Metrics"
          period  = 300
        }
      },
      {
        type   = "metric"
        x      = 0
        y      = 12
        width  = 12
        height = 6

        properties = {
          metrics = [
            ["AWS/RDS", "CPUUtilization", "DBInstanceIdentifier", aws_db_instance.main.id],
            [".", "DatabaseConnections", ".", "."],
            [".", "FreeableMemory", ".", "."],
            [".", "FreeStorageSpace", ".", "."]
          ]
          view    = "timeSeries"
          stacked = false
          region  = var.aws_region
          title   = "RDS Database Metrics"
          period  = 300
        }
      }
    ]
  })
}

# Application-specific CloudWatch Alarms

# High Error Rate Alarm
resource "aws_cloudwatch_metric_alarm" "high_error_rate" {
  alarm_name          = "${var.project_name}-high-error-rate-${random_string.resource_suffix.result}"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "2"
  metric_name         = "HTTPCode_Target_5XX_Count"
  namespace           = "AWS/ApplicationELB"
  period              = "300"
  statistic           = "Sum"
  threshold           = "10"
  alarm_description   = "This metric monitors 5XX error rate"
  alarm_actions       = [aws_sns_topic.alerts.arn]
  ok_actions          = [aws_sns_topic.alerts.arn]

  dimensions = {
    LoadBalancer = aws_lb.main.arn_suffix
  }

  tags = {
    Name        = "${var.project_name}-high-error-rate-${random_string.resource_suffix.result}"
    Environment = var.environment
    Project     = var.project_name
  }
}

# High Response Time Alarm
resource "aws_cloudwatch_metric_alarm" "high_response_time" {
  alarm_name          = "${var.project_name}-high-response-time-${random_string.resource_suffix.result}"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "2"
  metric_name         = "TargetResponseTime"
  namespace           = "AWS/ApplicationELB"
  period              = "300"
  statistic           = "Average"
  threshold           = "2"
  alarm_description   = "This metric monitors response time"
  alarm_actions       = [aws_sns_topic.alerts.arn]
  ok_actions          = [aws_sns_topic.alerts.arn]

  dimensions = {
    LoadBalancer = aws_lb.main.arn_suffix
  }

  tags = {
    Name        = "${var.project_name}-high-response-time-${random_string.resource_suffix.result}"
    Environment = var.environment
    Project     = var.project_name
  }
}

# Database Connection Alarm
resource "aws_cloudwatch_metric_alarm" "high_db_connections" {
  alarm_name          = "${var.project_name}-high-db-connections-${random_string.resource_suffix.result}"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "2"
  metric_name         = "DatabaseConnections"
  namespace           = "AWS/RDS"
  period              = "300"
  statistic           = "Average"
  threshold           = "80"
  alarm_description   = "This metric monitors database connections"
  alarm_actions       = [aws_sns_topic.alerts.arn]
  ok_actions          = [aws_sns_topic.alerts.arn]

  dimensions = {
    DBInstanceIdentifier = aws_db_instance.main.id
  }

  tags = {
    Name        = "${var.project_name}-high-db-connections-${random_string.resource_suffix.result}"
    Environment = var.environment
    Project     = var.project_name
  }
}

# Low Database Free Storage Alarm
resource "aws_cloudwatch_metric_alarm" "low_db_storage" {
  alarm_name          = "${var.project_name}-low-db-storage-${random_string.resource_suffix.result}"
  comparison_operator = "LessThanThreshold"
  evaluation_periods  = "1"
  metric_name         = "FreeStorageSpace"
  namespace           = "AWS/RDS"
  period              = "300"
  statistic           = "Average"
  threshold           = "2000000000" # 2GB in bytes
  alarm_description   = "This metric monitors database free storage"
  alarm_actions       = [aws_sns_topic.alerts.arn]
  ok_actions          = [aws_sns_topic.alerts.arn]

  dimensions = {
    DBInstanceIdentifier = aws_db_instance.main.id
  }

  tags = {
    Name        = "${var.project_name}-low-db-storage-${random_string.resource_suffix.result}"
    Environment = var.environment
    Project     = var.project_name
  }
}

# ECS Service Task Count Alarm
resource "aws_cloudwatch_metric_alarm" "ecs_service_tasks" {
  alarm_name          = "${var.project_name}-ecs-service-tasks-${random_string.resource_suffix.result}"
  comparison_operator = "LessThanThreshold"
  evaluation_periods  = "2"
  metric_name         = "RunningTaskCount"
  namespace           = "AWS/ECS"
  period              = "60"
  statistic           = "Average"
  threshold           = "1"
  alarm_description   = "This metric monitors ECS running tasks"
  alarm_actions       = [aws_sns_topic.alerts.arn]
  ok_actions          = [aws_sns_topic.alerts.arn]

  dimensions = {
    ServiceName = aws_ecs_service.app.name
    ClusterName = aws_ecs_cluster.main.name
  }

  tags = {
    Name        = "${var.project_name}-ecs-service-tasks-${random_string.resource_suffix.result}"
    Environment = var.environment
    Project     = var.project_name
  }
}

# X-Ray Tracing (if enabled)
resource "aws_xray_sampling_rule" "main" {
  count = var.enable_xray ? 1 : 0
  
  rule_name      = "${var.project_name}-sampling-rule"
  priority       = 9000
  version        = 1
  reservoir_size = 1
  fixed_rate     = 0.1
  url_path       = "*"
  host           = "*"
  http_method    = "*"
  service_type   = "*"
  service_name   = "*"
  resource_arn   = "*"

  tags = {
    Name        = "${var.project_name}-xray-sampling-${random_string.resource_suffix.result}"
    Environment = var.environment
    Project     = var.project_name
  }
}

# CloudWatch Log Insights Queries
resource "aws_cloudwatch_query_definition" "error_logs" {
  name = "${var.project_name}-error-logs"

  log_group_names = [
    aws_cloudwatch_log_group.app.name
  ]

  query_string = <<EOF
fields @timestamp, @message
| filter @message like /ERROR/
| sort @timestamp desc
| limit 100
EOF
}

resource "aws_cloudwatch_query_definition" "performance_logs" {
  name = "${var.project_name}-performance-logs"

  log_group_names = [
    aws_cloudwatch_log_group.app.name
  ]

  query_string = <<EOF
fields @timestamp, @message
| filter @message like /ms/ and @message like /GET|POST|PUT|DELETE/
| parse @message /(?<method>\w+)\s+(?<path>\/\S*)\s+(?<status>\d+)\s+in\s+(?<duration>\d+)ms/
| stats avg(duration) by method, path
| sort avg(duration) desc
EOF
}

# Custom Metrics for Application
resource "aws_cloudwatch_log_metric_filter" "api_response_time" {
  name           = "${var.project_name}-api-response-time"
  log_group_name = aws_cloudwatch_log_group.app.name
  pattern        = "[timestamp, level=\"express\", method, path, status, duration=\"*ms\"]"

  metric_transformation {
    name      = "APIResponseTime"
    namespace = "${var.project_name}/Application"
    value     = "$duration"
    unit      = "Milliseconds"
  }
}

resource "aws_cloudwatch_log_metric_filter" "api_errors" {
  name           = "${var.project_name}-api-errors"
  log_group_name = aws_cloudwatch_log_group.app.name
  pattern        = "[timestamp, level=\"express\", method, path, status=5*, ...]"

  metric_transformation {
    name      = "APIErrors"
    namespace = "${var.project_name}/Application"
    value     = "1"
    unit      = "Count"
  }
}