locals {
  waf_name = var.environment == "prod" ? "ai-gov-uk" : "ai-gov-uk-${var.environment}"

  rules = {
    aws_bad_inputs_rule = {
      name     = "AWSManagedRulesKnownBadInputsRuleSet"
      priority = 0
    }
    aws_anonymous_ip_list_rule = {
      name     = "AWSManagedRulesAnonymousIpList"
      priority = 1
    }
    aws_bot_control_rule = {
      name     = "AWSManagedRulesBotControlRuleSet"
      priority = 2
    }
    rate_limit = {
      name     = "rate-limit"
      priority = 3
    }
  }
}

resource "aws_wafv2_web_acl" "website" {
  provider = aws.us-east-1

  name  = local.waf_name
  scope = "CLOUDFRONT"

  default_action {
    allow {}
  }

  visibility_config {
    cloudwatch_metrics_enabled = true
    metric_name                = local.waf_name
    sampled_requests_enabled   = true
  }

  rule {
    name     = local.rules.aws_bad_inputs_rule.name
    priority = local.rules.aws_bad_inputs_rule.priority
    override_action {
      none {}
    }

    statement {
      managed_rule_group_statement {
        name        = local.rules.aws_bad_inputs_rule.name
        vendor_name = "AWS"
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "${local.waf_name}-${local.rules.aws_bad_inputs_rule.name}"
      sampled_requests_enabled   = true
    }
  }

  rule {
    name     = local.rules.aws_anonymous_ip_list_rule.name
    priority = local.rules.aws_anonymous_ip_list_rule.priority
    override_action {
      none {}
    }

    statement {
      managed_rule_group_statement {
        name        = local.rules.aws_anonymous_ip_list_rule.name
        vendor_name = "AWS"
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "${local.waf_name}-${local.rules.aws_anonymous_ip_list_rule.name}"
      sampled_requests_enabled   = true
    }
  }

  rule {
    name     = local.rules.aws_bot_control_rule.name
    priority = local.rules.aws_bot_control_rule.priority
    override_action {
      none {}
    }

    statement {
      managed_rule_group_statement {
        name        = local.rules.aws_bot_control_rule.name
        vendor_name = "AWS"

        managed_rule_group_configs {
          aws_managed_rules_bot_control_rule_set {
            inspection_level = "COMMON"
          }
        }
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "${local.waf_name}-${local.rules.aws_bot_control_rule.name}"
      sampled_requests_enabled   = true
    }
  }

  rule {
    name     = local.rules.rate_limit.name
    priority = local.rules.rate_limit.priority
    action {
      block {}
    }

    statement {
      rate_based_statement {
        limit              = var.waf_rate_limit
        aggregate_key_type = "IP"
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "${local.waf_name}-${local.rules.rate_limit.name}"
      sampled_requests_enabled   = true
    }
  }
}
