import { Expose } from 'class-transformer';
import { Equals, IsNumber, IsNumberString, IsOptional, IsPositive, IsString, IsUrl } from 'class-validator';
import { isNumberObject } from 'util/types';

export class CreateCheckoutBody {
  @IsPositive()
  amount: number;

  @IsString()
  country: string;

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

  @IsOptional()
  @IsString()
  complete_checkout_url: string;
}

export class CheckoutResult {
  @Expose()
  @IsString()
  id: string;

  @Expose()
  @IsString()
  redirect_url: string;
}
