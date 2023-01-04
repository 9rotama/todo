package main

import (
	"github.com/labstack/echo/v4"
	"9rtm.com/todo/model"
	"9rtm.com/todo/router"
)

func main() {
	sqlDB := model.DBConnection()
	defer sqlDB.Close()
	e := echo.New()
	router.SetRouter(e)
}