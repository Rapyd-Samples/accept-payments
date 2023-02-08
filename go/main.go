package main

import (
	"math/rand"
	"time"
)

const (
	BASERAPYDAPIURL  = "https://sandboxapi.rapyd.net"
	// When deploying to a server, set localhost = "" and port = 80.
	HOST = "localhost"
	PORT = 8080
)

func main() {
	startServer()
}

// Pre-Go 1.20 code calls Seed(1) at startup.
// The salt for the Rapyd authentication must be different
// each time, so we need to seed the RNG with a randomized start value.
// If you use Go 1.20 or later, you do not need this Seed call.
func init() {
	rand.Seed(time.Now().UnixNano())
}
