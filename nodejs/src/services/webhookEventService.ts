import { WebhookEvent } from '@/models/webhookEvent';

class WebhookEventService {
  private static _instance: WebhookEventService;

  private events: any;
  private constructor() {
    this.events = {};
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public tryAddEvent(id: string, type: string, data: any): boolean {
    if (this.events[id]) return false;
    this.events[id] = new WebhookEvent(id, type, data);
    return true;
  }

  public getAllEvents(): WebhookEvent[] {
    const data = [];
    for (const key of Object.keys(this.events)) {
      data.push(this.events[key]);
    }
    return data;
  }
}
const instance = WebhookEventService.Instance;
export default instance;
