package entity

import (
	"gorm.io/gorm"
)

type Preorder struct {
	gorm.Model
	Amount int

	// UserID ทำหน้าที่เป็น FK
	UserID *uint
	User   User `gorm:"references:id"`

	// ProductID ทำหน้าที่เป็น FK
	ProductID *uint
	Product   Product `gorm:"references:id"`

	// PaymentmethodID ทำหน้าที่เป็น FK
	PaymentMethodID *uint
	PaymentMethod   PaymentMethod `gorm:"references:id"`
}
