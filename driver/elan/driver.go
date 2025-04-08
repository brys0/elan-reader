package elan

import (
	"github.com/brys0/elan-driver-go/driver"
	charmlog "github.com/charmbracelet/log"
)

const (
	maxEnrollments = driver.MaxEnrollments

	SAMPLE_VALID         = driver.SAMPLE_VALID
	ERROR_SLIGHT_DOWN    = driver.ERROR_SLIGHT_DOWN
	ERROR_SLIGHT_RIGHT   = driver.ERROR_SLIGHT_RIGHT
	ERROR_SLIGHT_UP      = driver.ERROR_SLIGHT_UP
	ERROR_SLIGHT_LEFT    = driver.ERROR_SLIGHT_LEFT
	ERROR_SENSOR_DIRTY   = driver.ERROR_SENSOR_DIRTY
	ERROR_UNENROLLED     = driver.ERROR_UNENROLLED
	ERROR_AREA_TOO_SMALL = driver.ERROR_AREA_TOO_SMALL
	ERROR_MAX_ENROLLED   = driver.ERROR_MAX_ENROLLED
	ERROR_UNKNOWN        = driver.ERROR_UNKNOWN
)

type ChannelMessage = driver.ChannelMessage

func ChannelMessageString(c ChannelMessage) string {
	return driver.ChannelMessageString(c)
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
