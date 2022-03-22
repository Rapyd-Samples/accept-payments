from typing import Optional
from pydantic import BaseModel


class CreatePaymentModel(BaseModel):
    amount: float
    currency: str
    payment_method: Optional[str]
    customer: Optional[str]
    complete_payment_url: Optional[str]
    error_payment_url: Optional[str]
   
    

class PaymentModel(BaseModel):
    id: str
    