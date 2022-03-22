using System.Text.Json.Serialization;

namespace rapyd_sample.models
{
    public class BaseApiResponse
    {
        public Status status { get; set; }
    }

    public class Status
    {
        [JsonPropertyName("error_code")]
        public string Error_code { get; set; }

        [JsonPropertyName("status")]
        public string OperationStatus { get; set; }

        [JsonPropertyName("message")]
        public string Message { get; set; }

        [JsonPropertyName("response_code")]
        public string Response_code { get; set; }

        [JsonPropertyName("operation_id")]
        public string Operation_id { get; set; }
    }

    public class Response<T> : BaseApiResponse
    {
        [JsonPropertyName("data")]
        public T Data { get; set; }
    }
}