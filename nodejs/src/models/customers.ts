import { IsString } from 'class-validator';

export class Customer {
  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
  @IsString()
  id: string;

  @IsString()
  name: string;
}

export class CreateCustomerBody {
  @IsString()
  name: string;
}

export class CustomerPaymentMethod {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  type: string;
}
