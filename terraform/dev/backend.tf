terraform {
  backend "s3" {
    # These values should be provided when initializing the backend
    # bucket         = "your-terraform-state-bucket"
    # key            = "dev/terraform.tfstate"
    # region         = "ap-south-1"
    # dynamodb_table = "terraform-state-lock"
    # encrypt        = true
  }
} 