package main

import (
	"github.com/brys0/elan-driver-go/elan"
	"github.com/charmbracelet/log"
	"github.com/wailsapp/wails/v3/pkg/application"
)

type EnrollmentMessage struct {
	Total   uint8 `json:"total"`
	Current int   `json:"current"`
}

type DriverService struct {
	level  log.Level
	app    *application.App
	driver elan.Driver
}

func (m *DriverService) init() {
	m.driver = elan.NewMockDriver()
	m.driver.SetLogLevel(m.level)
}

func (m *DriverService) Total() (*uint8, error) {
	return m.driver.Total()
}

func (m *DriverService) Verify() (bool, error) {
	ch := make(chan elan.ChannelMessage)
	defer close(ch)

	go func() {
		for msg := range ch {
			m.app.EmitEvent("error", elan.ChannelMessageString(msg))
		}
	}()

	return m.driver.Verify(8, &ch)
}

func (m *DriverService) Enroll(totalSamples uint8, data string) error {
	ch := make(chan elan.ChannelMessage)
	defer close(ch)

	currentSample := 0

	go func() {
		for msg := range ch {
			if msg != elan.SAMPLE_VALID {
				m.app.EmitEvent("error", elan.ChannelMessageString(msg))
				continue
			}

			currentSample++

			// This should probably emit a structured json reponse for the frontend instead
			m.app.EmitEvent("enroll", EnrollmentMessage{
				Current: currentSample,
				Total:   totalSamples,
			})
		}
	}()

	return m.driver.Enroll(totalSamples, data, &ch)
}

func (m *DriverService) Info(id uint8) (*elan.Finger, error) {
	return m.driver.Info(id)
}

func (m *DriverService) InfoAll() ([]*elan.Finger, error) {
	return m.driver.InfoAll()
}

func (m *DriverService) Delete(id uint8) (bool, error) {
	delete, err := m.driver.Delete(id)
	return delete, err
}

func (m *DriverService) DeleteAll() error {
	return m.driver.DeleteAll()
}

func (m *DriverService) Reset() error {
	return m.driver.Reset()
}
