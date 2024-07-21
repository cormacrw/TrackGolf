package test
import (
	"net/http"

	"github.com/gin-gonic/gin"

)

func TestHandler(c *gin.Context) {

	c.JSON(http.StatusCreated, gin.H{"status": "success", "message": "Test successful!"})

}
