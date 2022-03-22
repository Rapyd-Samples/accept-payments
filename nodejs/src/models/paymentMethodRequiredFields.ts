import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsInt, IsString, ValidateNested } from 'class-validator';

export class Field {
  @IsString()
  name: string;
  @IsString()
  type: string;
  @IsString()
  regex: string;
  @IsBoolean()
  is_required: boolean;
  @IsString()
  instructions: string;
}

export class PaymentMethodOption {
  @IsString()
  name: string;
  @IsString()
  type: string;
  @IsString()
  regex: string;
  @IsString()
  description: string;
  @IsBoolean()
  is_required: boolean;
  @IsBoolean()
  is_updatable: boolean;
}

export class PaymentOption {
  @IsString()
  name: string;
  @IsString()
  type: string;
  @IsString()
  regex: string;
  @IsString()
  description: string;
  @IsBoolean()
  is_required: boolean;
  @IsBoolean()
  is_updatable: boolean;
}

export class PaymentMethodRequiredFields {
  @IsString()
  type: string;
  @IsArray({ each: true })
  @ValidateNested({ each: true })
  @Type(() => Field)
  fields: Field[];
  @IsArray({ each: true })
  @ValidateNested({ each: true })
  @Type(() => PaymentMethodOption)
  payment_method_options: PaymentMethodOption[];
  @IsArray({ each: true })
  @ValidateNested({ each: true })
  @Type(() => PaymentOption)
  payment_options: PaymentOption[];
  @IsInt()
  minimum_expiration_seconds: number;
  @IsInt()
  maximum_expiration_seconds: number;
}
