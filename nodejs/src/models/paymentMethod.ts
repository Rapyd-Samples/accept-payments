import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class PaymentMethod {
  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  type: string;
}
