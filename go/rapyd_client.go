package main

import (
	"bytes"
	"crypto/hmac"
	"crypto/sha256"
	"encoding/base64"
	"encoding/hex"
	"fmt"
	"io"
	"log"
	"math/rand"
	"net/http"
	"os"
	"strings"
	"time"
)

type RapydClient struct {
	c *http.Client
}

func NewRapydClient() *RapydClient {
	return &RapydClient{
		c: &http.Client{
			Timeout: 10 * time.Second,
		},
	}
}

// request makes an HTTP request with the given method, URL path, and body.
// It returns the response body (if any) on succes, or an error on failure.
// The URL path must start with a version number (e.g. "/v1/data/countries").
func (rc *RapydClient) request(method string, urlPath string, body []byte) ([]byte, error) {
	// turn the body into an io.Reader
	b := bytes.NewReader(body)

	// create a request with all headers required for authentication.
	req, err := http.NewRequest(method, BASERAPYDAPIURL+urlPath, b)
	if err != nil {
		return nil, fmt.Errorf("Failed to create request: %v", err)
	}
	timestamp := fmt.Sprintf("%d", time.Now().Unix())
	salt := fmt.Sprintf("%016x", rand.Uint64())
	key := os.Getenv("RAPYD_ACCESS_KEY")
	secret := os.Getenv("RAPYD_SECRET_KEY")
	if key == "" || secret == "" {
		log.Fatalln("Please set the environment variables RAPYD_ACCESS_KEY and RAPYD_SECRET_KEY before starting the server.")
	}
	req.Header.Set("access_key", key)
	req.Header.Set("salt", salt)
	req.Header.Set("timestamp", timestamp)
	req.Header.Set("signature", signature(method, urlPath, salt, timestamp, key, secret, string(body)))

	// run the request and return the response body.
	resp, err := rc.c.Do(req)
	if err != nil {
		return nil, fmt.Errorf("Failed to send request: %v", err)
	}
	defer resp.Body.Close()
	respBody, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("Failed to read response body: %v", err)
	}
	return respBody, nil
}

// signature creates a string that is calcualted as follows: BASE64 ( HASH ( http_method + url_path + salt + timestamp + access_key + secret_key + body_string ) )
// urlPath is the path of the request without the base URL but including the API version, e.g., "/v1/data/countries".
func signature(httpMethod string, urlPath string, salt string, timestamp string, accessKey string, secretKey string, body string) string {

	// create a sha256 HMAC with the secret key
	hash := hmac.New(sha256.New, []byte(secretKey))

	// sign the request
	hash.Write([]byte(strings.ToLower(httpMethod) + urlPath + salt + timestamp + accessKey + secretKey + body))

	// get the hex digest of the hash and base64-encode it
	hexdigest := make([]byte, hex.EncodedLen(hash.Size()))
	hex.Encode(hexdigest, hash.Sum(nil))
	return base64.StdEncoding.EncodeToString(hexdigest)
}
