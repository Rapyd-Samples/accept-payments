package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
)

type Server struct {
	rapydClient *RapydClient
}

// start an HTTP server on port 8080. Use a new server object instead of the default server.
func startServer() {
	s := Server{
		rapydClient: NewRapydClient(),
	}
	// set up the router & wire the handlers to their routes
	mux := http.NewServeMux()
	mux.HandleFunc("/", s.homeHandler)
	mux.HandleFunc("/checkout", s.checkoutHandler)
	mux.HandleFunc("/complete", s.completeHandler)
	mux.HandleFunc("/cancel", s.cancelHandler)

	// create and run the server.
	a := fmt.Sprintf("%s:%d", HOST, PORT)
	server := &http.Server{Addr: a, Handler: mux}
	log.Println("Server running on", a)
	err := server.ListenAndServe() // this call blocks until an error occurs.
	log.Println("Server error:", err)

}

// handlers for various routes

func (s Server) homeHandler(w http.ResponseWriter, r *http.Request) {
	// "/" is  a catch-all pattern if none of the other routes matches.
	// This handler shall only serve the home page, that is, if "/"
	// matches exactly. All unhandled paths shall show an HTTP 404 error.
	if r.URL.Path != "/" {
		http.NotFound(w, r)
		return
	}

	// to keep this code short and readable, the HTML pages are plain strings read from a map.
	// Real-world code would use html/template
	w.Header().Set("Content-Type", "text/html")
	fmt.Fprint(w, html["home"])

}

func (s Server) checkoutHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		// most probably, the user hit the browser's back button
		// on the Rapyd checkout page. Go to the homepage then.
		http.Redirect(w, r, "/", http.StatusFound)
		return
	}

	// Read the item count from the form, to demonstrate how the Rapyd checkout page is generated from dynamic values.
	err := r.ParseForm()
	if err != nil {
		log.Println("Failed to parse form:", err)
		http.Error(w, "Internal Error", http.StatusInternalServerError)
		return
	}
	itemCount, err := strconv.Atoi(r.Form.Get("count"))
	if err != nil {
		log.Println("Failed to parse itemCount:", err)
		http.Error(w, "Invalid item count entered", http.StatusInternalServerError)
		return
	}

	// call the Rapyd API to create the checkout page with the given item count and redirect to the checkout URL that the API call returns.
	// The hostname is required for generating the callback URLs.
	rapydCheckoutPage, err := s.createCheckoutPage(r.Host, itemCount)
	if err != nil {
		log.Println("Cannot create checkout page:", err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}
	http.Redirect(w, r, rapydCheckoutPage, http.StatusFound)
}

func (s Server) completeHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html")
	fmt.Fprint(w, html["complete"])
}

func (s Server) cancelHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html")
	fmt.Fprint(w, html["cancel"])
}

// CheckoutPage contains the data we send to the Rapyd API as JSON.
type CheckoutPage struct {
	Description         string  `json:"description"`
	Amount              float64 `json:"amount"`
	Country             string  `json:"country"`
	Currency            string  `json:"currency"`
	CompleteCheckoutURL string  `json:"complete_checkout_url"`
	CancelCheckoutURL   string  `json:"cancel_checkout_url"`
}

// createCheckoutPage calls the Rapyd API to create the hosted checkout page that has been set up in the Rapyd developer portal.
func (s *Server) createCheckoutPage(host string, c int) (string, error) {

	// create the Rapyd checkout page with data from the basket.
	checkoutPage := CheckoutPage{
		Description:         fmt.Sprintf("%d woolen socks", c),
		Amount:              5.99 * float64(c),
		Country:             "US",
		Currency:            "USD",
		CompleteCheckoutURL: fmt.Sprintf("http://%s/complete", host),
		CancelCheckoutURL:   fmt.Sprintf("http://%s/cancel", host),
	}

	reqBody, err := json.Marshal(checkoutPage)
	if err != nil {
		return "", fmt.Errorf("error marshalling json: %w", err)
	}
	log.Println("createCheckoutPage payload:", string(reqBody))
	body, err := s.rapydClient.request("POST", "/v1/checkout", reqBody)
	if err != nil {
		return "", fmt.Errorf("error calling /v1/checkout: %w", err)
	}

	// parse the response dynamically and return the redirect URL
	var checkoutResponse map[string]interface{}
	err = json.Unmarshal(body, &checkoutResponse)
	if err != nil {
		return "", fmt.Errorf("cannot unmarshal response from /v1/checkout: %w, body: %s", err, string(body))
	}
	status := checkoutResponse["status"].(map[string]interface{})
	if status["error_code"] != "" {
		return "", fmt.Errorf("error creating checkout page: %s: %s",
			status["status"],
			status["message"],
		)
	}

	data := checkoutResponse["data"].(map[string]interface{})
	return data["redirect_url"].(string), nil
}
