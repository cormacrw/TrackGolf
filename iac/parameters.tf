# resource "aws_ssm_parameter" "db_parameter" {
#   name        = "/database/${var.DB_TABLE_NAME}/table"
#   description = "Table name of the ${var.DB_TABLE_NAME} database"
#   type        = "SecureString"
#   value       = "${aws_dynamodb_table.trackut_table.id}"
# }

# resource "aws_ssm_parameter" "db_arn" {
#   name        = "/database/trackut/arn"
#   description = "Table name of the ${var.DB_TABLE_NAME} database"
#   type        = "SecureString"
#   value       = "${aws_dynamodb_table.trackut_table.arn}"
# }

# resource "aws_ssm_parameter" "role_parameter" {
#   name        = "/role/sls_trackut"
#   description = "ARN of sls_trackut role"
#   type        = "SecureString"
#   value       = "${aws_iam_role.sls_role.arn}"
# }