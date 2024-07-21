package match

import (
	"net/http"

	"github.com/gin-gonic/gin"

)

func MatchTestHandler(c *gin.Context) {

	c.JSON(http.StatusCreated, gin.H{"status": "success", "message": "Match test successful!"})

}
