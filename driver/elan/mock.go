package elan

import (
	"errors"
	"fmt"
	"math/rand"
	"os"
	"time"
)

// This contains the code of the "mock" or fake driver.
// This exists so somebody who doesn't own an elan fingerprint reader can still work on the UI or PAM interface

type MockDevice struct {
	enrolled_fingers []*finger
}

type MockDriver struct {
	device *MockDevice
	driver
}

func NewMockDriver() *MockDriver {
	return &MockDriver{
		device: &MockDevice{
			enrolled_fingers: make([]*finger, 0),
		},
	}
}

func (d *MockDriver) Total() (*uint8, error) {
	total_fingers := uint8(len(d.device.enrolled_fingers))

	fmt.Printf("[Driver] Got total fingers: %v\n", total_fingers)
	return &total_fingers, nil
}

func (d *MockDriver) Verify(max_attempts uint8, channel *chan ChannelMessage) (*bool, error) {
	total, err := d.Total()

	if err != nil {
		return nil, err
	}

	if *total == 0 {
		fmt.Printf("[Driver] No fingers enrolled\n")
		return nil, errors.New("no fingers enrolled")
	}

	send_random_error(channel)

	// Manually sleep to fake user interaction
	time.Sleep(3 * time.Second)

	is_fingerprint_verified := true

	return &is_fingerprint_verified, nil
}

func (d *MockDriver) Enroll(total_samples uint8, data string, channel *chan ChannelMessage) error {

	total, err := d.Total()
	next_id := *total + 1

	if err != nil || next_id == 9 {
		*channel <- ERROR_MAX_ENROLLED

		return errors.New("max number enrolled")
	}

	send_random_error(channel)
	time.Sleep(3 * time.Second)

	for range total_samples {
		if channel != nil {
			defer close(*channel)
			
			*channel <- SAMPLE_VALID
			println("Sent valid sample")
			time.Sleep(time.Millisecond * 250)
		}
	}

	user_home, err := os.UserHomeDir()

	if err != nil {
		return err
	}

	d.device.enrolled_fingers = append(d.device.enrolled_fingers, &finger{
		ID: next_id,
		OwnedBy: user{
			ID:   0,
			Name: user_home,
		},
		Data: data,
	})

	return nil
}

func send_random_error(channel *chan ChannelMessage) {
	if channel == nil {
		return
	}

	max := 8
	min := 1

	msg := ChannelMessage(rand.Intn(max-min) + min)

	fmt.Printf("[Driver] Sent random channel error %v\n", msg)
	// Generates us a random error everytime, and sends it thru the error channel
	*channel <- msg
}
