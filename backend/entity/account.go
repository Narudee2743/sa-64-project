package entity

import (
	"gorm.io/gorm"
)

type Contact struct {
	gorm.Model
	Ctype    string
	Accounts []Account `gorm:"foreignKey:ContactID"`
}
type Sex struct {
	gorm.Model
	Stype    string
	Accounts []Account `gorm:"foreignKey:SexID"`
}

type Olduser struct {
	gorm.Model
	Otype    string
	Accounts []Account `gorm:"foreignKey:OlduserID"`
}
type Religion struct {
	gorm.Model
	Rtype    string
	Accounts []Account `gorm:"foreignKey:ReligionID"`
}
type Account struct {
	gorm.Model
	Address    string
	Province   string
	OwnerID    *uint
	Owner      User `gorm:"references:id"`
	ContactID  *uint
	Contact    Contact `gorm:"references:id"`
	SexID      *uint
	Sex        Sex `gorm:"references:id"`
	OlduserID  *uint
	Olduser    Olduser `gorm:"references:id"`
	ReligionID *uint
	Religion   Religion `gorm:"references:id"`
}
