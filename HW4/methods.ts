
// TASK 1: Calculator
class Calculator {
    addition(num1: number, num2: number): number {
        return num1 + num2;
    }

    isGreater(num1: number, num2: number): boolean {
        return num1 > num2;
    }
}

// Test Calculator
const calc = new Calculator();
console.log("TASK 1: addition 5 + 3 =", calc.addition(5, 3)); // 8
console.log("TASK 1: isGreater 5 > 3 =", calc.isGreater(5, 3)); // true
console.log("TASK 1: isGreater 2 > 7 =", calc.isGreater(2, 7)); // false

// TASK 2: Product
class Product {
    name: string;
    price: number;
    quantity: number;

    constructor(name: string, price: number, quantity: number) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    isInStock(): boolean {
        return this.quantity > 0;
    }
}

// Test Product
const prod1 = new Product("Laptop", 1000, 5);
const prod2 = new Product("Mouse", 100, 0);

console.log("TASK 2: prod1 in stock?", prod1.isInStock()); // true
console.log("TASK 2: prod2 in stock?", prod2.isInStock()); // false
