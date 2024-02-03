resource "aws_db_instance" "trackut_db" {
  allocated_storage    = 20
  db_name              = "trackut"
  engine               = "postgres"
  engine_version       = "15.4"
  identifier           = "trackut-pg"
  instance_class       = "db.t3.micro"
  username             = "cormac"
  password             = "camrocnosmailliw"
  skip_final_snapshot  = true
  publicly_accessible = true
}