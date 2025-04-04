package main

import (
	"fmt"

	"github.com/brys0/elan-driver-go/elan"
	"github.com/wailsapp/wails/v3/pkg/application"
)

type MockDriverService struct {
	app         *application.App
	mock_driver *elan.MockDriver
}

func (m *MockDriverService) Init() {
	m.mock_driver = elan.NewMockDriver()
}

func (m *MockDriverService) Verify() (*bool, error) {
	channel := make(chan elan.ChannelMessage)

	go func() {
		for {
			msg, ok := <-channel

			if !ok {
				return
			}

			m.app.EmitEvent("error", msg)
		}
	}()

	return m.mock_driver.Verify(8, &channel)
}

func (m *MockDriverService) Enroll(total_samples uint8, data string) error {
	channel := make(chan elan.ChannelMessage)
	current_enrollments := 0

	go func() {
		for {
			msg, ok := <-channel

			if !ok {
				return
			}

			if msg != elan.SAMPLE_VALID {
				m.app.EmitEvent("error", msg)
				continue
			}

			current_enrollments++

			m.app.EmitEvent("enroll", fmt.Sprintf("%d/%d", current_enrollments, total_samples))
		}
	}()

	return m.mock_driver.Enroll(total_samples, data, &channel)
}
