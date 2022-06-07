import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'customCheckoutAmountValidator', async: false })
export class CustomCheckoutAmountValidator implements ValidatorConstraintInterface {
  validate(amount: string) {
    if (!amount) {
      return false;
    }
    if (typeof amount === 'number') {
      return amount > 0;
    } else if (typeof amount === 'string') {
      const valid = !isNaN(Number(amount));
      return valid && parseFloat(amount) > 0;
    } else {
      return false;
    }
  }

  defaultMessage() {
    return 'Amount ($value) is not a positive number!';
  }
}
