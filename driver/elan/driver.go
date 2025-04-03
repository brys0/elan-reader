package elan

import "github.com/google/gousb"

const (

	ERROR_SLIGHT_DOWN = ErrorChannelMessage(iota)
	ERROR_SLIGHT_RIGHT
	ERROR_SLIGHT_UP
	ERROR_SLIGHT_LEFT
	ERROR_SENSOR_DIRTY
	ERROR_UNENROLLED
	ERROR_AREA_TOO_SMALL
	ERROR_MAX_ENROLLED
	ERROR_UNKNOWN
)

type ErrorChannelMessage(uint8)

type Driver interface {
	device *gousb.Device

	// Returns the total number of fingers currently registered
	Total() (error, *uint8)

	// Verifies an individual finger with the max_attempts you would like to consider before failing
	// Optionally you can specify a channel that will receive events as the user is verifying their finger, use nil if you want to opt-out
	Verify(max_attempts uint8, channel *chan ErrorErrorChannelMessage) (error, *bool)

	// Enrolls a new finger
	// Additionally, also allows an abitrary string storage up 61 chars (4 chars are taken up by the user id itself)
	// Optionally you can specify a channel that will receive events as the user is verifying their finger, use nil if you want to opt-out
	Enroll(total_samples uint8, data string, channel *chan ErrorErrorChannelMessage) (error, *bool)

	// Gets the info for a finger
	// This will return an error if the finger is registered by a different user
	Info(id uint8) (error, *FingerInfo)

	// Receives info of all fingers registered
	// if a value is nil in the array it means the corresponding finger is owned by a different user
	InfoAll() (error, []*FingerInfo)

	// Deletes a finger based on its id
	// This will error if the current user is not the one who originally registered this finger
	Delete(id uint8) (error, *bool)

	// Deletes all fingers the current user owns
	DeleteAll() (error)

	// Avoid use of this command, it may cause driver instability.
	// Hard resets the device, device can be left in an unknown state and require a system reboot
	// Additionally it may cause the current driver instance to be unable to contact the device without a program reset
	Reset() (error)
}

type User struct {
	ID uint8
	Name string
}

type FingerInfo struct {
	ID uint8
	OwnedBy User
	Data string
}
