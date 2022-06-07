import { Expose } from 'class-transformer';
import { IsOptional, IsString, Validate } from 'class-validator';
import { CustomCheckoutAmountValidator } from '@/validators/amountValidator';

export class CreateCheckoutBody {
  @Validate(CustomCheckoutAmountValidator)
  amount: number;

  @IsString()
  country: string;

  @IsString()
  currency: string;

  @IsOptional()
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

  @IsOptional()
  @IsString()
  cancel_checkout_url: string;
}

export class CheckoutResult {
  @Expose()
  @IsString()
  id: string;

  @Expose()
  @IsString()
  redirect_url: string;
}
