package main

import (
	"embed"
	_ "embed"
	"log/slog"
	"os"
	"time"

	"github.com/charmbracelet/log"
	"github.com/wailsapp/wails/v3/pkg/application"
)

// Wails uses Go's `embed` package to embed the frontend files into the binary.
// Any files in the frontend/dist folder will be embedded into the binary and
// made available to the frontend.
// See https://pkg.go.dev/embed for more information.

//go:embed all:frontend/dist
var assets embed.FS

// main function serves as the application's entry point. It initializes the application, creates a window,
// and starts a goroutine that emits a time-based event every second. It subsequently runs the application and
// logs any error that might occur.
func main() {
	logger := log.With("app", "elan-reader")
	logLevelEnv := os.Getenv("LOG_LEVEL")
	logLevel := log.InfoLevel

	if logLevelEnv != "" {
		lvl, err := log.ParseLevel(logLevelEnv)

		if err != nil {
			logger.Fatal("invalid log level", "must specify valid log level ex: LOG_LEVEL=debug")
		}

		logLevel = lvl
	}

	mock_service := DriverService{}

	logger.SetLevel(logLevel)
	mock_service.level = logLevel
	// Create a new Wails application by providing the necessary options.
	// Variables 'Name' and 'Description' are for application metadata.
	// 'Assets' configures the asset server with the 'FS' variable pointing to the frontend files.
	// 'Bind' is a list of Go struct instances. The frontend has access to the methods of these instances.
	// 'Mac' options tailor the application when running an macOS.
	app := application.New(application.Options{
		Name:        "Elan Reader",
		Description: "A demo of using raw HTML & CSS",
		Services: []application.Service{
			application.NewService(&mock_service),
		},
		Assets: application.AssetOptions{
			Handler: application.AssetFileServerFS(assets),
		},
		Mac: application.MacOptions{
			ApplicationShouldTerminateAfterLastWindowClosed: true,
		},
		LogLevel: slog.LevelWarn,
	})

	mock_service.app = app
	mock_service.init()

	// Create a new window with the necessary options.
	// 'Title' is the title of the window.
	// 'Mac' options tailor the window when running on macOS.
	// 'BackgroundColour' is the background colour of the window.
	// 'URL' is the URL that will be loaded into the webview.
	app.NewWebviewWindowWithOptions(application.WebviewWindowOptions{
		Title: "Elan Reader",
		Mac: application.MacWindow{
			InvisibleTitleBarHeight: 50,
			Backdrop:                application.MacBackdropTranslucent,
			TitleBar:                application.MacTitleBarHiddenInset,
		},
		Linux: application.LinuxWindow{
			// This fixes some weirdness on Wayland. Because the app isn't very intensive we
			// could consider making this WebviewGpuPolicyNever by default
			// and create a togglable option to enable it if a user really wants it.
			WebviewGpuPolicy: application.WebviewGpuPolicyNever,
		},
		Frameless:        false,
		MinWidth:         380,
		MinHeight:        600,
		MaxWidth:         380,
		MaxHeight:        600,
		BackgroundColour: application.NewRGBA(27, 38, 54, 0),
		URL:              "/",
	})

	// Create a goroutine that emits an event containing the current time every second.
	// The frontend can listen to this event and update the UI accordingly.
	go func() {
		for {
			now := time.Now().Format(time.RFC1123)
			app.EmitEvent("time", now)
			time.Sleep(time.Second)
		}
	}()

	// Run the application. This blocks until the application has been exited.
	err := app.Run()

	// If an error occurred while running the application, log it and exit.
	if err != nil {
		log.Fatal(err)
	}
}
