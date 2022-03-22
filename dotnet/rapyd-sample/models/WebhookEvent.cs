using System.Text.Json.Serialization;

namespace rapyd_sample.models
{
    public class WebhookEvent
    {
        [JsonPropertyName("id")]
        public string Id { get; set; }

        [JsonPropertyName("timestamp")]
        public DateTime Timestamp { get; set; }

        [JsonPropertyName("type")]
        public string Type { get; set; }

        [JsonPropertyName("data")]
        public object Data { get; set; }
    }
}