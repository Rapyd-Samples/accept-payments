package main

type CheckoutPage struct {
	Description         string  `json:"description"`
	Amount              float64 `json:"amount"`
	Country             string  `json:"country"`
	Currency            string  `json:"currency"`
	CompleteCheckoutURL string  `json:"complete_checkout_url"`
	CancelCheckoutURL   string  `json:"cancel_checkout_url"`
}

type CheckoutPageResponse struct {
	Status Status `json:"status"`
	Data   Data   `json:"data"`
}
type Status struct {
	ErrorCode    string `json:"error_code"`
	Status       string `json:"status"`
	Message      string `json:"message"`
	ResponseCode string `json:"response_code"`
	OperationID  string `json:"operation_id"`
}
type MerchantCustomerSupport struct {
}
type PaymentMethodData struct {
}
type Metadata struct {
	MerchantDefined bool `json:"merchant_defined"`
}
type VisualCodes struct {
}
type TextualCodes struct {
}
type Instructions struct {
}
type PaymentMethodOptions struct {
}
type Payment struct {
	ID                        interface{}          `json:"id"`
	Amount                    float64              `json:"amount"`
	OriginalAmount            int                  `json:"original_amount"`
	IsPartial                 bool                 `json:"is_partial"`
	CurrencyCode              string               `json:"currency_code"`
	CountryCode               string               `json:"country_code"`
	Status                    interface{}          `json:"status"`
	Description               string               `json:"description"`
	MerchantReferenceID       string               `json:"merchant_reference_id"`
	CustomerToken             interface{}          `json:"customer_token"`
	PaymentMethod             interface{}          `json:"payment_method"`
	PaymentMethodData         PaymentMethodData    `json:"payment_method_data"`
	Expiration                int                  `json:"expiration"`
	Captured                  bool                 `json:"captured"`
	Refunded                  bool                 `json:"refunded"`
	RefundedAmount            int                  `json:"refunded_amount"`
	ReceiptEmail              interface{}          `json:"receipt_email"`
	RedirectURL               interface{}          `json:"redirect_url"`
	CompletePaymentURL        string               `json:"complete_payment_url"`
	ErrorPaymentURL           string               `json:"error_payment_url"`
	ReceiptNumber             interface{}          `json:"receipt_number"`
	FlowType                  interface{}          `json:"flow_type"`
	Address                   interface{}          `json:"address"`
	StatementDescriptor       interface{}          `json:"statement_descriptor"`
	TransactionID             interface{}          `json:"transaction_id"`
	CreatedAt                 int                  `json:"created_at"`
	UpdatedAt                 int                  `json:"updated_at"`
	Metadata                  Metadata             `json:"metadata"`
	FailureCode               interface{}          `json:"failure_code"`
	FailureMessage            interface{}          `json:"failure_message"`
	Paid                      bool                 `json:"paid"`
	PaidAt                    int                  `json:"paid_at"`
	Dispute                   interface{}          `json:"dispute"`
	Refunds                   interface{}          `json:"refunds"`
	Order                     interface{}          `json:"order"`
	Outcome                   interface{}          `json:"outcome"`
	VisualCodes               VisualCodes          `json:"visual_codes"`
	TextualCodes              TextualCodes         `json:"textual_codes"`
	Instructions              Instructions         `json:"instructions"`
	EwalletID                 interface{}          `json:"ewallet_id"`
	Ewallets                  []interface{}        `json:"ewallets"`
	PaymentMethodOptions      PaymentMethodOptions `json:"payment_method_options"`
	PaymentMethodType         interface{}          `json:"payment_method_type"`
	PaymentMethodTypeCategory interface{}          `json:"payment_method_type_category"`
	FxRate                    interface{}          `json:"fx_rate"`
	MerchantRequestedCurrency interface{}          `json:"merchant_requested_currency"`
	MerchantRequestedAmount   interface{}          `json:"merchant_requested_amount"`
	FixedSide                 interface{}          `json:"fixed_side"`
	PaymentFees               interface{}          `json:"payment_fees"`
	Invoice                   interface{}          `json:"invoice"`
	Escrow                    interface{}          `json:"escrow"`
	GroupPayment              interface{}          `json:"group_payment"`
	CancelReason              interface{}          `json:"cancel_reason"`
	InitiationType            string               `json:"initiation_type"`
	Mid                       interface{}          `json:"mid"`
	NextAction                string               `json:"next_action"`
}
type CustomElements struct {
	SaveCardDefault           bool `json:"save_card_default"`
	DisplayDescription        bool `json:"display_description"`
	PaymentFeesDisplay        bool `json:"payment_fees_display"`
	MerchantCurrencyOnly      bool `json:"merchant_currency_only"`
	BillingAddressCollect     bool `json:"billing_address_collect"`
	DynamicCurrencyConversion bool `json:"dynamic_currency_conversion"`
}
type Data struct {
	ID                          string                  `json:"id"`
	Status                      string                  `json:"status"`
	Language                    string                  `json:"language"`
	OrgID                       string                  `json:"org_id"`
	MerchantColor               interface{}             `json:"merchant_color"`
	MerchantLogo                interface{}             `json:"merchant_logo"`
	MerchantWebsite             string                  `json:"merchant_website"`
	MerchantCustomerSupport     MerchantCustomerSupport `json:"merchant_customer_support"`
	MerchantAlias               string                  `json:"merchant_alias"`
	MerchantTerms               interface{}             `json:"merchant_terms"`
	MerchantPrivacyPolicy       interface{}             `json:"merchant_privacy_policy"`
	PageExpiration              int                     `json:"page_expiration"`
	RedirectURL                 string                  `json:"redirect_url"`
	MerchantMainButton          string                  `json:"merchant_main_button"`
	CancelCheckoutURL           string                  `json:"cancel_checkout_url"`
	CompleteCheckoutURL         string                  `json:"complete_checkout_url"`
	Country                     string                  `json:"country"`
	Currency                    string                  `json:"currency"`
	Amount                      float64                 `json:"amount"`
	Payment                     Payment                 `json:"payment"`
	PaymentMethodType           interface{}             `json:"payment_method_type"`
	PaymentMethodTypeCategories interface{}             `json:"payment_method_type_categories"`
	PaymentMethodTypesInclude   []string                `json:"payment_method_types_include"`
	PaymentMethodTypesExclude   []interface{}           `json:"payment_method_types_exclude"`
	AccountFundingTransaction   interface{}             `json:"account_funding_transaction"`
	Customer                    interface{}             `json:"customer"`
	CustomElements              CustomElements          `json:"custom_elements"`
	Timestamp                   int                     `json:"timestamp"`
	PaymentExpiration           interface{}             `json:"payment_expiration"`
	CartItems                   []interface{}           `json:"cart_items"`
	Escrow                      interface{}             `json:"escrow"`
	EscrowReleaseDays           interface{}             `json:"escrow_release_days"`
}
