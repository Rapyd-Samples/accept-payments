import { IsObject, IsString } from 'class-validator';

export class WebhookEvent {
  constructor(id: string, type: string, data: any) {
    this.id = id;
    this.timestamp = new Date();
    this.type = type;
    this.data = data;
  }

  @IsString()
  id: string;

  @IsString()
  timestamp: Date;

  @IsString()
  type: string;

  @IsObject()
  data: any;
}
