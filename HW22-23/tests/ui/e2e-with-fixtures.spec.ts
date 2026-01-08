import { test } from '../fixtures/basePage.fixture'
import { expect } from '@playwright/test'

const newOrder = {
  customerName: 'customerName',
  customerPhone: 'customerPhone',
  comment: 'comment',
}

test.beforeEach(async ({ context, auth, orderPage }) => {
  await context.addInitScript((token) => {
    localStorage.setItem('jwt', token)
  }, auth.jwt)
  await orderPage.open()
})

// cоздание заказа
test('1 Create order using fixtures auth', async ({ orderPage }) => {
  await orderPage.fillElement(orderPage.nameField, newOrder.customerName)
  await orderPage.fillElement(orderPage.phoneField, newOrder.customerPhone)
  await orderPage.fillElement(orderPage.commentField, newOrder.comment)

  const createOrderResponse = orderPage.page.waitForResponse('**/orders')
  await orderPage.clickElement(orderPage.createOrderButton)
  await createOrderResponse
  await orderPage.checkElementVisibility(orderPage.successfulCreationPopup)
})

// поиск созданного заказа
test('2 Find created order using fixtures auth and order create in delivery status', async ({
  orderId,
  orderPage,
  foundPage,
}) => {
  await orderPage.clickElement(orderPage.statusButton)
  await orderPage.fillElement(orderPage.orderIdInputField, orderId)
  const trackOrderResponse = orderPage.page.waitForResponse('**/orders/*')
  await orderPage.clickElement(orderPage.trackButton)
  await trackOrderResponse
  await foundPage.checkElementVisibility(foundPage.orderName)
  expect(await foundPage.orderName.innerText()).toBe(newOrder.customerName)
})

// проверка заказа с подменой статуса DELIVERED
test('3 Check delivered order using deliveredStatus fixture', async ({
  orderId,
  orderPage,
  foundPage,
  deliveredStatus,
}) => {
  await orderPage.clickElement(orderPage.statusButton)
  await orderPage.fillElement(orderPage.orderIdInputField, orderId)
  const trackOrderResponse = orderPage.page.waitForResponse('**/orders/*')
  await orderPage.clickElement(orderPage.trackButton)
  await trackOrderResponse
  await foundPage.checkElementVisibility(foundPage.activeStatus)
  expect(await foundPage.activeStatus.innerText()).toBe(deliveredStatus)

})

// проверка отображения страницы FoundPage
test('4 OrderFoundPage elements visibility', async ({ orderId, FoundPage, orderPage }) => {
  await orderPage.clickElement(orderPage.statusButton)
  await orderPage.fillElement(orderPage.orderIdInputField, orderId)
  const trackOrderResponse = orderPage.page.waitForResponse('**/orders/*')
  await orderPage.clickElement(orderPage.trackButton)
  await trackOrderResponse
  await FoundPage.checkAllElementsVisible()
})

// проверка страницы NotFoundPage при несуществующем заказе
test('5 OrderNotFoundPage displays correctly for invalid orderId', async ({ NotFoundPage, orderPage }) => {
  await orderPage.clickElement(orderPage.statusButton)
  await orderPage.fillElement(orderPage.orderIdInputField, '14881337') 
  const trackOrderResponse = orderPage.page.waitForResponse('**/orders/*')
  await orderPage.clickElement(orderPage.trackButton)
  await trackOrderResponse
  await NotFoundPage.checkNotFoundMessageVisible() 
})
