from typing import Any, List, Optional
from pydantic import BaseModel


class Customer(BaseModel):
    id: str
    delinquent: bool
    discount: Any
    name: str
    default_payment_method: Optional[str]
    description: str
    email: str
    phone_number: str
    invoice_prefix: str
    addresses: List[Any]
    payment_methods: Any
    subscriptions: Any
    created_at: int
    metadata: Any
    business_vat_id: Optional[str]
    ewallet: Optional[str]


class CreateCustomer(BaseModel):
    name: str
    