import { APIRequestContext } from 'playwright-core';
import { LoginDTO } from '../tests/dto/LoginDTO';
import { OrderDTO } from '../tests/dto/OrderDTO';
import { StatusCodes } from 'http-status-codes';
import { expect } from '@playwright/test'

const serviceURL = 'https://backend.tallinn-learning.ee';
const loginPath = '/login/student';
const orderPath = '/orders';

export class ApiClientSingleton {
  static instance: ApiClientSingleton;
  private request: APIRequestContext;
  private jwt: string = '';

  private constructor(request: APIRequestContext) {
    this.request = request;
  }

  public static async getInstance(request: APIRequestContext): Promise<ApiClientSingleton> {
    if (!ApiClientSingleton.instance) { // <-- разница между обычным классом и синглтоном
      this.instance = new ApiClientSingleton(request);
      await this.instance.requestJwt();
    }

    return this.instance;
  }

  private async requestJwt(): Promise<void> {
 
    const authResponse = await this.request.post(`${serviceURL}${loginPath}`, {
      data: LoginDTO.createLoginWithCorrectData()
    });

    if (authResponse.status() !== StatusCodes.OK) {
      console.log('Authorization failed');
      throw new Error(`Request failed with status ${authResponse.status()}`);
    }

    this.jwt = await authResponse.text();
  }

  async createOrderAndReturnOrderId(): Promise<number> {
    const response = await this.request.post(`${serviceURL}${orderPath}`, {
      data: OrderDTO.createOrderWithRandomData(),
      headers: {
        Authorization: `Bearer ${this.jwt}`,
      }
    });

    expect(response.status()).toBe(StatusCodes.OK);
    const responseBody = await response.json();

    return responseBody.id;
  }
}