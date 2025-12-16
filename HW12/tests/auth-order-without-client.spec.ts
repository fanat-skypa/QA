import { expect, test } from '@playwright/test'
import { LoginDTO } from './dto/LoginDTO'
import { OrderDTO } from './dto/OrderDTO'
import { StatusCodes } from 'http-status-codes'

const BASE_URL = 'https://backend.tallinn-learning.ee'

test('login, create order, delete order, check deletion', async ({ request }) => {
  //авторизация и получение JWT
  const authResponse = await request.post(`${BASE_URL}/login/student`, {
    data: LoginDTO.createLoginWithCorrectData(),
  })
  expect(authResponse.status()).toBe(StatusCodes.OK)
  const jwt = await authResponse.text()

  //создание нового заказа
  const orderData = OrderDTO.createOrderWithRandomData()
  const orderResponse = await request.post(`${BASE_URL}/orders`, {
    headers: { Authorization: `Bearer ${jwt}` },
    data: orderData,
  })
  expect(orderResponse.status()).toBe(StatusCodes.OK)
  const orderJson = await orderResponse.json()
  const orderId = orderJson.id

  //удаление созданного заказа
  const deleteResponse = await request.delete(`${BASE_URL}/orders/${orderId}`, {
    headers: { Authorization: `Bearer ${jwt}` },
  })
  expect(deleteResponse.status()).toBe(StatusCodes.OK)

  //проверка, что заказ больше не существует
  const getDeletedOrderResponse = await request.get(`${BASE_URL}/orders/${orderId}`, {
    headers: { Authorization: `Bearer ${jwt}` },
})

  const text = await getDeletedOrderResponse.text() // читаем как текст
  const deletedOrderJson = await getDeletedOrderResponse.json().catch(() => null) // пытаемся распарсить как JSON, если не получается - возвращаем null
  expect(deletedOrderJson).toBeNull()
})



test('login, get order by ID', async ({ request }) => {
  //авторизация и получение JWT
  const authResponse = await request.post(`${BASE_URL}/login/student`, {
    data: LoginDTO.createLoginWithCorrectData(),
  })
  expect(authResponse.status()).toBe(StatusCodes.OK)
  const jwt = await authResponse.text()

  //создание нового заказа
  const orderData = OrderDTO.createOrderWithRandomData()
  const orderResponse = await request.post(`${BASE_URL}/orders`, {
    headers: { Authorization: `Bearer ${jwt}` },
    data: orderData,
  })
  expect(orderResponse.status()).toBe(StatusCodes.OK)
  const orderJson = await orderResponse.json()
  const orderId = orderJson.id

  //получение заказа по ID
  const getOrderResponse = await request.get(`${BASE_URL}/orders/${orderId}`, {
    headers: { Authorization: `Bearer ${jwt}` },
  })
  expect(getOrderResponse.status()).toBe(StatusCodes.OK)

  const getOrderJson = await getOrderResponse.json()
  expect(getOrderJson.id).toBe(orderId)
  
})