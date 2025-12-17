import { expect, test } from '@playwright/test'
import Ajv from 'ajv'
import { StatusCodes } from 'http-status-codes'
import { OrderDTO } from './dto/OrderDTO'
import { orderSchema } from './dto/order-schema'

// Все запросы идут к этому API.
const BASE_URL = 'https://backend.tallinn-learning.ee/test-orders'

const ajv = new Ajv()
const validate = ajv.compile(orderSchema)




// GET с валидным id должен вернуть 200
test('get order with correct id should receive code 200', async ({ request }) => {
  const response = await request.get(`${BASE_URL}/1`) // .get(BASE_URL + '/1')
  expect.soft(response.status()).toBe(StatusCodes.OK)
})



// GET с невалидными id должен вернуть 400
test('get order with incorrect id should receive code 400', async ({ request }) => {
  const responseOrderId0 = await request.get(`${BASE_URL}/0`)
  const responseOrderId11 = await request.get(`${BASE_URL}/11`)
  const responseOrderIdNull = await request.get(`${BASE_URL}/null`)
  const responseOrderIdTest = await request.get(`${BASE_URL}/test`)

  expect.soft(responseOrderId0.status()).toBe(StatusCodes.BAD_REQUEST)
  expect.soft(responseOrderId11.status()).toBe(StatusCodes.BAD_REQUEST)
  expect.soft(responseOrderIdNull.status()).toBe(StatusCodes.BAD_REQUEST)
  expect.soft(responseOrderIdTest.status()).toBe(StatusCodes.BAD_REQUEST)
})



// POST с валидными данными
test('post order with correct data should receive code 200', async ({ request }) => {
  const requestBody = OrderDTO.createOrderWithRandomData()
  const response = await request.post(BASE_URL, {
    data: requestBody,
  })

  const responseData: OrderDTO = await response.json()
  const valid = validate(responseData)
  expect.soft(valid).toBeTruthy()
  expect.soft(response.status()).toBe(StatusCodes.OK)
  OrderDTO.checkServerResponse(responseData)
})



  // DELETE заказа с валидным id
  test('Delete order with correct id', async ({ request }) => {
  const requestBody = OrderDTO.createOrderWithRandomData()
  requestBody.id = 9

  const responseCreate = await request.post(BASE_URL, {
    data: requestBody,
  })

  const responseDelete = await request.delete(`${BASE_URL}/${requestBody.id}`, {
    headers: {
      api_key: '1234567890123456',
    },
  })});
  



//DELETE заказа с валидным id без авторизации возвращает 401
test('DELETE order without auth returns 401', async ({ request }) => {
const response = await request.delete(`${BASE_URL}/1`);

expect(response.status()).toBe(StatusCodes.BAD_REQUEST);
});



// PUT новый статус заказа с валидным id и авторизацией возвращает 200
test('PUT order with valid id and API key returns 200', async ({ request }) => {
// Создание заказа
  const requestBody = OrderDTO.createOrderWithRandomData()
  requestBody.id = 10

  const responseCreate = await request.post(BASE_URL, {
    data: requestBody,
  })
  expect(responseCreate.status()).toBe(StatusCodes.OK)

// Обновление статуса с правильным API 
  const responsePut = await request.put(`${BASE_URL}/${requestBody.id}`, {
    headers: {
      api_key: '1234567890123456',
    },
    data: {
      status: 'OPEN',
    },
  })
  expect(responsePut.status()).toBe(StatusCodes.OK)
})



// PUT новый статус заказа без авторизации возвращает 401
test('PUT order with invalid API key returns 401', async ({ request }) => {
  const response = await request.put(`${BASE_URL}/1`, {
    headers: {
      api_key: '123',
    },
    data: {
      status: 'IN PROGRESS',
    },
  });

  expect(response.status()).toBe(StatusCodes.BAD_REQUEST);
});

