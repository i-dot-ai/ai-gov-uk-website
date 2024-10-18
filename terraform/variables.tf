variable "runner_account_id" {
  type        = string
  description = "The AWS account from which GitHub Actions runners execute"
}

variable "website_bucket_name_root" {
  type        = string
  description = "The website bucket name, minus the environment"
}

variable "environment" {
  type        = string
  description = "The environment to which the infrastructure is being deployed"
}

variable "web_domain_hostnames" {
  type        = list(string)
  description = "A list of hostnames at which the website is hosted"
}

variable "waf_rate_limit" {
  type        = number
  description = "The number at which to rate limit requests on the WAF"
}

variable "website_bucket_deployment_roles" {
  type        = list(string)
  description = "ARNs with permitted access to the bucket to deploy bucket contents"
}
