import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login-page'
import { OrderPage } from '../pages/order-page'
import FoundPage from '../pages/found-page'
import NotFoundPage from '../pages/not-found-page'
import { BrowserContext, Page, Route } from '@playwright/test'

const JWT_TOKEN =
  'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyb21hbm5qaiIsImV4cCI6MTc2Njg0MzQwOSwiaWF0IjoxNzY2ODI1NDA5fQ.Xtl8fm3pjXJwb0Xe61blhGQP4soz4nuD_3LBtDWGyV50_WveqBrNWa1EiOrbNuXQrHA9kclNLaWEDj7cLIlUeg'

test('TL-22-1 Sign in with mocks', async ({ page }) => {
  const loginPage = new LoginPage(page)
  const orderPage = new OrderPage(page)
  await loginPage.mockAuth()
  await loginPage.open()
  await loginPage.usernameField.fill('test')
  await loginPage.passwordField.fill('test1234')
  await loginPage.signInButton.click()
  await orderPage.checkElementVisibility(orderPage.trackButton)
})

// функция для моков заказов
async function setupOrderMocks(context: BrowserContext, orderData: any): Promise<Page> {
  await context.addInitScript((token: string) => {
    localStorage.setItem('jwt', token)
  }, JWT_TOKEN)

  const page = await context.newPage()

  await page.route('**/orders', async (route: Route) => {
    await route.fulfill({ status: 200, json: orderData })
  })

  await page.route('**/orders/*', async (route: Route) => {
    if (orderData.status === 'NOT_FOUND') {
      await route.fulfill({ status: 404 })
    } else if (orderData.status === 'ERROR') {
      await route.fulfill({ status: 500 })
    } else {
      await route.fulfill({ status: 200, json: orderData })
    }
  })

  return page
}

test('2 Create and find order', async ({ context }) => {
  const newOrder = { id: 100, status: 'OPEN', courierId: null, customerName: 'customerName', customerPhone: 'customerPhone', comment: 'comment' }
  const page = await setupOrderMocks(context, newOrder)

  const loginPage = new LoginPage(page)
  const orderPage = new OrderPage(page)
  const foundPage = new FoundPage(page)

  await loginPage.open()

  await orderPage.nameField.fill(newOrder.customerName)
  await orderPage.phoneField.fill(newOrder.customerPhone)
  await orderPage.commentField.fill(newOrder.comment)

  const createResponse = page.waitForResponse('**/orders')
  await orderPage.createOrderButton.click()
  await createResponse
  await orderPage.checkCreationPopupVisible()
  expect(await orderPage.getOrderIdFromPopup()).toBe(newOrder.id)
  await orderPage.okButton.click()

  await orderPage.statusButton.click()
  await orderPage.fillElement(orderPage.orderIdInputField, String(newOrder.id))

  const trackResponse = page.waitForResponse('**/orders/*')
  await orderPage.trackButton.click()
  await trackResponse
  expect(await foundPage.orderName.innerText()).toBe(newOrder.customerName)
})

test('3 Find order OPEN', async ({ context }) => {
  const order = { id: 200, status: 'OPEN', courierId: null, customerName: 'testName', customerPhone: 'testPhone', comment: 'testComment' }
  const page = await setupOrderMocks(context, order)
  const orderPage = new OrderPage(page)
  const foundPage = new FoundPage(page)

  await orderPage.open()
  await orderPage.statusButton.click()
  await orderPage.fillElement(orderPage.orderIdInputField, String(order.id))

  const response = page.waitForResponse('**/orders/*')
  await orderPage.trackButton.click()
  await response

  expect(await foundPage.getStatusActive()).toBe('OPEN')
})

test('4 Find order DELIVERED', async ({ context }) => {
  const order = { id: 100, status: 'DELIVERED', courierId: null, customerName: 'testName', customerPhone: 'testPhone', comment: 'testComment' }
  const page = await setupOrderMocks(context, order)
  const orderPage = new OrderPage(page)
  const foundPage = new FoundPage(page)

  await orderPage.open()
  await orderPage.statusButton.click()
  await orderPage.fillElement(orderPage.orderIdInputField, String(order.id))

  const response = page.waitForResponse('**/orders/*')
  await orderPage.trackButton.click()
  await response

  expect(await foundPage.getStatusActive()).toBe('DELIVERED')
})

test('5 Order not found', async ({ context }) => {
  const page = await setupOrderMocks(context, { status: 'NOT_FOUND' })
  const orderPage = new OrderPage(page)
  const notFoundPage = new NotFoundPage(page)

  await orderPage.open()
  await orderPage.statusButton.click()
  await orderPage.fillElement(orderPage.orderIdInputField, '11111111')

  const response = page.waitForResponse('**/orders/*')
  await orderPage.trackButton.click()
  await response

  await expect(notFoundPage.title).toBeVisible()
  await expect(notFoundPage.title).toHaveText('Order not found')
})

test('6 Service error 500', async ({ context }) => {
  const page = await setupOrderMocks(context, { status: 'ERROR' })
  const orderPage = new OrderPage(page)
  const notFoundPage = new NotFoundPage(page)

await orderPage.open()
await orderPage.statusButton.waitFor({ state: 'visible', timeout: 20000 })
await orderPage.statusButton.click({ force: true })
await orderPage.fillElement(orderPage.orderIdInputField, '100')


  const response = page.waitForResponse('**/orders/*')
  await orderPage.trackButton.click()
  await response

  await expect(notFoundPage.title).toBeVisible()
  await expect(notFoundPage.title).toHaveText('Order not found')
})
