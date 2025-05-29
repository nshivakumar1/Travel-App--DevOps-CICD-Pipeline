aws_region = "us-west-2"
environment = "dev"
vpc_cidr = "10.0.0.0/16"
private_subnet_cidrs = ["10.0.1.0/24", "10.0.2.0/24"]
public_subnet_cidrs = ["10.0.101.0/24", "10.0.102.0/24"]
availability_zones = ["us-west-2a", "us-west-2b"]
cluster_version = "1.27"

# These values should be provided securely, not stored in version control
# You can provide these values through environment variables or AWS Secrets Manager
# db_username = "admin"
# db_password = "your-secure-password"
# cluster_role_arn = "arn:aws:iam::YOUR_ACCOUNT_ID:role/eks-cluster-role" 