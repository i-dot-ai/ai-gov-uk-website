data "aws_iam_policy_document" "website" {
  statement {
    effect = "Allow"
    actions = [
      "s3:GetObject",
    ]
    resources = [
      "${aws_s3_bucket.website.arn}/*",
    ]
    principals {
      type        = "*"
      identifiers = ["*"]
    }
  }

  dynamic "statement" {
    for_each = toset(var.web_domain_hostnames)

    content {
      effect = "Allow"
      actions = [
        "s3:GetObject",
        "s3:GetObjectVersion",
      ]
      resources = [
        aws_s3_bucket.website.arn,
        "${aws_s3_bucket.website.arn}/*",
      ]
      principals {
        type        = "*"
        identifiers = ["*"]
      }
      condition {
        test     = "StringLike"
        variable = "aws:Referer"

        values = flatten([
          for host in var.web_domain_hostnames : [
            "http://${host}/*",
            "https://${host}/*"
          ]
        ])
      }
    }
  }

  statement {
    effect = "Allow"
    actions = [
      "s3:GetObject",
      "s3:PutObject",
      "s3:ListBucket",
    ]
    resources = [
      aws_s3_bucket.website.arn,
      "${aws_s3_bucket.website.arn}/*",
    ]
    principals {
      type        = "AWS"
      identifiers = var.website_bucket_deployment_roles
    }
  }
}
