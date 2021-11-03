package entity

import (
	"gorm.io/gorm"
)

type Product struct {
	gorm.Model
	Name string

	// ProductTypeID ทำหน้าที่เป็น FK
	ProductTypeID *uint
	ProductType   ProductType    `gorm:"references:id"`
	ProductStocks []ProductStock `gorm:"foreignKey:ProductID"`
}
