package entity

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Name     string
	Email    string `gorm:"uniqueIndex"`
	Password string
	// 1 user เป็นเจ้าของได้หลาย order
	Orders []Order `gorm:"foreignKey:UserID"`
	// 1 user เป็นเจ้าของได้หลาย return
	Returns []Return `gorm:"foreignKey:OwnerID"`
}
