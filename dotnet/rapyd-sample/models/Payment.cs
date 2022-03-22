using System.Text.Json.Serialization;

namespace rapyd_sample.models
{
    public class CreatePaymentBody
    {
        [JsonPropertyName("amount")]
        public float Amount { get; set; }

        [JsonPropertyName("country")]
        public string Country { get; set; }

        [JsonPropertyName("currency")]
        public string Currency { get; set; }

        [JsonPropertyName("payment_method")]
        public string PaymentMethodId { get; set; }

        [JsonPropertyName("customer")]
        public string CustomerId { get; set; }

        [JsonPropertyName("complete_payment_url")]
        public string CompletePaymentUrl { get; set; }

        [JsonPropertyName("error_payment_url")]
        public string ErrorPaymentUrl { get; set; }

        [JsonPropertyName("complete_checkout_url")]
        public string CompleteCheckoutUrl { get; set; }
    }

    public class Payment
    {
        public string Id { get; set; }
    }
}