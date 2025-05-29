# Configure AWS Provider
provider "aws" {
  region = var.aws_region
}

# Create VPC
module "vpc" {
  source = "./modules/vpc"

  vpc_cidr             = var.vpc_cidr
  environment          = var.environment
  availability_zones   = var.availability_zones
  private_subnet_cidrs = var.private_subnet_cidrs
  public_subnet_cidrs  = var.public_subnet_cidrs
}

# Create EKS Cluster
module "eks" {
  source = "./modules/eks"

  cluster_name    = var.cluster_name
  cluster_version = var.cluster_version
  vpc_id          = module.vpc.vpc_id
  subnet_ids      = module.vpc.private_subnet_ids
  environment     = var.environment
}

# Create RDS Instance
module "rds" {
  source = "./modules/rds"

  identifier        = var.db_identifier
  engine            = var.db_engine
  engine_version    = var.db_engine_version
  instance_class    = var.db_instance_class
  allocated_storage = var.db_allocated_storage
  db_name           = var.db_name
  username          = var.db_username
  password          = var.db_password
  vpc_id            = module.vpc.vpc_id
  subnet_ids        = module.vpc.private_subnet_ids
  environment       = var.environment
}

# Create S3 Bucket for Static Content
module "s3" {
  source = "./modules/s3"

  bucket_name = var.bucket_name
  environment = var.environment
}

# Create Security Groups
module "security" {
  source = "./modules/security"

  vpc_id      = module.vpc.vpc_id
  environment = var.environment
}

# Outputs
output "vpc_id" {
  value = module.vpc.vpc_id
}

output "eks_cluster_endpoint" {
  value = module.eks.cluster_endpoint
}

output "rds_endpoint" {
  value = module.rds.endpoint
}

output "s3_bucket_name" {
  value = module.s3.bucket_name
} 