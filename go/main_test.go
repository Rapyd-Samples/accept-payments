package main

import (
	"math/rand"
	"testing"
)

func Test_salt(t *testing.T) {
	type args struct {
		s int
	}
	tests := []struct {
		name string
		args args
		want string
	}{
		{"salt", args{s: 8}, "210fc7bb818639ac"},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			rand.Seed(1) // to get the same salt every time
			if got := randomHexString(tt.args.s); got != tt.want {
				t.Errorf("salt() = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_signature(t *testing.T) {
	type args struct {
		httpMethod string
		urlPath    string
		salt       string
		timestamp  string
		accessKey  string
		secretKey  string
		body       string
	}
	tests := []struct {
		name string
		args args
		want string
	}{
		{"signature",
			args{
				httpMethod: "GET",
				urlPath:    "/v1/data/countries",
				salt:       "f1b761c948f612a8",
				timestamp:  "123456789",
				accessKey:  "12345678901234567890",
				secretKey:  "12345678901234567890123456789012345678901234567890123456789012345678901234567890",
				body:       "",
			},
			"EpslTCitH4JEpduvbeSYhiqzbtyMP0SBJ89HXiJnEOM="},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := signature(tt.args.httpMethod, tt.args.urlPath, tt.args.salt, tt.args.timestamp, tt.args.accessKey, tt.args.secretKey, tt.args.body); got != tt.want {
				t.Errorf("signature() = %v, want %v", got, tt.want)
			}
		})
	}
}
