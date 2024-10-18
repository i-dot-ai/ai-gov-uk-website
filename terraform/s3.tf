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

  routing_rule {
    condition {
      key_prefix_equals = "projects/consultations/"
    }
    redirect {
      host_name               = "ai.gov.uk"
      http_redirect_code      = "301"
      protocol                = "https"
      replace_key_prefix_with = "projects/consult/"
    }
  }
  routing_rule {
    condition {
      key_prefix_equals = "projects/redbox-copilot/"
    }
    redirect {
      host_name               = "ai.gov.uk"
      http_redirect_code      = "301"
      protocol                = "https"
      replace_key_prefix_with = "projects/redbox/"
    }
  }
}

resource "aws_s3_bucket_policy" "website" {
  bucket = aws_s3_bucket.website.id
  policy = data.aws_iam_policy_document.website.json
}
