package entity

import (
	"time"

	"gorm.io/gorm"
)

type Order struct {
	gorm.Model
	OrderTime time.Time
	// USERID ทำหน้าที่เป็น FK
	UserID *uint
	User   User `gorm:"references:id"`

	// PreorderListID ทำหน้าที่เป็น FK
	PreorderID *uint
	Preorder   Preorder

	// StatusID ทำหน้าที่เป็น FK
	StatusID *uint
	Status   Status `gorm:"references:id"`

	Preorders []Preorder `gorm:"foreignKey:OrderID"`
	Payment   []Payment  `gorm:"foreignKey:OrderID"`
	Returns   []Return   `gorm:"foreignKey:OrderID"`
}

type Status struct {
	gorm.Model
	Statusorder string
	// 1 status มีได้หลาย order
	Orders []Order `gorm:"foreignKey:StatusID"`
}
