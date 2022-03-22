using Microsoft.AspNetCore.Mvc;
using rapyd_sample.models;
using System.Text;
using System.Text.Json;

namespace rapyd_sample.Controllers
{
    [ApiController]
    [Route("/api")]
    public class ApiController : ControllerBase
    {
        private readonly ILogger<ApiController> _logger;
        private readonly RapydClient _client;
        private readonly WebhookEventsService _webhookEventsService;

        public ApiController(ILogger<ApiController> logger, RapydClient rapydClient, WebhookEventsService webhookEventsService)
        {
            _logger = logger;
            _client = rapydClient;
            _webhookEventsService = webhookEventsService;
        }

        [HttpGet("customers")]
        public async Task<ActionResult<IList<Customer>>> GetCustomers()
        {
            var customers = await _client.GetCustomers();
            return Ok(customers);
        }

        [HttpPost("customers")]
        public async Task<ActionResult<Customer>> CreateCustomer([FromBody] CreateCustomerBody body)
        {
            var customer = await _client.CreateCustomer(body);
            return Ok(customer);
        }

        [HttpGet("customers/{customerId}/paymentMethods")]
        public async Task<ActionResult<List<CustomerPaymentMethod>>> GetCustomerPaymentMethods([FromRoute] string customerId)
        {
            var customer = await _client.GetCustomersPaymentMethods(customerId);
            return Ok(customer);
        }

        [HttpGet("paymentMethods")]
        public async Task<ActionResult<IList<PaymentMethod>>> GetPaymentMethods([FromQuery] string country)
        {
            var methods = await _client.GetPaymentMethods(country);
            return Ok(methods);
        }

        [HttpGet("paymentMethodRequiredFields/{type}")]
        public async Task<ActionResult<PaymentMethodRequiredFields>> GetPaymentMethodRequiredFields([FromRoute] string type)
        {
            var methods = await _client.GetPaymentMethodRequiredFields(type);
            return Ok(methods);
        }

        [HttpPost("checkout")]
        public async Task<ActionResult<Checkout>> CreateCheckout([FromBody] CreateCheckoutBody body)
        {
            var checkout = await _client.CreatePaymentCheckout(body);
            return Ok(checkout);
        }

        [HttpPost("payment")]
        public async Task<ActionResult<Payment>> CreatePayment([FromBody] CreatePaymentBody body)
        {
            var payment = await _client.CreatePayment(body);
            return Ok(payment);
        }

        [HttpDelete("payment/{paymentId}")]
        public async Task<ActionResult<Payment>> CancelPayment([FromRoute] string paymentId)
        {
            var payment = await _client.CancelPayment(paymentId);
            return Ok(payment);
        }

        [HttpPost("webhook")]
        public async Task<IActionResult> Webhook([FromHeader] long timestamp, [FromHeader] string salt, [FromHeader] string signature)
        {
            var body = string.Empty;

            using (StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8))
            {
                body = await reader.ReadToEndAsync();
            }

            var url = $"http://{Request.Host.Host}{Request.Path}";
            if (!_client.AuthWebhookRequest(signature, url, salt, timestamp, body)) return Unauthorized();

            try
            {
                JsonDocument document = JsonDocument.Parse(body);
                var id = document.RootElement.GetProperty("id").GetString();
                var type = document.RootElement.GetProperty("type").GetString();
                var data = document.RootElement.GetProperty("data").Deserialize<object>();
                _webhookEventsService.tryAddEvent(id, type, data);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while handling webhook event");
            }
            return Ok();
        }

        [HttpGet("webhook/events")]
        public ActionResult<IEnumerable<WebhookEvent>> GetWebhookEvents()
        {
            return Ok(_webhookEventsService.getAllEvents());
        }
    }
}