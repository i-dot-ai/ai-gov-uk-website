locals {
  has_web_domain_hostnames = length(var.web_domain_hostnames) > 0
}

resource "aws_cloudfront_distribution" "website" {
  provider = aws.us-east-1

  origin {
    domain_name = aws_s3_bucket_website_configuration.website.website_endpoint
    origin_id   = aws_s3_bucket.website.bucket_regional_domain_name

    custom_origin_config {
      http_port                = 80
      https_port               = 443
      origin_keepalive_timeout = 5
      origin_protocol_policy   = "http-only"
      origin_read_timeout      = 30
      origin_ssl_protocols = [
        "TLSv1.2"
      ]
    }

    custom_header {
      name  = "Referer"
      value = random_password.cloudfront_identifier.result
    }
  }

  enabled     = true
  price_class = "PriceClass_All"
  aliases     = [for url in var.web_domain_hostnames : url]
  web_acl_id  = aws_wafv2_web_acl.website.arn

  is_ipv6_enabled = true

  default_cache_behavior {
    allowed_methods = ["GET", "HEAD"]
    cached_methods  = ["GET", "HEAD"]

    cache_policy_id  = "658327ea-f89d-4fab-a63d-7e88639e58f6" # CachingOptimized
    target_origin_id = aws_s3_bucket.website.bucket_regional_domain_name

    compress               = true
    viewer_protocol_policy = "redirect-to-https"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  custom_error_response {
    error_code         = 404
    response_code      = 404
    response_page_path = "/404.html"
  }

  dynamic "viewer_certificate" {
    for_each = local.has_web_domain_hostnames ? {} : { "create" = false }
    content {
      cloudfront_default_certificate = true
    }
  }

  dynamic "viewer_certificate" {
    for_each = local.has_web_domain_hostnames ? { "create" = true } : {}
    content {
      cloudfront_default_certificate = false
      acm_certificate_arn            = aws_acm_certificate.website["create"].arn
      ssl_support_method             = "sni-only"
      minimum_protocol_version       = "TLSv1.2_2021"
    }
  }
}

resource "aws_route53_record" "website" {
  for_each = toset(var.web_domain_hostnames)

  zone_id = data.aws_route53_zone.ai_gov_uk.zone_id

  name = each.value
  type = "A"

  alias {
    name                   = aws_cloudfront_distribution.website.domain_name
    zone_id                = "Z2FDTNDATAQYW2"
    evaluate_target_health = false
  }
}
