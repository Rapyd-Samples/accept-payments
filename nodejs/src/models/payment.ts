import { Expose } from 'class-transformer';
import { IsOptional, IsPositive, IsString, IsUrl } from 'class-validator';

export class CreatePaymentBody {
  @IsOptional()
  payment_method: string;

  @IsPositive()
  amount: number;

  @IsString()
  currency: string;

  @IsString()
  customer: string;

  @IsOptional()
  @IsString()
  complete_payment_url: string;

  @IsOptional()
  @IsString()
  error_payment_url: string;
}

export class PaymentResult {
  @Expose()
  @IsString()
  id: string;
}
