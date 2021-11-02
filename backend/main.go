package main

import (
	"github.com/Narudee2743/sa-64-project/controller"
	"github.com/Narudee2743/sa-64-project/entity"
	"github.com/Narudee2743/sa-64-project/middlewares"
	"github.com/gin-gonic/gin"
)

func main() {
	entity.SetupDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())

	api := r.Group("")
	{
		protected := api.Use(middlewares.Authorizes())
		{
			// User Routes
			protected.GET("/users/:id", controller.ListUsers)
			protected.GET("/user/:id", controller.GetUser)
			protected.PATCH("/users", controller.UpdateUser)
			protected.DELETE("/users/:id", controller.DeleteUser)

			// Order Routes
			protected.GET("/orders/:id", controller.ListOrders)
			protected.GET("/order/:id", controller.GetOrder)
			protected.POST("/orders", controller.CreateOrder)
			protected.PATCH("/orders", controller.UpdateOrder)
			protected.DELETE("/orders/:id", controller.DeleteOrder)

			// Staff Routes
			protected.GET("/staffs", controller.ListStaffs)
			protected.GET("/staff/:id", controller.GetStaff)
			protected.POST("/staffs", controller.CreateStaff)
			protected.PATCH("/staffs", controller.UpdateStaff)
			protected.DELETE("/staffs/:id", controller.DeleteStaff)

			// WatchVideo Routes
			protected.GET("/return_s/:id", controller.ListReturns)
			protected.GET("/return/:id", controller.GetReturn)
			protected.POST("/return_s", controller.CreateReturnod)
			protected.PATCH("/returns", controller.UpdateReturn)
			protected.DELETE("/return_s/:id", controller.DeleteReturn)

		}
	}

	// User Routes
	r.POST("/users", controller.CreateUser)

	// Authentication Routes
	r.POST("/login", controller.Login)

	// Run the server
	r.Run()
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
