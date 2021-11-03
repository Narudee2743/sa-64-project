package entity

import (
	"time"

	"gorm.io/gorm"
)

type ProductStock struct {
	gorm.Model

	Price  int
	Amount int
	// ProductID ทำหน้าที่เป็น FK
	ProductID *uint
	Product   Product `gorm:"references:id"`

	// SupplierID  ทำหน้าที่เป็น FK
	SupplierID *uint
	Supplier   Supplier `gorm:"references:id"`

	// StaffID ทำหน้าที่เป็น FK
	StaffID *uint
	Staff   Staff `gorm:"references:id"`

	ProductTime time.Time
}
