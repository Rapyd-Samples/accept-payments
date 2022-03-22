from pydantic import BaseModel


class CustomerPaymentMethod(BaseModel):
    id: str
    type: str
    name: str
 

