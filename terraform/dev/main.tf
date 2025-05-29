provider "aws" {
  region = var.aws_region
}

module "vpc" {
  source = "../modules/vpc"

  environment            = var.environment
  vpc_cidr              = var.vpc_cidr
  private_subnet_cidrs  = var.private_subnet_cidrs
  public_subnet_cidrs   = var.public_subnet_cidrs
  availability_zones    = var.availability_zones
}

module "security" {
  source = "../modules/security"

  environment = var.environment
  vpc_id      = module.vpc.vpc_id
}

module "eks" {
  source = "../modules/eks"

  environment        = var.environment
  cluster_name      = "${var.environment}-cluster"
  cluster_version   = var.cluster_version
  subnet_ids        = module.vpc.private_subnet_ids
  cluster_role_arn  = var.cluster_role_arn
}

module "rds" {
  source = "../modules/rds"

  identifier         = "${var.environment}-db"
  engine            = "postgres"
  engine_version    = "14.7"
  instance_class    = "db.t3.micro"
  allocated_storage = 20
  db_name           = "travelapp"
  username          = var.db_username
  password          = var.db_password
  subnet_ids        = module.vpc.private_subnet_ids
  security_group_ids = [module.security.security_group_id]
}

module "s3" {
  source = "../modules/s3"

  bucket_name  = "${var.environment}-travel-app-bucket"
  environment  = var.environment
} 