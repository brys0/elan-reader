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

func (m *MockDriverService) init() {
	m.mock_driver = elan.NewMockDriver()
}

func (m *MockDriverService) Total() (*uint8, error) {
	return m.mock_driver.Total()
}

func (m *MockDriverService) Verify() (bool, error) {
	ch := make(chan elan.ChannelMessage)
	defer close(ch)

	go func() {
		for msg := range ch {
			m.app.EmitEvent("error", msg)
		}
	}()

	return m.mock_driver.Verify(8, &ch)
}

func (m *MockDriverService) Enroll(totalSamples uint8, data string) error {
	ch := make(chan elan.ChannelMessage)
	defer close(ch)

	currentSample := 0

	go func() {
		for msg := range ch {
			if msg != elan.SAMPLE_VALID {
				m.app.EmitEvent("error", msg)
				continue
			}

			currentSample++

			// This should probably emit a structured json reponse for the frontend instead
			m.app.EmitEvent("enroll", fmt.Sprintf("%d/%d", currentSample, totalSamples))
		}
	}()

	return m.mock_driver.Enroll(totalSamples, data, &ch)
}

func (m *MockDriverService) Info(id uint8) (*elan.Finger, error) {
	return m.mock_driver.Info(id)
}

func (m *MockDriverService) InfoAll() ([]*elan.Finger, error) {
	return m.mock_driver.InfoAll()
}

func (m *MockDriverService) Delete(id uint8) (bool, error) {
	return m.mock_driver.Delete(id)
}

func (m *MockDriverService) DeleteAll() error {
	return m.mock_driver.DeleteAll()
}

func (m *MockDriverService) Reset() error {
	return m.mock_driver.Reset()
}
