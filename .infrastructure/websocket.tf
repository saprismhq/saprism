# WebSocket Configuration
# This file configures ALB for WebSocket support

# Target group for WebSocket connections
resource "aws_lb_target_group" "websocket" {
  name        = "${var.project_name}-ws-tg-${random_string.resource_suffix.result}"
  port        = var.app_port
  protocol    = "HTTP"
  vpc_id      = aws_vpc.main.id
  target_type = "ip"

  # WebSocket health check
  health_check {
    enabled             = true
    healthy_threshold   = 2
    interval            = 30
    matcher             = "200"
    path                = "/health"
    port                = "traffic-port"
    protocol            = "HTTP"
    timeout             = 5
    unhealthy_threshold = 2
  }

  # Sticky sessions for WebSocket connections
  stickiness {
    type            = "lb_cookie"
    cookie_duration = 86400 # 24 hours
    enabled         = true
  }

  tags = {
    Name        = "${var.project_name}-ws-tg-${random_string.resource_suffix.result}"
    Environment = var.environment
    Project     = var.project_name
  }
}

# ALB Listener Rule for WebSocket connections (HTTP)
resource "aws_lb_listener_rule" "websocket_http" {
  listener_arn = aws_lb_listener.app.arn
  priority     = 100

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.websocket.arn
  }

  condition {
    path_pattern {
      values = ["/ws/*"]
    }
  }

  condition {
    http_header {
      http_header_name = "Upgrade"
      values           = ["websocket"]
    }
  }

  tags = {
    Name        = "${var.project_name}-ws-rule-http-${random_string.resource_suffix.result}"
    Environment = var.environment
    Project     = var.project_name
  }
}

# ALB Listener Rule for WebSocket connections (HTTPS)
resource "aws_lb_listener_rule" "websocket_https" {
  count = var.domain_name != "" ? 1 : 0
  
  listener_arn = aws_lb_listener.app_https[0].arn
  priority     = 100

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.websocket.arn
  }

  condition {
    path_pattern {
      values = ["/ws/*"]
    }
  }

  condition {
    http_header {
      http_header_name = "Upgrade"
      values           = ["websocket"]
    }
  }

  tags = {
    Name        = "${var.project_name}-ws-rule-https-${random_string.resource_suffix.result}"
    Environment = var.environment
    Project     = var.project_name
  }
}

# Update ECS service to include WebSocket target group
resource "aws_ecs_service" "websocket_attachment" {
  name            = "${var.project_name}-ws-service-${random_string.resource_suffix.result}"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.app.arn
  desired_count   = 0  # This is just for target group attachment

  network_configuration {
    security_groups  = [aws_security_group.ecs_tasks.id]
    subnets          = aws_subnet.public[*].id
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.websocket.arn
    container_name   = "${var.project_name}-container"
    container_port   = var.app_port
  }

  # Prevent conflicts with main service
  lifecycle {
    ignore_changes = [desired_count]
  }

  tags = {
    Name        = "${var.project_name}-ws-service-${random_string.resource_suffix.result}"
    Environment = var.environment
    Project     = var.project_name
  }
}