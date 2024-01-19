resource "aws_dynamodb_table" "trackut_table" {
  name           = "TrackUTTable"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "tutPk"
  range_key      = "tutSk"

  attribute {
    name = "tutPk"
    type = "S"
  }

  attribute {
    name = "tutSk"
    type = "S"
  }
}