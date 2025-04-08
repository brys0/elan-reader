package driver

import "fmt"

const (
	MaxEnrollments = 10

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
