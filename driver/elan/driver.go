package elan

import (
	"fmt"

	charmlog "github.com/charmbracelet/log"
)

const (
	MaxEnrollments = 10

	VENDOR_ELAN  = 0x04f3
	SAMPLE_VALID = ChannelMessage(iota)
	ERROR_SLIGHT_DOWN
	ERROR_SLIGHT_RIGHT
	ERROR_SLIGHT_UP
	ERROR_SLIGHT_LEFT
	ERROR_SENSOR_DIRTY
	ERROR_UNENROLLED
	ERROR_AREA_TOO_SMALL
	ERROR_MAX_ENROLLED
	ERROR_UNKNOWN
)

type ChannelMessage (uint8)

func ChannelMessageString(c ChannelMessage) string {
	switch c {
	case SAMPLE_VALID:
		return "SAMPLE_VALID"
	case ERROR_SLIGHT_DOWN:
		return "ERROR_SLIGHT_DOWN"
	case ERROR_SLIGHT_RIGHT:
		return "ERROR_SLIGHT_RIGHT"
	case ERROR_SLIGHT_UP:
		return "ERROR_SLIGHT_UP"
	case ERROR_SLIGHT_LEFT:
		return "ERROR_SLIGHT_LEFT"
	case ERROR_SENSOR_DIRTY:
		return "ERROR_SENSOR_DIRTY"
	case ERROR_UNENROLLED:
		return "ERROR_UNENROLLED"
	case ERROR_AREA_TOO_SMALL:
		return "ERROR_AREA_TOO_SMALL"
	case ERROR_MAX_ENROLLED:
		return "ERROR_MAX_ENROLLED"
	case ERROR_UNKNOWN:
		return "ERROR_UNKNOWN"
	default:
		return fmt.Sprintf("ERROR_%d", c)
	}
}

type Driver interface {
	SetLogLevel(level charmlog.Level)

	// Returns the total number of fingers currently registered
	Total() (*uint8, error)

	// Verifies an individual finger with the max_attempts you would like to consider before failing
	// Optionally you can specify a channel that will receive events as the user is verifying their finger, use nil if you want to opt-out
	Verify(maxAttempts uint8, ch *chan ChannelMessage) (bool, error)

	// Enrolls a new finger
	// Additionally, also allows an abitrary string storage up 61 chars (4 chars are taken up by the user id itself)
	// Optionally you can specify a channel that will receive events as the user is verifying their finger, use nil if you want to opt-out
	Enroll(totalSamples uint8, data string, ch *chan ChannelMessage) error

	// Gets the info for a finger
	// This will return an error if the finger is registered by a different user
	Info(id uint8) (*Finger, error)

	// Receives info of all fingers registered
	// if a value is nil in the array it means the corresponding finger is owned by a different user
	InfoAll() ([]*Finger, error)

	// Deletes a finger based on its id
	// This will error if the current user is not the one who originally registered this finger
	Delete(id uint8) (bool, error)

	// Deletes all fingers the current user owns
	DeleteAll() error

	// Avoid use of this command, it may cause driver instability.
	// Hard resets the device, device can be left in an unknown state and require a system reboot
	// Additionally it may cause the current driver instance to be unable to contact the device without a program reset
	Reset() error
}

type User struct {
	ID   string
	Name string
}

type Finger struct {
	ID      uint8
	OwnedBy User
	Data    string
}
