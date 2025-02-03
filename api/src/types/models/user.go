package models

type User struct {
  PrimaryKey string `json:"tu_pk"`
  SortKey string `json:"tu_sk"`
  Email string `json:"email"`
  UserId string `json:"userId"`
}
