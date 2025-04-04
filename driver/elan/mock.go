package elan

import (
	"errors"
	"fmt"
	"maps"
	"math/rand"
	users "os/user"
	"slices"
	"time"
)

// This contains the code of the "mock" or fake driver.
// This exists so somebody who doesn't own an elan fingerprint reader can still work on the UI or PAM interface

type MockDevice struct {
	enrolled_fingers map[uint8]*Finger
}

type MockDriver struct {
	device *MockDevice
	driver
}

func NewMockDriver() *MockDriver {
	return &MockDriver{
		device: &MockDevice{
			enrolled_fingers: map[uint8]*Finger{
				0: &Finger{
					ID: 0,
					OwnedBy: User{
						ID:   "1001",
						Name: "Other user",
					},
					Data: "other user data",
				},
			},
		},
	}
}

func (d *MockDriver) Total() (*uint8, error) {
	total_fingers := uint8(len(d.device.enrolled_fingers))

	fmt.Printf("[Driver] Got total fingers: %v\n", total_fingers)
	return &total_fingers, nil
}

func (d *MockDriver) Verify(max_attempts uint8, channel *chan ChannelMessage) (bool, error) {
	total, err := d.Total()

	if err != nil {
		return false, err
	}

	if *total == 0 {
		fmt.Printf("[Driver] No fingers enrolled\n")
		return false, errors.New("no fingers enrolled")
	}

	send_random_error(channel)

	// Manually sleep to fake user interaction
	time.Sleep(3 * time.Second)

	return true, nil
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

	sys_user, err := users.Current()

	if err != nil {
		return err
	}

	d.device.enrolled_fingers[next_id] = &Finger{
		ID: next_id,
		OwnedBy: User{
			ID:   sys_user.Uid,
			Name: sys_user.Name,
		},
		Data: data,
	}

	return nil
}

func (d *MockDriver) Info(id uint8) (*Finger, error) {
	finger := d.device.enrolled_fingers[id]

	if finger == nil {
		return nil, errors.New("finger with that id not recongized")
	}

	valid_access, err := finger_owned_by_current_user(finger)

	if err != nil {
		return nil, err
	}

	// The finger was found but it doesnt match the current user
	if !valid_access {
		return nil, nil
	}

	return finger, nil
}

func (d *MockDriver) InfoAll() ([]*Finger, error) {
	values := slices.Collect(maps.Values(d.device.enrolled_fingers))
	finger_arr := make([]*Finger, 0)

	current_user, err := users.Current()

	if err != nil {
		return []*Finger{}, err
	}

	for _, finger := range values {

		if finger.OwnedBy.ID != current_user.Uid {
			finger_arr = append(finger_arr, nil)
			continue
		}

		finger_arr = append(finger_arr, finger)
	}

	return finger_arr, nil
}

func (d *MockDriver) Delete(id uint8) (bool, error) {
	finger, ok := d.device.enrolled_fingers[id]

	if !ok {
		return false, errors.New("finger with that id does not exist")
	}

	valid_access, err := finger_owned_by_current_user(finger)

	if err != nil {
		return false, err
	}

	if !valid_access {
		return false, nil
	}

	d.device.enrolled_fingers[id] = nil

	return true, nil
}

func (d *MockDriver) DeleteAll() error {
	for finger := range maps.Values(d.device.enrolled_fingers) {
		_, err := d.Delete(finger.ID)

		if err != nil {
			return err
		}
	}

	return nil
}

// Alias to DeleteAll(), this will not be the case in the actual driver
func (d *MockDriver) Reset() error {
	return d.DeleteAll()
}

func finger_owned_by_current_user(finger *Finger) (bool, error) {
	// This is cached so we don't have to worry about the performance penalty
	current_user, err := users.Current()

	if err != nil {
		return false, err
	}

	if finger.OwnedBy.ID != current_user.Uid {
		return false, nil
	}

	return true, nil
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
