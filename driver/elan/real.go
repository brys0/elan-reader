package elan

import (
	"github.com/google/gousb"
)

const (
	allocate_command = 3                    // @, xff, command
	allocate_enroll  = allocate_command + 4 // fingerprint id, total_attempts, attempts_done, 0?
	allocate_delete  = allocate_command + 2 // fingerprint id, x00
	allocate_info    = allocate_command + 1 // finger id
)

// This contains the code that actually interfaces with a *real* hardware device

type HardwareDriver struct {
	iface *gousb.Interface
}

func NewRealDriver(iface *gousb.Interface) *HardwareDriver {
	driver := &HardwareDriver{
		iface,
	}

	log.Debug("real driver", "driver", driver)

	return driver
}

func (d *HardwareDriver) Total() (*uint8, error) {
	out, in, err := CreateOutInEndpoint(d.iface)

	if err != nil {
		return nil, err
	}

	cmd := CommandStart(allocate_command)
	cmd[2] = VERIFY_CMD

	writtenLength, err := out.Write(cmd)
	err = CheckLength(writtenLength, 3)

	if err != nil {
		return nil, err
	}

	read := make([]byte, 2)

	readLength, err := in.Read(read)
	err = CheckLength(readLength, 3)

	if err != nil {
		return nil, err
	}

	read_int := read[1]

	return &read_int, nil
}

func (d *HardwareDriver) Verify() {

}

// func (d *HardwareDriver) Verify(maxAttempts uint8, ch *chan ChannelMessage) (bool, error) {
// 	total, err := d.Total()

// 	if err != nil {
// 		return false, err
// 	}

// 	out, in, err := usb.CreateOutInEndpoint(d.iface)

// 	if err != nil {
// 		return false, err
// 	}

// 	write := usb.CommandStart(3)

// }
