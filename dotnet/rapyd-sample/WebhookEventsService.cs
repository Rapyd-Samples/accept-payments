using rapyd_sample.models;

namespace rapyd_sample
{
    public class WebhookEventsService
    {
        private Dictionary<string, WebhookEvent> _events;

        public WebhookEventsService()
        {
            _events = new Dictionary<string, WebhookEvent>();
        }

        public bool tryAddEvent(string id, string type, object data)
        {
            return _events.TryAdd(id, new WebhookEvent()
            {
                Id = id,
                Timestamp = DateTime.Now,
                Type = type,
                Data = data
            });
        }

        public IList<WebhookEvent> getAllEvents()
        {
            return _events.Select(i => i.Value).ToList();
        }
    }
}