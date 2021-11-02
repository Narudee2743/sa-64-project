package entity

import (
	"time"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func SetupDatabase() {
	database, err := gorm.Open(sqlite.Open("sa-64-1.db"), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schema
	database.AutoMigrate(
		&User{},
		&Order{},
		&Return{},
		&Staff{},)
	db = database

	password, err := bcrypt.GenerateFromPassword([]byte("123456"), 14)

	// ข้อมูล user
	db.Model(&User{}).Create(&User{
		Name:     "Narudee Arunno",
		Email:    "narudee@gmail.com",
		Password: string(password),
	})
	db.Model(&User{}).Create(&User{
		Name:     "Nana Lanana",
		Email:    "nana@gmail.com",
		Password: string(password),
	})

	var narudee User
	var nana User
	db.Raw("SELECT * FROM users WHERE email = ?", "narudee@gmail.com").Scan(&narudee)
	db.Raw("SELECT * FROM users WHERE email = ?", "nana@gmail.com").Scan(&nana)

	// order data
	order1 := Order{
		User:       nana,
		PreorderID: 20,
		StatusID:   1,
		Ordertime:  time.Now(),
	}

	db.Model(&Order{}).Create(&order1)

	order2 := Order{
		User:       narudee,
		PreorderID: 21,
		StatusID:   1,
		Ordertime:  time.Now(),
	}
	db.Model(&Order{}).Create(&order2)

	// staff data

	db.Model(&Staff{}).Create(&Staff{
		Name:     "Suwanan",
		Email:    "suwanan@gmail.com",
		Password: string(password),
	})

	db.Model(&Staff{}).Create(&Staff{
		Name:     "Name",
		Email:    "name@example.com",
		Password: string(password),
	})

}
