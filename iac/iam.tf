resource "aws_iam_policy" "sls_policy" {
  name        = "sls_policy"
  path        = "/"
  description = "Serverless policy"

  # Terraform's "jsonencode" function converts a
  # Terraform expression result to valid JSON syntax.
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "dynamodb:BatchGetItem",
          "dynamodb:BatchWriteItem",
          "dynamodb:DeleteItem",
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:Query",
          "dynamodb:Scan",
        ]
        Effect   = "Allow"
        Resource = "${aws_dynamodb_table.trackut_table.arn}"
      },
    ]
  })
}

resource "aws_iam_role" "sls_role" {
  name               = "trackut_sls_role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Sid    = ""
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      },
    ]
  })
}

resource "aws_iam_role_policy_attachment" "sls_attachment" {
  role       = aws_iam_role.sls_role.name
  policy_arn = aws_iam_policy.sls_policy.arn
}