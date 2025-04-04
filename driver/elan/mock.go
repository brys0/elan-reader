package elan

import (
	"errors"
	"fmt"
	"maps"
	"math/rand"
	users "os/user"
	"slices"
	"time"

	charmlog "github.com/charmbracelet/log"
)

// This contains the code of the "mock" or fake driver.
// This exists so somebody who doesn't own an elan fingerprint reader can still work on the UI or PAM interface

var (
	log = charmlog.With("driver", "mock")
)

type MockDevice struct {
	enrolled_fingers map[uint8]*Finger
}

type MockDriver struct {
	log    *charmlog.Logger
	device *MockDevice
}

func NewMockDriver() *MockDriver {
	driver := &MockDriver{
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
	log.Debug("creating new mock driver", "resource", *driver)

	return driver
}

func (d *MockDriver) SetLogLevel(level charmlog.Level) {
	log.SetLevel(level)
}

func (d *MockDriver) Total() (*uint8, error) {
	totalEnrolled := uint8(len(d.device.enrolled_fingers))
	log.Debug("enrolled fingers", "total", totalEnrolled)

	return &totalEnrolled, nil
}

func (d *MockDriver) Verify(maxAttempts uint8, ch *chan ChannelMessage) (bool, error) {
	total, err := d.Total()

	if err != nil {
		log.Error("failed to get total enrolled fingers", "err", err)
		return false, err
	}

	if *total == 0 {
		err = errors.New("no fingers enrolled")
		log.Error(err)

		return false, errors.New("no fingers enrolled")
	}

	d.sendRandomError(ch)

	// Manually sleep to fake user interaction
	time.Sleep(3 * time.Second)
	log.Info("verified fingerprint")

	return true, nil
}

func (d *MockDriver) Enroll(totalSamples uint8, data string, ch *chan ChannelMessage) error {
	total, err := d.Total()
	if err != nil {
		log.Error("failed to get total enrolled fingers", "err", err)

		return fmt.Errorf("failed to get total enrolled fingers: %w", err)
	}
	nextID := *total + 1

	if nextID == maxEnrollments {
		log.Error("max enrollments reached", "max", maxEnrollments)
		if ch != nil {
			*ch <- ERROR_MAX_ENROLLED
		}
		return errors.New("maximum number of fingers already enrolled")
	}

	d.sendRandomError(ch)
	time.Sleep(3 * time.Second)

	for sample := range totalSamples {
		if ch == nil {
			continue
		}
		log.Debug("sample captured", "current", sample, "total", totalSamples)

		*ch <- SAMPLE_VALID
		time.Sleep(time.Millisecond * 250)
	}

	systemUser, err := users.Current()
	if err != nil {
		log.Error("failed to get current user", "err", err)
		return fmt.Errorf("failed to get current user: %w", err)
	}

	finger := Finger{
		ID: nextID,
		OwnedBy: User{
			ID:   systemUser.Uid,
			Name: systemUser.Name,
		},
		Data: data,
	}
	d.device.enrolled_fingers[nextID] = &finger

	log.Info("created new enrollment", "finger", finger)
	return nil
}

func (d *MockDriver) Info(id uint8) (*Finger, error) {
	finger := d.device.enrolled_fingers[id]

	if finger == nil {
		log.Error("could not get info for finger", "id", id)
		return nil, errors.New("finger with that id not recongized")
	}

	valid_access, err := isCreator(finger)

	if err != nil {
		log.Error("failed to get current user", "err", err)
		return nil, err
	}

	// The finger was found but it doesnt match the current user
	if !valid_access {
		log.Warn("could not get access to finger", "id", id)
		return nil, nil
	}

	log.Debug("got info for finger", "id", id, "info", *finger)
	return finger, nil
}

func (d *MockDriver) InfoAll() ([]*Finger, error) {
	values := slices.Collect(maps.Values(d.device.enrolled_fingers))
	fingers := make([]*Finger, 0)

	current_user, err := users.Current()

	if err != nil {
		return []*Finger{}, err
	}

	for _, finger := range values {

		if finger.OwnedBy.ID != current_user.Uid {
			fingers = append(fingers, nil)
			continue
		}

		fingers = append(fingers, finger)
	}

	return fingers, nil
}

func (d *MockDriver) Delete(id uint8) (bool, error) {
	finger, ok := d.device.enrolled_fingers[id]

	if !ok {
		return false, errors.New("finger with that id does not exist")
	}

	valid_access, err := isCreator(finger)

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

func isCreator(f *Finger) (bool, error) {
	// This is cached so we don't have to worry about the performance penalty
	currentUser, err := users.Current()

	if err != nil {
		return false, fmt.Errorf("failed to get current user: %w", err)
	}

	if f.OwnedBy.ID != currentUser.Uid {
		return false, nil
	}

	return true, nil
}

func (d *MockDriver) sendRandomError(ch *chan ChannelMessage) {
	if ch == nil {
		return
	}

	const (
		// Set max to last error iota
		max = int(ERROR_UNKNOWN)
		// Set min to first error state
		min = int(ERROR_SLIGHT_DOWN)
	)

	errorMessage := ChannelMessage(rand.Intn(max-min) + min)

	// Generates us a random error everytime, and sends it thru the error channel
	*ch <- errorMessage
}
