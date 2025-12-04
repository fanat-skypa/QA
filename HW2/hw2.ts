/// TASK 1 



const lengthValue: number = 5;
const widthValue: number = 3;

const areaValue: number = lengthValue * widthValue;

console.log("TASK 1: area value" + areaValue);

// TASK 2

const weightValue: number = 72;
const heightValue: number = 1.78;

const bmiValue: number = weightValue / (heightValue * heightValue);

console.log("TASK 2: BMI value " + bmiValue);

// TASK 3

const celsiusValue: number = 25;

const fahrenheitValue: number = (9 / 5) * celsiusValue + 32;

console.log("TASK 3: fahrenheit value " + fahrenheitValue);

// TASK 4

const ageValue: number = 20;
const isAdult: boolean = ageValue >= 18;

console.log("TASK 4: is adult? " + isAdult);

// TASK 5

const firstName: string = "Vitali";
const lastName: string = "Logvin";

const fullName: string = firstName + " " + lastName;

console.log("TASK 5: full name " + fullName);

// TASK 6

const userAge: number = 18;
const requiredAge: number = 18;

const hasAccess: boolean = userAge === requiredAge;

console.log("TASK 6: has access " + hasAccess);

// TASK 7

const userInput: string = "18";
const actualAge: number = 18;

const isEqualLoose: boolean = Number(userInput) == actualAge; 
const isEqualStrict: boolean = Number(userInput) === actualAge;

console.log("TASK 7: isEqualLoose " + isEqualLoose);
console.log("TASK 7: isEqualStrict " + isEqualStrict);

// TASK 8

const numericString: string = "123";
const convertedNumber: number = Number(numericString);

console.log("TASK 8: original string " + numericString);
console.log("TASK 8: converted number " + convertedNumber);

// TASK 9

const numberValue: number = 456;
const convertedString: string = String(numberValue);

console.log("TASK 9: original number " + numberValue);
console.log("TASK 9: converted string " + convertedString);



