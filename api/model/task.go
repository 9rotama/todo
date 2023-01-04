package model

import (
	"github.com/google/uuid"
	_ "gorm.io/gorm"
)

type Task struct {
	ID       uuid.UUID
	Name     string
}

func GetTasks() ([]Task, error) {
	var tasks []Task

	err := db.Find(&tasks).Error

	return tasks, err
}

func AddTask(name string) (*Task, error) {
	id, err := uuid.NewUUID()
	if err != nil {
		return nil, err
	}

	task := Task{
		ID:       id,
		Name:     name,
	}

	err = db.Create(&task).Error

	return &task, err
}

func DeleteTask(taskID uuid.UUID) error {
	err := db.Model(&Task{}).Where("id = ?", taskID).Delete(&Task{}).Error

	return err
}