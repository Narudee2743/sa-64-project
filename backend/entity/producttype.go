package entity

import (
	"gorm.io/gorm"
)

type ProductType struct {
	gorm.Model
	Ptype    string
	Products []Product `gorm:"foreignKey:ProductTypeID"`
}
