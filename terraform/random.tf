resource "random_password" "cloudfront_identifier" {
  length  = 32
  special = false
}