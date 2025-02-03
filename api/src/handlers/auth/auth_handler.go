package auth

import (
	"net/http"

	Data "cormactech/trackut-api/src/data"
	AuthTypes "cormactech/trackut-api/src/types/auth"
	ModelTypes "cormactech/trackut-api/src/types/models"

	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	"github.com/gin-gonic/gin"
)

func AuthTestHandler(c *gin.Context) {

	c.JSON(http.StatusCreated, gin.H{"status": "success", "message": "Auth test successful!"})
}

func SignInHandler(c *gin.Context) {
	var body AuthTypes.LoginRequestBody

	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	client, err := Data.GetDynamoDBClient()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	user := ModelTypes.User{}

	if body.UserId == "" {
		user.PrimaryKey = "user:" + body.UserId
		user.SortKey = "metadata:user"
		user.Email = body.Email
		user.UserId = body.UserId

		err = Data.PutItem(client, user)
		
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
	} else {
		item, err := Data.GetItem(client, "user:" + body.UserId, "metadata:user")

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		if item == nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		} else {
			err = dynamodbattribute.UnmarshalMap(item, &user)

			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
		}
	}

	c.JSON(http.StatusOK, gin.H{"status": "success", "message": "Auth test successful!", "user": user})
}
