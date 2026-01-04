//массив из трёх чисел
const numbers_array: number[] = [10, 20, 30];
console.log(numbers_array);
console.log(numbers_array.length);

//массив из строк + push
const strings_push: string[] = ['apple', 'banana'];
console.log(strings_push);
strings_push.push('cherry');
console.log(strings_push);
console.log(strings_push.length);

//массив из трёх строк + pop
const strings_pop: string[] = ['cat', 'dog', 'bird'];
console.log(strings_pop);
strings_pop.pop();
console.log(strings_pop);
console.log(strings_pop.length);

//пустой массив чисел + push
const numbers_push: number[] = [];
console.log(numbers_push.length);
numbers_push.push(5);
console.log(numbers_push.length);
numbers_push.push(10);
console.log(numbers_push.length);




//вывести элементы массива через for
const numbers_array_for: number[] = [1, 2, 3, 4, 5];
for (let i = 0; i < numbers_array_for.length; i++) {
  console.log(numbers_array_for[i]);
}

//сумма элементов массива через for
const numbers_array_sum: number[] = [2, 4, 6, 8, 10];
let sum = 0;
for (let i = 0; i < numbers_array_sum.length; i++) {
  sum += numbers_array_sum[i];
}
console.log('summ:', sum);

//новый массив с элементами умноженными на 2
const numbers_array_multiply: number[] = [1, 3, 5];
const multiply: number[] = [];
for (let i = 0; i < numbers_array_multiply.length; i++) {
  multiply.push(numbers_array_multiply[i] * 2);
}
console.log(multiply);

//вывести элементы в обратном порядке
const numbers_back: number[] = [10, 20, 30];
for (let i = numbers_back.length - 1; i >= 0; i--) {
  console.log(numbers_back[i]);
}




//найти максимальное число
const numbers_big: number[] = [5, 12, 8, 20, 3];
let big = numbers_big[0];
for (let i = 1; i < numbers_big.length; i++) {
  if (numbers_big[i] > big) big = numbers_big[i];
}
console.log('biggest number:', big);


//найти минимальное число
const numbers_min: number[] = [5, 12, 8, 20, 3];
let min = numbers_min[0];
for (let i = 1; i < numbers_min.length; i++) {
  if (numbers_min[i] < min) min = numbers_min[i];
}
console.log('min number:', min);

//количество чётных чисел
const numbers_odd: number[] = [2, 7, 4, 9, 10];
let count = 0;
for (let i = 0; i < numbers_odd.length; i++) {
  if (numbers_odd[i] % 2 === 0) count++;
}
console.log('odd numbers count:', count);

//новый массив из положительных чисел
const numbers_positive: number[] = [-5, 0, 10, -3, 7];
const positives: number[] = [];
for (let i = 0; i < numbers_positive.length; i++) {
  if (numbers_positive[i] > 0) positives.push(numbers_positive[i]);
}
console.log('positive numbers:', positives);
