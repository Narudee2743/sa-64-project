package entity

import (
	"gorm.io/gorm"
)

type Supplier struct {
	gorm.Model
	Name          string
	ProductStocks []ProductStock `gorm:"foreignKey:SupplierID"`
}
