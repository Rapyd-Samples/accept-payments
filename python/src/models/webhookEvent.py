from datetime import date
from typing import Any
from pydantic import BaseModel


class WebhookEvent(BaseModel):
    id: str
    type: str
    timestamp: date
    data: Any
 
