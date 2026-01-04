import { APIRequestContext } from 'playwright-core'
import { LoginDTO } from '../tests/dto/LoginDTO'
import { StatusCodes } from 'http-status-codes'
import { OrderDTO } from '../tests/dto/OrderDTO'
import { expect } from '@playwright/test'


const serviceURL = 'https://backend.tallinn-learning.ee';
const loginPath = '/login/student';
const orderPath = '/orders';

export class ApiClient {
  request: APIRequestContext;
  readonly jwt: string;

  private constructor(request: APIRequestContext, jwt: string) {
    this.request = request;
    this.jwt = jwt;
  };

  static async create(request: APIRequestContext): Promise<ApiClient> {
    const authResponse = await request.post(`${serviceURL}${loginPath}`, {
      data: LoginDTO.createLoginWithCorrectData()
    });

    if (authResponse.status() !== StatusCodes.OK) {
      throw new Error(`Request failed with status ${authResponse.status()}`);
    }

    const jwt = await authResponse.text();

    return new ApiClient(request, jwt);
  }

  async createOrderAndReturnOrderId(): Promise<number> {
    const response = await this.request.post(`${serviceURL}${orderPath}`, {
      headers: {
        Authorization: `Bearer ${this.jwt}`
      },
      data: OrderDTO.createOrderWithRandomData()
    });
    expect(response.status()).toBe(StatusCodes.OK);
    const json: OrderDTO = await response.json();

    return json.id;
  }

  async getOrders(): Promise<OrderDTO[]> {
    const response = await this.request.get(`${serviceURL}${orderPath}`, {
      headers: {
        Authorization: `Bearer ${this.jwt}`
      }
    });

    expect(response.status()).toBe(StatusCodes.OK);
    const json: OrderDTO[] = await response.json();
    expect(json.length).toBeGreaterThan(0);

    return json;
  }


  //фунция для удаления заказа по id
  async deleteOrderById(orderId: number) {
  return this.request.delete(`https://backend.tallinn-learning.ee/orders/${orderId}`, {
    headers: {
      Authorization: `Bearer ${this.jwt}`
    },
  })
}
}

