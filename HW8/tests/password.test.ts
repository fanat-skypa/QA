import { calculatePasswordStrength } from '../src/password'

describe('calculatePasswordStrength', () => {

    test('short and simple → Very Weak', () => {
        expect(calculatePasswordStrength('qwe')).toBe('Very Weak')
    })

    test('>=8 chars lower + digits → Weak', () => {
        expect(calculatePasswordStrength('qwe123123')).toBe('Weak')
    })

    test('>=12 chars, lower + upper → Moderate', () => {
        expect(calculatePasswordStrength('QWEqweqweqwe')).toBe('Moderate')
    })

    test('>=12 chars, lower, upper, digits, special symbols → Strong', () => {
        expect(calculatePasswordStrength('qwE1!qweqwe')).toBe('Strong')
    })

    test('no digits, no special symbols, short → Very Weak', () => {
        expect(calculatePasswordStrength('QWE')).toBe('Very Weak')
    })

})