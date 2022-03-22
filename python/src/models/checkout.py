from typing import Optional
from pydantic import BaseModel


class CreateCheckoutModel(BaseModel):
    amount: float
    country: str
    currency: str
    customer: str
    complete_payment_url: Optional[str]
    error_payment_url: Optional[str]
    complete_checkout_url: Optional[str]
    

class CheckoutModel(BaseModel):
    id: str
    redirect_url: str
    