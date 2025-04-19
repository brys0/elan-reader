package main

import (
	"github.com/brys0/elan-driver-go/elan"
	"github.com/charmbracelet/log"
	"github.com/google/gousb"
)

func main() {
	ctx := gousb.NewContext()

	defer ctx.Close()

	elan_devices, err := ctx.OpenDevices(func(desc *gousb.DeviceDesc) bool {
		return desc.Vendor == elan.VENDOR_ELAN && desc.Product == 0x0c80
	})

	if err != nil {
		log.Errorf("encountered an error when enumerating devices", "err", err)
	}
	log.Infof("devices", "device", elan_devices)

	first_device := elan_devices[0]

	if first_device == nil {
		log.Fatal("device doesnt exist")
	}

	iface, done, err := first_device.DefaultInterface()

	defer done()

	real_driver := elan.NewRealDriver(iface)

	total, err := real_driver.Total()

	if err != nil {
		log.Fatal("could not find fingers", "error", err)
	}

	log.Info("total", "fingers", total)
	// total_fingers, err := elan.NewRealDriver()
}
