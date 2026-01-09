import { test as base } from '@playwright/test'
import { LoginPage } from '../pages/login-page'
import { OrderPage } from '../pages/order-page'
import FoundPage from '../pages/found-page'
import NotFoundPage from '../pages/not-found-page'
import { PASSWORD, USERNAME } from '../../config/env-data'

type ExtendedTest = {
  loginPage: LoginPage
  orderPage: OrderPage
  foundPage: FoundPage
  FoundPage: FoundPage
  NotFoundPage: NotFoundPage
  auth: { jwt: string }
  orderId: string
  deliveredStatus: string
}

export const test = base.extend<ExtendedTest>({

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page)
    await use(loginPage)
  },
  orderPage: async ({ page }, use) => {
    const orderPage = new OrderPage(page)
    await use(orderPage)
  },
  foundPage: async ({ page }, use) => {
    const foundPage = new FoundPage(page)
    await use(foundPage)
  },


  FoundPage: async ({ page }, use) => {
    const orderFoundPage = new FoundPage(page)
    await use(orderFoundPage)
  },
  NotFoundPage: async ({ page }, use) => {
    const orderNotFoundPage = new NotFoundPage(page)
    await use(orderNotFoundPage)
  },


  auth: async ({ request }, use) => {
    const response = await request.post('https://backend.tallinn-learning.ee/login/student', {
      data: {
        username: USERNAME,
        password: PASSWORD,
      },
    })
    const jwt = await response.text()
    await use({ jwt })
  },


  orderId: async ({ auth, request }, use) => {
    const response = await request.post('https://backend.tallinn-learning.ee/orders', {
      data: {
        status: 'OPEN',
        customerName: 'customerName',
        customerPhone: 'customerPhon',
        comment: 'comment',
      },
      headers: {
        Authorization: `Bearer ${auth.jwt}`,
        'Content-Type': 'application/json',
      },
    })
    const responseData = await response.json()
    await use(String(responseData.id))
  },

  // фикстура для подмены статуса заказа
  deliveredStatus: async ({ page, orderId }, use) => {
    await page.route('**/orders/*', async (route) => {
      await route.fulfill({
        status: 200,
        json: {
          status: 'DELIVERED',
          courierId: null,
          customerName: 'customerName',
          customerPhone: 'customerPhone',
          comment: 'comment',
          id: Number(orderId),
        },
      })
    })
    await use('DELIVERED')
  },
})
