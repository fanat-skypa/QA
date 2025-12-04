// functionsHomework.ts

// TASK 1: Temperature Converter
function convertToFahrenheit(celsius: number): number {
    return (celsius * 9/5) + 32;
}

// TASK 2: Greeting Generator
function greetUser(firstName: string, lastName: string): string {
    return `Hello, ${firstName} ${lastName}!`;
}

// TASK 3: Rectangle Area Calculator
function calculateArea(width: number, height: number): number {
    return width * height;
}

// TASK 4: Simple Sum
function addNumbers(a: number, b: number): number {
    return a + b;
}

// Test calls
console.log("TASK 1:", convertToFahrenheit(25));        // 77
console.log("TASK 2:", greetUser("Vitali", "Logvin"));    // Hello, Vitali Logvin!
console.log("TASK 3:", calculateArea(4, 3));            // 12
console.log("TASK 4:", addNumbers(3, 5));               // 8
