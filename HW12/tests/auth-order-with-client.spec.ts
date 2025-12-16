import { expect, test } from '@playwright/test'
import { ApiClient } from '../src/ApiClient'
import { StatusCodes } from 'http-status-codes'


const BASE_URL = 'https://backend.tallinn-learning.ee'

test('login and create order with api client', async ({ request }) => {
  const apiClient = await ApiClient.create(request)
  const orderId = await apiClient.createOrderAndReturnOrderId()
})

test('get orders with api client', async ({ request }) => {
  const apiClient = await ApiClient.create(request)
  const ordersBefore = await apiClient.getOrders()
  await apiClient.createOrderAndReturnOrderId()
  const ordersAfter = await apiClient.getOrders()

  expect(ordersBefore.length < ordersAfter.length).toBeTruthy()
})



test('login, create order and delete by id with api client', async ({ request }) => {
  const apiClient = await ApiClient.create(request)

  const orderId = await apiClient.createOrderAndReturnOrderId()

  const deleteResponse = await apiClient.deleteOrderById(orderId)
  expect(deleteResponse.status()).toBe(StatusCodes.OK)
})