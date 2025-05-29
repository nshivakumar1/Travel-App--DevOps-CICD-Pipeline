#!/bin/bash

# Generate a secure random password for the database
DB_PASSWORD=$(openssl rand -base64 32)

# Set environment variables
export TF_VAR_db_username="admin"
export TF_VAR_db_password="$DB_PASSWORD"

# Get AWS account ID
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)

# Set the EKS cluster role ARN
export TF_VAR_cluster_role_arn="arn:aws:iam::${AWS_ACCOUNT_ID}:role/eks-cluster-role"

echo "Environment variables have been set:"
echo "TF_VAR_db_username: $TF_VAR_db_username"
echo "TF_VAR_db_password: [HIDDEN]"
echo "TF_VAR_cluster_role_arn: $TF_VAR_cluster_role_arn"

# Save the database password to AWS Secrets Manager
aws secretsmanager create-secret \
    --name "travel-app/dev/db-password" \
    --description "Database password for Travel App dev environment" \
    --secret-string "$DB_PASSWORD" \
    --region "us-west-2"

echo "Database password has been saved to AWS Secrets Manager" 