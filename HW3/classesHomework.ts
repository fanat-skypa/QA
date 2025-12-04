// classesHomework.ts

// TASK 1: Class with fields only
class PersonFields {
    firstName: string | undefined;
    lastName: string | undefined;
}

const person1 = new PersonFields();
person1.firstName = "Vitali";
person1.lastName = "Logvin";

const person2 = new PersonFields();
person2.firstName = "Vitali";
person2.lastName = "Tsal";

console.log("TASK 1:", person1, person2);



// TASK 2: Class with constructor
class PersonConstructor {
    firstName: string;
    lastName: string;
    age: number;

    constructor(firstName: string, lastName: string, age: number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }
}

const person3 = new PersonConstructor("Charlie", "Kirk", 30);
const person4 = new PersonConstructor("Joe", "Biden", 25);

console.log("TASK 2:", person3, person4);
