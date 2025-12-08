import { Product } from '../src/product'

describe('Product class tests', () => {
    test('getPrice method should return 0 by default', () => {
        const product = new Product('Sample Product')
        expect(product.getPrice()).toBe(0)
    })

    test('setPrice should update the price', () => {
        const product = new Product('Sample Product')
        const newPrice = 5;
        product.setPrice(newPrice)
        expect(product.getPrice()).toBe(newPrice)
    })
})
