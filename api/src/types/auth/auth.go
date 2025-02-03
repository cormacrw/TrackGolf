package auth

type LoginRequestBody struct {
  Email string `json:"email"`
  UserId string `json:"userId"`
}
