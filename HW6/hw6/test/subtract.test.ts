import { subtract, sum } from '../src/calculator'

describe('Subtract function from Calculator tests', () => {
    test('Subtract small from big', () => {
        expect(subtract(10, 2)).toBe(8)
    })

    test('Subtract big from small', () => {
        expect(subtract(2, 10)).toBe(-8)
    })

    test('Subtract num from negative', () => {
        expect(subtract(-10, 10)).toBe(-20)
    })

    test('Subtract floats', () => {
        expect(subtract(0.9, 0.3)).toBeCloseTo(0.6)
    })

    test('Subtract string from num', () => {
        // @ts-ignore
        expect(subtract(10, 'a')).toBeNaN()
    })
})

describe('Subtract and Sum function integration tests', () => {
    test('', () => {
        const sumFunctionResult = sum(1, 4)
        expect(subtract(sumFunctionResult, 3)).toBe(2)
    })
})
