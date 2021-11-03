package entity

import (
	"time"

	"gorm.io/gorm"
)

type Order struct {
	gorm.Model
	// UserID ทำหน้าที่เป็น FK
	UserID     *uint
	User       User `gorm:"references:id"`
	PreorderID int
	StatusID   int
	OrderTime  time.Time
	Returns    []Return `gorm:"foreignKey:OrderID"`
}
