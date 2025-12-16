resource "aws_s3_bucket" "website" {
  bucket = var.environment == "prod" ? var.website_bucket_name_root : "${var.website_bucket_name_root}-${var.environment}"
}

resource "aws_s3_bucket_versioning" "website" {
  bucket = aws_s3_bucket.website.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_website_configuration" "website" {
  bucket = aws_s3_bucket.website.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "404.html"
  }

  dynamic "routing_rule" {
    for_each = var.s3_redirection_rules

    content {
      condition {
        key_prefix_equals = routing_rule.value.key_prefix_equals
      }
      redirect {
        host_name               = routing_rule.value.host_name
        http_redirect_code      = routing_rule.value.http_redirect_code
        protocol                = routing_rule.value.protocol
        replace_key_prefix_with = routing_rule.value.replace_key_prefix_with
      }
    }
  }
}

resource "aws_s3_bucket_policy" "website" {
  bucket = aws_s3_bucket.website.id
  policy = data.aws_iam_policy_document.website.json
}

resource "aws_s3_bucket_public_access_block" "website" {
  bucket = aws_s3_bucket.website.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_ownership_controls" "website" {
  bucket = aws_s3_bucket.website.id

  rule {
    object_ownership = "BucketOwnerEnforced"
  }
}
