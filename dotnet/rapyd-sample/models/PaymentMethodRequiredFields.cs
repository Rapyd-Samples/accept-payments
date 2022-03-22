using System.Text.Json.Serialization;

namespace rapyd_sample.models
{
    public class Field
    {
        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("type")]
        public string Type { get; set; }

        [JsonPropertyName("regex")]
        public string Regex { get; set; }

        [JsonPropertyName("is_required")]
        public bool IsRequired { get; set; }

        [JsonPropertyName("instructions")]
        public string Instructions { get; set; }
    }

    public class PaymentMethodOption
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

    public class PaymentMethodRequiredFields
    {
        [JsonPropertyName("type")]
        public string Type { get; set; }

        [JsonPropertyName("fields")]
        public List<Field> Fields { get; set; }

        [JsonPropertyName("payment_method_options")]
        public List<PaymentMethodOption> PaymentMethodOptions { get; set; }

        [JsonPropertyName("payment_options")]
        public List<PaymentOption> PaymentOptions { get; set; }

        [JsonPropertyName("minimum_expiration_seconds")]
        public object MinimumExpirationSeconds { get; set; }

        [JsonPropertyName("maximum_expiration_seconds")]
        public object MaximumExpirationSeconds { get; set; }
    }
}