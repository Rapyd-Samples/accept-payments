using System.Text.Json.Serialization;

namespace rapyd_sample.models
{
    public class PaymentOption
    {
        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("type")]
        public string Type { get; set; }

        [JsonPropertyName("regex")]
        public string Regex { get; set; }

        [JsonPropertyName("description")]
        public string Description { get; set; }

        [JsonPropertyName("is_required")]
        public bool IsRequired { get; set; }

        [JsonPropertyName("is_updatable")]
        public bool IsUpdatable { get; set; }
    }

    public class AmountRangePerCurrency
    {
        [JsonPropertyName("currency")]
        public string Currency { get; set; }

        [JsonPropertyName("maximum_amount")]
        public object MaximumAmount { get; set; }

        [JsonPropertyName("minimum_amount")]
        public object MinimumAmount { get; set; }
    }

    public class PaymentMethod
    {
        [JsonPropertyName("type")]
        public string Type { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("category")]
        public string Category { get; set; }

        [JsonPropertyName("image")]
        public string Image { get; set; }

        [JsonPropertyName("country")]
        public string Country { get; set; }

        [JsonPropertyName("payment_flow_type")]
        public string PaymentFlowType { get; set; }

        [JsonPropertyName("currencies")]
        public List<string> Currencies { get; set; }

        [JsonPropertyName("status")]
        public int Status { get; set; }

        [JsonPropertyName("is_cancelable")]
        public bool IsCancelable { get; set; }

        [JsonPropertyName("payment_options")]
        public List<PaymentOption> PaymentOptions { get; set; }

        [JsonPropertyName("is_expirable")]
        public bool IsExpirable { get; set; }

        [JsonPropertyName("is_online")]
        public bool IsOnline { get; set; }

        [JsonPropertyName("is_refundable")]
        public bool IsRefundable { get; set; }

        [JsonPropertyName("minimum_expiration_seconds")]
        public int MinimumExpirationSeconds { get; set; }

        [JsonPropertyName("maximum_expiration_seconds")]
        public int MaximumExpirationSeconds { get; set; }

        [JsonPropertyName("virtual_payment_method_type")]
        public string VirtualPaymentMethodType { get; set; }

        [JsonPropertyName("is_virtual")]
        public bool IsVirtual { get; set; }

        [JsonPropertyName("multiple_overage_allowed")]
        public bool MultipleOverageAllowed { get; set; }

        [JsonPropertyName("amount_range_per_currency")]
        public List<AmountRangePerCurrency> AmountRangePerCurrency { get; set; }

        [JsonPropertyName("is_tokenizable")]
        public bool IsTokenizable { get; set; }

        [JsonPropertyName("supported_digital_wallet_providers")]
        public List<object> SupportedDigitalWalletProviders { get; set; }
    }
}