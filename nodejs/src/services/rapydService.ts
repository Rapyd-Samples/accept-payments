import crypto from 'crypto';
import { logger } from '@utils/logger';

import config from '@configs';
import HttpMethod from 'http-method-enum';
import axios, { AxiosInstance } from 'axios';
import { HttpException } from '@/exceptions/HttpException';
import { CreateCustomerBody, Customer, CustomerPaymentMethod } from '@/models/customers';
import { RapydResponse } from '@/models/baseRapydResponse';
import { CheckoutResult, CreateCheckoutBody } from '@/models/checkout';
import { CreatePaymentBody, PaymentResult } from '@/models/payment';
import { PaymentMethodRequiredFields } from '@/models/paymentMethodRequiredFields';
import { PaymentMethod } from '@/models/paymentMethod';
import { plainToClass } from 'class-transformer';

class RapydService {
  private _accessKey: string;
  private _secretKey: string;
  private _baseUrl: string;
  private _axiosClient: AxiosInstance;

  constructor() {
    this._accessKey = config.accessKey;
    this._secretKey = config.secretKey;
    this._baseUrl = config.baseRapydApiUrl;

    this._axiosClient = axios.create({
      baseURL: this._baseUrl,
    });

    this._axiosClient.interceptors.request.use(req => {
      const method = req.method as HttpMethod;
      const salt = this.generateRandomString(8);
      const timestamp = Math.floor(Date.now() / 1000);
      const signature = this.generateSignature(method, req.url, salt, timestamp, req.data);
      req.headers.salt = salt;
      req.headers.timestamp = timestamp;
      req.headers.access_key = this._accessKey;
      req.headers.signature = signature;
      return req;
    });
  }

  public async getCustomers(): Promise<Customer[]> {
    try {
      const response = await this._axiosClient.get<RapydResponse<Customer[]>>('/v1/customers');

      return response.data.data;
    } catch (error) {
      if (error.isAxiosError) {
        throw new HttpException(+error.response.status, error.response.data?.status || error.response.data);
      }
      throw error;
    }
  }

  public async createCustomer(body: CreateCustomerBody): Promise<Customer> {
    try {
      const response = await this._axiosClient.post<RapydResponse<Customer>>('/v1/customers', body);
      return response.data.data;
    } catch (error) {
      if (error.isAxiosError) {
        throw new HttpException(+error.response.status, error.response.data?.status || error.response.data);
      }
    }
  }

  public async getCustomerPaymentMethods(customerId: string): Promise<CustomerPaymentMethod[]> {
    try {
      const response = await this._axiosClient.get<RapydResponse<CustomerPaymentMethod[]>>(`/v1/customers/${customerId}/payment_methods`);

      return response.data.data;
    } catch (error) {
      if (error.isAxiosError) {
        throw new HttpException(+error.response.status, error.response.data?.status || error.response.data);
      }
      throw error;
    }
  }

  public async getPaymentMethods(country: string): Promise<PaymentMethod[]> {
    try {
      const response = await this._axiosClient.get<RapydResponse<PaymentMethod[]>>(`/v1/payment_methods/country?country=${country}`);

      return response.data.data;
    } catch (error) {
      if (error.isAxiosError) {
        throw new HttpException(+error.response.status, error.response.data?.status || error.response.data);
      }
      throw error;
    }
  }

  public async getPaymentMethodsRequiredFields(type: string): Promise<PaymentMethodRequiredFields[]> {
    try {
      const response = await this._axiosClient.get<RapydResponse<PaymentMethodRequiredFields[]>>(`/v1/payment_methods/required_fields/${type}`);

      return response.data.data;
    } catch (error) {
      if (error.isAxiosError) {
        throw new HttpException(+error.response.status, error.response.data?.status || error.response.data);
      }
      throw error;
    }
  }

  public async createPaymentCheckout(body: CreateCheckoutBody): Promise<any[]> {
    try {
      const response = await this._axiosClient.post<RapydResponse<any[]>>(`/v1/checkout`, body);

      return plainToClass(CheckoutResult, response.data.data, { excludeExtraneousValues: true });
    } catch (error) {
      if (error.isAxiosError) {
        throw new HttpException(+error.response.status, error.response.data?.status || error.response.data);
      }
      throw error;
    }
  }

  public async createPayment(body: CreatePaymentBody): Promise<any> {
    try {
      const response = await this._axiosClient.post<RapydResponse<any>>(`/v1/payments`, body);

      return plainToClass(PaymentResult, response.data.data, { excludeExtraneousValues: true });
    } catch (error) {
      if (error.isAxiosError) {
        throw new HttpException(+error.response.status, error.response.data?.status || error.response.data);
      }
      throw error;
    }
  }

  public async cancelPayment(paymentId: string): Promise<any> {
    try {
      const response = await this._axiosClient.delete<RapydResponse<any>>(`/v1/payments/${paymentId}`);

      return response.data.data;
    } catch (error) {
      if (error.isAxiosError) {
        throw new HttpException(+error.response.status, error.response.data?.status || error.response.data);
      }
      throw error;
    }
  }

  public authWebhookRequest(incomeSign: string, url: string, salt: string, timestamp: number, body: string): boolean {
    const signature = this.generateSignatureForWebhookAuth(url, salt, timestamp, body);

    return signature === incomeSign;
  }

  private generateSignature(method: HttpMethod, urlPath: string, salt: string, timestamp: number, body: any): string {
    try {
      let bodyString = '';
      if (body) {
        bodyString = JSON.stringify(body);
        bodyString = bodyString == '{}' ? '' : bodyString;
      }

      const toSign = method.toLowerCase() + urlPath + salt + timestamp + this._accessKey + this._secretKey + bodyString;

      return this.hashSignature(toSign, this._secretKey);
    } catch (error) {
      logger.error('Error generating signature');
      throw error;
    }
  }
  private generateSignatureForWebhookAuth(url: string, salt: string, timestamp: number, body: any): string {
    try {
      let bodyString = '';
      if (body) {
        bodyString = JSON.stringify(body);
        bodyString = bodyString == '{}' ? '' : bodyString;
      }

      const toSign = url + salt + timestamp + this._accessKey + this._secretKey + bodyString;

      return this.hashSignature(toSign, this._secretKey);
    } catch (error) {
      logger.error('Error generating signature');
      throw error;
    }
  }

  private hashSignature(signature: string, key: string): string {
    const hash = crypto.createHmac('sha256', key);
    hash.update(signature);
    const hashSignature = Buffer.from(hash.digest('hex')).toString('base64');

    return hashSignature;
  }

  private generateRandomString(size: number): string {
    try {
      return crypto.randomBytes(size).toString('hex');
    } catch (error) {
      logger.error('Error generating salt');
      throw error;
    }
  }
}

export default RapydService;
