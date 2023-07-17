package main

import (
	"math/rand"
	"time"
)

const (
	HOST            = ""
	PORT            = 8080
	BASERAPYDAPIURL = "https://sandboxapi.rapyd.net"
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
