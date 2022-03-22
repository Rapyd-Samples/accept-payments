using System.Net;
using System.Text.Json;

namespace rapyd_sample
{
    public class GlobalExceptionMiddleware
    {
        private readonly RequestDelegate _next;

        public GlobalExceptionMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception error)
            {
                var response = context.Response;
                response.ContentType = "application/json";

                switch (error)
                {
                    default:
                        // unhandled error
                        response.StatusCode = (int)HttpStatusCode.InternalServerError;
                        break;
                }
                object messageObj;


                try 
                {
                    messageObj = JsonSerializer.Deserialize<object>(error?.Message);
                        }
                catch
                {
                    messageObj = error?.Message;
                }  

                var result = JsonSerializer.Serialize(new { message = messageObj });
                await response.WriteAsync(result);
            }
        }
    }
}