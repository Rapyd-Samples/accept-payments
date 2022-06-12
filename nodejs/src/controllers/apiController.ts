import {
  Param,
  Body,
  Get,
  Post,
  Delete,
  HttpCode,
  UseBefore,
  JsonController,
  QueryParam,
  Req,
  HeaderParam,
  Res,
  OnUndefined,
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

import { validationMiddleware } from '@middlewares/validation.middleware';
import RapydService from '@/services/rapydService';
import { CreateCustomerBody, Customer } from '@/models/customers';
import { CreateCheckoutBody } from '@/models/checkout';
import { CreatePaymentBody } from '@/models/payment';
import webhookEventService from '@/services/webhookEventService';
import { Request, Response } from 'express';
import { HttpException } from '@/exceptions/HttpException';
import { WebhookEvent } from '@/models/webhookEvent';
import { PaymentMethod } from '@/models/paymentMethod';
import { PaymentMethodRequiredFields } from '@/models/paymentMethodRequiredFields';

@JsonController('/api')
export class ApiController {
  @Get('/customers')
  @OpenAPI({ summary: 'Return a list of customers' })
  @ResponseSchema(Customer, { isArray: true })
  async getCustomers() {
    const rapydService = new RapydService();
    const customers = await rapydService.getCustomers();
    return customers;
  }

  @Post('/customers')
  @HttpCode(200)
  @UseBefore(validationMiddleware(CreateCustomerBody, 'body'))
  @ResponseSchema(Customer)
  @OpenAPI({ summary: 'Create a new customer' })
  async createCustomer(@Body() body: CreateCustomerBody) {
    const rapydService = new RapydService();
    const customer = await rapydService.createCustomer(body);
    return customer;
  }

  @Get('/customers/:customerId/paymentMethods')
  @OpenAPI({ summary: 'Return a list of customer payment methods' })
  @ResponseSchema(PaymentMethod, { isArray: true })
  async getCustomerPaymentMethods(@Param('customerId') customerId: string) {
    const rapydService = new RapydService();
    const customerPaymentMethods = await rapydService.getCustomerPaymentMethods(customerId);
    return customerPaymentMethods;
  }

  @Get('/paymentMethods')
  @OpenAPI({ summary: 'Return a list of payment methods' })
  @ResponseSchema(PaymentMethod, { isArray: true })
  async getPaymentMethods(@QueryParam('country') country: string) {
    const rapydService = new RapydService();
    const paymentMethods = await rapydService.getPaymentMethods(country);
    return paymentMethods;
  }

  @Get('/paymentMethodRequiredFields/:type')
  @OpenAPI({ summary: 'Return a list of required field for given payment method' })
  @ResponseSchema(PaymentMethodRequiredFields)
  async getPaymentMethodRequiredFields(@Param('type') type: string) {
    const rapydService = new RapydService();
    const paymentRequiredFields = await rapydService.getPaymentMethodsRequiredFields(type);
    return paymentRequiredFields;
  }

  @Post('/checkout/redirect')
  @OnUndefined(303)
  @UseBefore(validationMiddleware(CreateCheckoutBody, 'body'))
  @OpenAPI({ summary: 'redirects to a new checkout page' })
  async redirectToCheckout(@Res() res: Response, @Body() body: CreateCheckoutBody) {
    const rapydService = new RapydService();
    const redirectUrl = await rapydService.createCheckoutRedirectURL(body);
    res.redirect(303, redirectUrl);
  }

  @Post('/checkout')
  @HttpCode(200)
  @UseBefore(validationMiddleware(CreateCheckoutBody, 'body'))
  @OpenAPI({ summary: 'Create a new payment checkout' })
  async createCheckout(@Body() body: CreateCheckoutBody) {
    const rapydService = new RapydService();
    return await rapydService.createPaymentCheckout(body);
  }

  @Post('/payment')
  @HttpCode(200)
  @UseBefore(validationMiddleware(CreatePaymentBody, 'body'))
  @OpenAPI({ summary: 'Create a payment' })
  async createPayment(@Body() body: CreatePaymentBody) {
    const rapydService = new RapydService();
    const payment = await rapydService.createPayment(body);
    return payment;
  }

  @Delete('/payment/:paymentId')
  @HttpCode(200)
  @OpenAPI({ summary: 'Cancel a payment' })
  async cancelPayment(@Param('paymentId') paymentId: string) {
    const rapydService = new RapydService();
    const payment = await rapydService.cancelPayment(paymentId);
    return payment;
  }

  @Get('/webhook/events')
  @OpenAPI({ summary: 'Return a list of events' })
  @ResponseSchema(WebhookEvent, { isArray: true })
  async getEvents() {
    const events = webhookEventService.getAllEvents();

    return events;
  }

  @Post('/webhook')
  @OpenAPI({ summary: 'Saves triggered rapyd actions' })
  async saveEvent(
    @Req() request: Request,
    @HeaderParam('signature') signature: string,
    @HeaderParam('timestamp') timestamp: number,
    @HeaderParam('salt') salt: string,
    @Body() body: any,
  ) {
    const rapydService = new RapydService();
    const url = `${request.protocol}://${request.hostname}${request.path}`;
    if (!rapydService.authWebhookRequest(signature, url, salt, timestamp, body)) {
      throw new HttpException(401, 'Signature not valid');
    }
    const eventId = body.id;
    const eventType = body.type;
    const data = body.data;

    if (!eventId || !eventType || !data) {
      throw new HttpException(400, 'Bad Request');
    }
    const status = webhookEventService.tryAddEvent(eventId, eventType, data);

    return status;
  }
}
