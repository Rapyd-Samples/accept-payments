from typing import Any, List, Optional
from urllib import request
from fastapi import HTTPException, Header, Request, status
from fastapi.routing import APIRouter
from models.checkout import CheckoutModel, CreateCheckoutModel
from models.payment import CreatePaymentModel, PaymentModel
from models.paymentMethod import CustomerPaymentMethod
from models.customers import CreateCustomer, Customer
from models.webhookEvent import WebhookEvent

from rapydService import RapydService
from webhookEventsService import WebhookEventsService


router = APIRouter()


@router.get("/customers",
            response_model=List[Customer],
            summary="Return all customers",
            operation_id="getCustomers")
async def get_customers():
    rapyd_service = RapydService()
    customers = rapyd_service.get_customers()
    return customers


@router.post("/customers",
             response_model=Customer,
             summary="Creates new customer",
             operation_id="createCustomer")
async def create_customer(model: CreateCustomer):
    rapyd_service = RapydService()
    customers = rapyd_service.create_customer(model)
    return customers


@router.get("/customers/{customerId}/paymentMethods",
            response_model=List[Any],
            summary="Get Customer Payment Methods",
            operation_id="GetCustomerPaymentMethods")
async def get_customer_payment_methods(customerId: str):
    rapyd_service = RapydService()
    result = rapyd_service.get_customer_payment_methods(customerId)
   
    return result


@router.get("/paymentMethods",
            response_model=List[Any],
            summary="Get Payment Methods",
            operation_id="GetPaymentMethods")
async def get_payment_methods(country: Optional[str]):
    rapyd_service = RapydService()
    country = country if country else "US"
    result = rapyd_service.get_payment_methods(country)
   
    return result


@router.get("/paymentMethodRequiredFields/{type}",
            summary="Get required fields for payment method",
            operation_id="GetPaymentMethodRequiredFields")
async def get_payment_method_required_fields(type: str):
    rapyd_service = RapydService()
   
    result = rapyd_service.get_payment_required_fields(type)
   
    return result


@router.post("/checkout",
             response_model=CheckoutModel,
             summary="Create checkout page",
             operation_id="createCheckout")
async def create_checkout(model: CreateCheckoutModel):
    rapyd_service = RapydService()
   
    result = rapyd_service.create_checkout(model)
   
    return result


@router.post("/payment",
             response_model=PaymentModel,
             summary="Create payment",
             operation_id="createPayment")
async def create_payment(model: CreatePaymentModel):
    rapyd_service = RapydService()
   
    result = rapyd_service.create_payment(model)
   
    return result



@router.delete("/payment/{paymentId}",
             summary="Cancel payment",
             operation_id="cancelPayment")
async def cancel_payment(paymentId: str):
    rapyd_service = RapydService()
   
    result = rapyd_service.cancel_payment(paymentId)
   
    return result


@router.post("/webhook",
             summary="Webhook event logger",
             operation_id="webhook")
async def webhook(req: Request, signature: Optional[str] = Header(None), salt: Optional[str] = Header(None), timestamp: Optional[str] = Header(None)):
    rapyd_service = RapydService()
   
    body = await req.json()
    if not rapyd_service.auth_webhook_request(signature, req.url._url, salt, timestamp, body):
        raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="signature not valid",
        )
   
    wes = WebhookEventsService()
    id = body['id']
    type = body['type']
    data = body['data']
    
    wes.try_add_event(id, type, data)
    return

    
@router.get("/webhook/events",
            response_model=List[WebhookEvent],
            summary="Get webhook events",
            operation_id="getWebhookEvents")
async def get_webhook_events():

    wes = WebhookEventsService()
    events = wes.get_all_events()

    return events
