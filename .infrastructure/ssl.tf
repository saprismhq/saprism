# SSL/TLS Configuration with ACM
# This file configures SSL certificates and HTTPS listeners

# ACM Certificate for the domain
resource "aws_acm_certificate" "app" {
  domain_name       = var.domain_name
  validation_method = "DNS"

  subject_alternative_names = [
    "*.${var.domain_name}"
  ]

  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Name        = "${var.project_name}-certificate-${random_string.resource_suffix.result}"
    Environment = var.environment
    Project     = var.project_name
  }
}

# Certificate validation (manual DNS validation required)
resource "aws_acm_certificate_validation" "app" {
  count = var.domain_name != "" ? 1 : 0
  
  certificate_arn = aws_acm_certificate.app.arn
  
  timeouts {
    create = "10m"
  }

  lifecycle {
    create_before_destroy = true
  }
}

# HTTPS ALB Listener
resource "aws_lb_listener" "app_https" {
  count = var.domain_name != "" ? 1 : 0
  
  load_balancer_arn = aws_lb.main.arn
  port              = "443"
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-TLS-1-2-2017-01"
  certificate_arn   = aws_acm_certificate.app.arn

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.app.arn
  }

  depends_on = [aws_acm_certificate_validation.app]
}

# HTTP to HTTPS redirect
resource "aws_lb_listener" "app_http_redirect" {
  count = var.domain_name != "" ? 1 : 0
  
  load_balancer_arn = aws_lb.main.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type = "redirect"

    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}

# Security group rule for HTTPS traffic (if not already present)
resource "aws_security_group_rule" "alb_https_ingress" {
  count = var.domain_name != "" ? 1 : 0
  
  type              = "ingress"
  from_port         = 443
  to_port           = 443
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.alb.id
}