import base64
import hashlib
import hmac
import json
from operator import imod
import random
import string
import time
from typing import Any, Dict

from fastapi import HTTPException, status
from config import appConfig
import requests
from models.checkout import CheckoutModel, CreateCheckoutModel
from models.payment import CreatePaymentModel, PaymentModel
from models.paymentMethod import CustomerPaymentMethod
from requests import Response

from models.customers import CreateCustomer, Customer

class RapydService:
    def __init__(self):
        self.__access_key = appConfig.rapyd_access_key
        self.__secret_key = appConfig.rapyd_secret_key
        self.__base_rapid_api_key = appConfig.base_rapid_api_url

    def get_customers(self):
        api_response = requests.get(**self.__prepare_request('get', '/v1/customers'))
        if api_response.status_code != 200:
                RapydService._handle_response(api_response)
        data = api_response.json()
        result = list(map(lambda i: Customer(**i), data["data"]))
        return result

    def create_customer(self, model: CreateCustomer):
        api_response = requests.post(**self.__prepare_request('post', '/v1/customers', model))
        
        if api_response.status_code != 200:
                RapydService._handle_response(api_response)
        data = api_response.json()
        result = Customer(**data["data"])
        return result

    def get_customer_payment_methods(self, customerId: str):
        api_response = requests.get(**self.__prepare_request('get', f'/v1/customers/{customerId}/payment_methods'))
        
        if api_response.status_code != 200:
                RapydService._handle_response(api_response)
        data = api_response.json()
        result = data["data"]
        return result

    def get_payment_methods(self, country: str):
        api_response = requests.get(**self.__prepare_request('get', f'/v1/payment_methods/country?country={country}'))
        
        if api_response.status_code != 200:
                RapydService._handle_response(api_response)
        data = api_response.json()
        result = list(map(lambda i: i, data["data"]))
        return result
    
    def get_payment_required_fields(self, type: str):
        api_response = requests.get(**self.__prepare_request('get', f'/v1/payment_methods/required_fields/{type}'))
        
        if api_response.status_code != 200:
                RapydService._handle_response(api_response)
        data = api_response.json()
        result = data["data"]
        return result

    def create_checkout(self, model: CreateCheckoutModel):
        api_response = requests.post(**self.__prepare_request('post', '/v1/checkout', model))
        
        if api_response.status_code != 200:
                RapydService._handle_response(api_response)
        data = api_response.json()
        result = CheckoutModel(**data["data"])
        return result

    def create_payment(self, model: CreatePaymentModel):
        api_response = requests.post(**self.__prepare_request('post', '/v1/payments', model))
        
        if api_response.status_code != 200:
                RapydService._handle_response(api_response)
        data = api_response.json()
        result = PaymentModel(**data["data"])
        return result

    def cancel_payment(self, payment_id: str):
            api_response = requests.delete(**self.__prepare_request('delete', f'/v1/payments/{payment_id}'))
            
            if api_response.status_code != 200:
                RapydService._handle_response(api_response)
            data = api_response.json()
            result = PaymentModel(**data["data"])
            return result

    def auth_webhook_request(self, incomeSign, url, salt, timestamp, body) -> bool:
        signature = self.__generate_signature_for_webhook(url, salt, timestamp, body)
        return signature == incomeSign

    def __generate_salt(self):
        return ''.join(random.sample(string.ascii_letters + string.digits, 12))

    def __get_unix_time(self):
        return int(time.time())
    
    def __prepare_request(self, http_method: str, path: str, body=None):
        full_url = f'{self.__base_rapid_api_key}{path}'

        body_dict: Dict[str, Any] = dict()
        if body:
            body_dict = body.__dict__
            body_dict = RapydService._fix_body_float_values(body_dict)
            
        str_body = json.dumps(body_dict, separators=(',', ':'), ensure_ascii=False) if body else ''
        salt, timestamp, signature = self.__generate_signature(http_method=http_method, path=path, body=str_body)

        headers = self.__prepare_headers(salt, timestamp, signature)
        result = {"url": full_url, "headers": headers, "json": body_dict} if body is not None else {"url": full_url, "headers": headers}
        return result

    def __generate_signature(self, http_method, path, body):
        salt = self.__generate_salt()
        timestamp = str(self.__get_unix_time())
        to_sign = (http_method, path, salt, str(timestamp), self.__access_key, self.__secret_key, body)
        
        h = hmac.new(self.__secret_key.encode('utf-8'), ''.join(to_sign).encode('utf-8'), hashlib.sha256)
        signature = base64.urlsafe_b64encode(str.encode(h.hexdigest()))
        return salt, timestamp, signature

    def __generate_signature_for_webhook(self, url, salt, timestamp, body):
        str_body = json.dumps(body, separators=(',', ':'), ensure_ascii=False) if body else ''
        to_sign = (url, salt, timestamp, self.__access_key, self.__secret_key, str_body)
        
        h = hmac.new(self.__secret_key.encode('utf-8'), ''.join(to_sign).encode('utf-8'), hashlib.sha256)
        signature = base64.urlsafe_b64encode(str.encode(h.hexdigest()))
        return signature.decode()

    def __prepare_headers(self, salt: str, timestamp: str, signature):
        return {"salt": salt,
                "access_key": self.__access_key,
                "timestamp": timestamp,
                "signature": signature
                }
    @staticmethod
    def _handle_response(res: Response):
        error = None
        try:
            error = res.json()
        except:
            error = res.text
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error
        )

    @staticmethod 
    def _fix_body_float_values(dict: Dict[str, Any]):
        #   By default "Requests" lib when sends float values in the body
        #   serializes them to int if they have an integer value.
        #   However the json.dump() method uses trailing zeros. 
        #   So we need to manually round all floats to integer values if possible, otherwise our signature will not match the body
        for key in dict.keys():
                value = dict[key]
                if isinstance(value, float) and value.is_integer():
                    dict[key] = int(value)
        return dict
