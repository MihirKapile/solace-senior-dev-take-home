provider "aws" {
  region = "us-west-2"
}

resource "aws_s3_bucket" "blob_bucket" {
  bucket = "solace-task-a-blob"
}

resource "aws_kms_key" "decrypt_key" {
  description = "Solace decryption key"
  enable_key_rotation = true
}

resource "aws_kms_alias" "decrypt_alias" {
  name          = "alias/solace/decrypt"
  target_key_id = aws_kms_key.decrypt_key.id
}

resource "aws_iam_role" "lambda_role" {
  name = "solace-decrypt-lambda-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Effect = "Allow",
      Principal = {
        Service = "lambda.amazonaws.com"
      },
      Action = "sts:AssumeRole"
    }]
  })
}

resource "aws_iam_policy" "lambda_policy" {
  name = "solace-decrypt-policy"
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Action = ["s3:GetObject"],
        Resource = "${aws_s3_bucket.blob_bucket.arn}/*"
      },
      {
        Effect = "Allow",
        Action = ["kms:Decrypt"],
        Resource = aws_kms_key.decrypt_key.arn
      },
      {
        Effect = "Allow",
        Action = ["logs:*"],
        Resource = "*"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_attach" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = aws_iam_policy.lambda_policy.arn
}

data "archive_file" "lambda_zip" {
  type        = "zip"
  source_file = "${path.module}/../src/lambda.py"
  output_path = "${path.module}/../src/lambda.zip"
}

resource "aws_lambda_function" "decrypt_lambda" {
  function_name = "solace-decrypt-function"
  runtime       = "python3.9"
  handler       = "lambda.lambda_handler"
  filename      = data.archive_file.lambda_zip.output_path
  role          = aws_iam_role.lambda_role.arn

  environment {
    variables = {
      BLOB_BUCKET = aws_s3_bucket.blob_bucket.bucket
    }
  }
}

resource "aws_lambda_function_url" "lambda_url" {
  function_name = aws_lambda_function.decrypt_lambda.function_name
  authorization_type = "NONE"
  cors {
    allow_origins = ["*"]
  }
}