using rapyd_sample.models;
using RestSharp;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

namespace rapyd_sample
{
    public class RapydClient
    {
        private readonly string _accessKey;
        private readonly string _secretKey;
        private readonly string _baseUrl;
        private readonly RestClient _client;

        public RapydClient(IConfiguration configuration)

        {
            _accessKey = configuration.GetValue<string>("AccessKey");
            _secretKey = configuration.GetValue<string>("SecretKey");
            _baseUrl = configuration.GetValue<string>("BaseRapydApiUrl");
            _client = new RestClient(_baseUrl);
        }

        public async Task<List<Customer>> GetCustomers()
        {
            var apiResponse = await MakeRequest<Response<List<Customer>>>(Method.Get, "/v1/customers");
            var result = apiResponse;
            return result?.Data;
        }

        public async Task<Customer> CreateCustomer(CreateCustomerBody body)
        {
            var apiResponse = await MakeRequest<Response<Customer>>(Method.Post, "/v1/customers", body);
            var result = apiResponse;
            return result?.Data;
        }

        public async Task<Checkout> CreatePaymentCheckout(CreateCheckoutBody body)
        {
            var apiResponse = await MakeRequest<Response<Checkout>>(Method.Post, "/v1/checkout", body);
            var result = apiResponse.Data;
            return result;
        }

        public async Task<List<PaymentMethod>> GetPaymentMethods(string country)
        {
            var apiResponse = await MakeRequest<Response<List<PaymentMethod>>>(Method.Get, $"/v1/payment_methods/country?country={country}");
            var result = apiResponse.Data;
            return result;
        }

        public async Task<PaymentMethodRequiredFields> GetPaymentMethodRequiredFields(string type)
        {
            var apiResponse = await MakeRequest<Response<PaymentMethodRequiredFields>>(Method.Get, $"/v1/payment_methods/required_fields/{type}");
            var result = apiResponse.Data;
            return result;
        }

        public async Task<Payment> CreatePayment(CreatePaymentBody body)
        {
            var apiResponse = await MakeRequest<Response<Payment>>(Method.Post, $"/v1/payments", body);
            var result = apiResponse.Data;
            return result;
        }

        public async Task<Payment> CancelPayment(string paymentId)
        {
            var apiResponse = await MakeRequest<Response<Payment>>(Method.Delete, $"/v1/payments/{paymentId}");
            var result = apiResponse.Data;
            return result;
        }

        public async Task<List<CustomerPaymentMethod>> GetCustomersPaymentMethods(string customerId)
        {
            var apiResponse = await MakeRequest<Response<List<CustomerPaymentMethod>>>(Method.Get, $"/v1/customers/{customerId}/payment_methods");
            var result = apiResponse.Data;
            return result;
        }

        public bool AuthWebhookRequest(string incomeSign, string urlPath, string salt, long timestamp, string body)
        {
            var signature = this.GenerateSignForWebhookAuth(urlPath, salt, timestamp, body);
            return signature.Equals(incomeSign);
        }

        private async Task<T> MakeRequest<T>(Method method, string urlPath, object body = null)
        {
            try
            {
                var request = PrepareRequest(method, urlPath, body);

                var response = await _client.ExecuteAsync<T>(request);

                if (response.ResponseStatus != ResponseStatus.Completed)
                {
                    throw new Exception(response.Data != null ? JsonSerializer.Serialize(response.Data) : response.Content); ;
                }
                return response.Data;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error during API request: ", ex);
                throw;
            }
        }

        private RestRequest PrepareRequest(Method method, string httpURLPath, object body = null)
        {
            try
            {
                var request = new RestRequest(httpURLPath);
                string httpBody = body is null ? "" : JsonSerializer.Serialize(body);
                string salt = GenerateRandomString(8);
                long timestamp = DateTimeOffset.Now.ToUnixTimeSeconds();
                string signature = GenerateSign(method.ToString(), httpURLPath, salt, timestamp, httpBody);

                request.Method = method;
                request.AddHeader("salt", salt);
                request.AddHeader("timestamp", timestamp.ToString());
                request.AddHeader("signature", signature);
                request.AddHeader("access_key", _accessKey);

                if (body != null)
                {
                    request.AddJsonBody(body);
                }
                return request;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error generating request options: ", ex);
                throw;
            }
        }

        private string GenerateSign(string method, string urlPath, string salt, long timestamp, string body)
        {
            try
            {
                string bodyString = String.Empty;
                if (!String.IsNullOrWhiteSpace(body))
                {
                    bodyString = body == "{}" ? "" : body;
                }

                string toSign = method.ToLower() + urlPath + salt + timestamp + _accessKey + _secretKey + bodyString;

                UTF8Encoding encoding = new UTF8Encoding();
                byte[] secretKeyBytes = encoding.GetBytes(_secretKey);
                byte[] signatureBytes = encoding.GetBytes(toSign);
                string signature = String.Empty;
                using (HMACSHA256 hmac = new HMACSHA256(secretKeyBytes))
                {
                    byte[] signatureHash = hmac.ComputeHash(signatureBytes);
                    string signatureHex = String.Concat(Array.ConvertAll(signatureHash, x => x.ToString("x2")));
                    signature = Convert.ToBase64String(encoding.GetBytes(signatureHex));
                }

                return signature;
            }
            catch (Exception)
            {
                Console.WriteLine("Error generating signature");
                throw;
            }
        }

        private string GenerateSignForWebhookAuth(string urlPath, string salt, long timestamp, string body)
        {
            try
            {
                string bodyString = String.Empty;
                if (!String.IsNullOrWhiteSpace(body))
                {
                    bodyString = body == "{}" ? "" : body;
                }

                string toSign = urlPath + salt + timestamp + _accessKey + _secretKey + bodyString;

                UTF8Encoding encoding = new UTF8Encoding();
                byte[] secretKeyBytes = encoding.GetBytes(_secretKey);
                byte[] signatureBytes = encoding.GetBytes(toSign);
                string signature = String.Empty;
                using (HMACSHA256 hmac = new HMACSHA256(secretKeyBytes))
                {
                    byte[] signatureHash = hmac.ComputeHash(signatureBytes);
                    string signatureHex = String.Concat(Array.ConvertAll(signatureHash, x => x.ToString("x2")));
                    signature = Convert.ToBase64String(encoding.GetBytes(signatureHex));
                }

                return signature;
            }
            catch (Exception)
            {
                Console.WriteLine("Error generating signature");
                throw;
            }
        }

        private string GenerateRandomString(int size)
        {
            try
            {
                using (var rng = RandomNumberGenerator.Create())
                {
                    byte[] randomBytes = new byte[size];
                    rng.GetBytes(randomBytes);
                    return String.Concat(Array.ConvertAll(randomBytes, x => x.ToString("x2")));
                }
            }
            catch (Exception)
            {
                Console.WriteLine("Error generating salt");
                throw;
            }
        }
    }
}