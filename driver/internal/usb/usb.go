package usb

import (
	"bytes"
	"encoding/binary"
	"fmt"

	"github.com/google/gousb"
)

const (
	DEVICE_INTERFACE = 0

	ENROLL_CMD        = byte('\x01')
	CAPTURE_IMG       = byte('\x09')
	ABORT_CMD         = byte('\x02')
	VERIFY_CMD        = byte('\x03')
	ENROLLED_NUM_CMD  = byte('\x04')
	DELETE_FINGER_CMD = byte('\x05')
	COMMIT_CMD        = byte('\x11')
	FINGER_INFO_CMD   = byte('\x12')
	IMG_START_CMD     = byte('\x00')
)

type ChannelMessage (uint8)

func ErrorInfo(err byte) ChannelMessage {
	switch err {
	case 0x41:
		return driver.ERROR_SLIGHT_DOWN
	case 0x42:
		return driver.ERROR_SLIGHT_RIGHT
	case 0x43:
		return driver.ERROR_SLIGHT_UP
	case 0x44:
		return driver.ERROR_SLIGHT_LEFT
	case 0xfb:
		return driver.ERROR_SENSOR_DIRTY
	case 0xfd:
		return driver.ERROR_UNENROLLED
	case 0xfe:
		return driver.ERROR_MAX_ENROLLED
	default:
		return driver.ERROR_UNKNOWN
	}
}

func CreateOutInEndpoint(i *gousb.Interface) (*gousb.OutEndpoint, *gousb.InEndpoint, error) {
	out, err := i.OutEndpoint(1)
	if err != nil {
		return nil, nil, fmt.Errorf("failed to create out endpoint: %s", err)
	}

	in, err := i.InEndpoint(3)

	if err != nil {
		return nil, nil, fmt.Errorf("failed to create an endpoint: %s", err)
	}

	return out, in, err
}

func CommandStart(size int) []byte {
	data := make([]byte, size)

	data[0] = '@'
	data[1] = '\xff'

	return data
}

func Int8AsByte(i uint8) (*byte, error) {
	buf := new(bytes.Buffer)
	err := binary.Write(buf, binary.LittleEndian, uint8(i))
	if err != nil {
		return nil, err
	}

	return &buf.Bytes()[0], nil
}

func CheckLength(writtenSize int, expectedSize int) error {
	if writtenSize != expectedSize {
		return fmt.Errorf("could not write/read all bytes (wrote %d/%d)", writtenSize, expectedSize)
	}

	return nil
}
