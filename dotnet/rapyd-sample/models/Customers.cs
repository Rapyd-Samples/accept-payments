using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace rapyd_sample.models
{
    public class CreateCustomerBody
    {
        [Required]
        [JsonPropertyName("name")]
        public string Name { get; set; }
    }

    public class Customer
    {
        [JsonPropertyName("id")]
        public string Id { get; set; }

        [JsonPropertyName("delinquent")]
        public bool Delinquent { get; set; }

        [JsonPropertyName("discount")]
        public object Discount { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("default_payment_method")]
        public string DefaultPaymentMethod { get; set; }

        [JsonPropertyName("description")]
        public string Description { get; set; }

        [JsonPropertyName("email")]
        public string Email { get; set; }

        [JsonPropertyName("phone_number")]
        public string PhoneNumber { get; set; }

        [JsonPropertyName("invoice_prefix")]
        public string InvoicePrefix { get; set; }

        [JsonPropertyName("addresses")]
        public List<object> Addresses { get; set; }

        [JsonPropertyName("payment_methods")]
        public object PaymentMethods { get; set; }

        [JsonPropertyName("subscriptions")]
        public object Subscriptions { get; set; }

        [JsonPropertyName("created_at")]
        public int CreatedAt { get; set; }

        [JsonPropertyName("business_vat_id")]
        public string BusinessVatId { get; set; }

        [JsonPropertyName("ewallet")]
        public string Ewallet { get; set; }
    }

    public class BinDetails
    {
        [JsonPropertyName("type")]
        public string Type { get; set; }

        [JsonPropertyName("brand")]
        public string Brand { get; set; }

        [JsonPropertyName("country")]
        public string Country { get; set; }

        [JsonPropertyName("bin_number")]
        public string BinNumber { get; set; }
    }

    public class CustomerPaymentMethod
    {
        [JsonPropertyName("id")]
        public string Id { get; set; }

        [JsonPropertyName("type")]
        public string Type { get; set; }

        [JsonPropertyName("category")]
        public string Category { get; set; }

        [JsonPropertyName("metadata")]
        public Object Metadata { get; set; }

        [JsonPropertyName("image")]
        public string Image { get; set; }

        [JsonPropertyName("webhook_url")]
        public string WebhookUrl { get; set; }

        [JsonPropertyName("supporting_documentation")]
        public string SupportingDocumentation { get; set; }

        [JsonPropertyName("next_action")]
        public string NextAction { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("last4")]
        public string Last4 { get; set; }

        [JsonPropertyName("acs_check")]
        public string AcsCheck { get; set; }

        [JsonPropertyName("cvv_check")]
        public string CvvCheck { get; set; }

        [JsonPropertyName("bin_details")]
        public BinDetails BinDetails { get; set; }

        [JsonPropertyName("expiration_year")]
        public string ExpirationYear { get; set; }

        [JsonPropertyName("expiration_month")]
        public string ExpirationMonth { get; set; }

        [JsonPropertyName("fingerprint_token")]
        public string FingerprintToken { get; set; }
    }
}