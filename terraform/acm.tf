resource "aws_acm_certificate" "website" {
  for_each = local.has_web_domain_hostnames ? { "create" = true } : {}
  provider = aws.us-east-1

  domain_name = var.web_domain_hostnames[0]
  subject_alternative_names = [
    for url in slice(var.web_domain_hostnames, 1, length(var.web_domain_hostnames)) : url
  ]

  validation_method = "DNS"
}

resource "aws_route53_record" "validation" {
  for_each = {
    for k, cert in aws_acm_certificate.website : cert.domain_name => {
      for dvo in cert.domain_validation_options : dvo.domain_name => {
        name  = dvo.resource_record_name
        type  = dvo.resource_record_type
        value = dvo.resource_record_value
      }
    }
  }

  name    = each.value[each.key].name
  records = [each.value[each.key].value]
  ttl     = 300
  type    = each.value[each.key].type
  zone_id = data.aws_route53_zone.ai_gov_uk.zone_id
}
