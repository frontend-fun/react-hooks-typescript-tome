---
layout: default
title: TypeScript Arrays
nav_order: 3.2
parent: TypeScript
---

# TypeScript Arrays

<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

# Arrays

JavaScript has lists, but calls them "Arrays". This is because JavaScript was dumb and doesn't know what to name things. They are really lists, but we'll go with the JavaScript lingo and call them Arrays.

```typescript
// Example of creating array variables
let fruits: string[] = ["apple", "banana", "orange"];
let grades: number[] = [90, 93, 78, 45, 99, 100];

console.log(fruits);
console.log(grades);
```

The array type is just a regular type followed by a pair of empty square brackets.

You can use array types just like any other type, so they can be used for functions too.

```typescript
// Function that consumes an array of numbers
const summate = (numbers: number[]): number => {
  // ...
}

// Function that consumes an array of strings and produces an array of strings
const removeQuestions = (sentences: string[]): string[] => {
  // ...
}
```

# Reference equality vs value equality

This is the big critical test. Do you know what the answers are?

```typescript
const x = [1, 2, 3];
const y = [1, 2, 3, 4];
const z = x;

// Append a 4 to the end of the array
x.push(4);

// Which of these evaluate to true?
console.log(x === y);
console.log(x === z);
```

Run the code to see. Then look at the below if you got it wrong.

The variable `y` is a separate array from `x`. Modifying `x` does not affect `y`. JavaScript equality tests that two arrays have the same *reference*, not the same *contents*. It doesn't matter what is inside, it basically matters if they are the same place in memory.

The variable `z` is pointing at the same array as `x`. So it's not a separate array. Anytime you modify `x`, you are also modifying `z`. This example below might give you a better mental model:

```typescript
// These are my exam grades
const myGrades = [100, 95, 97];
// You earned the same grades
const yourGrades = [100, 95, 97];
// I can get another reference to myGrades
const drBartsGrades = myGrades;

// Append a 4 to the end of the array
myGrades.push(55);

// Which of these evaluate to true?
console.log("myGrades is the same as drBartsGrades:", myGrades === drBartsGrades);
console.log("myGrades is not the same as yourGrades:", myGrades !== yourGrades);
```

# The Spread Operator

We can create a new copy of an existing array by using the spread operator `...` to unpack the existing array into a new array literal.

```typescript
// These are my exam grades
const myGrades = [100, 95, 97];
// I can get another reference to myGrades
const clonedGrades = [...myGrades];

console.log("myGrades:", myGrades);
console.log("clonedGrades:", clonedGrades);
// They are different references, despite having the same data
console.log("myGrades===clonedGrades", myGrades === clonedGrades);
```

The `...` operator is not part of the `[  ]` square brackets. The square brackets are being used to create a new literal array. The `...` works separately. These dots work with function calls too to "unpack" the contents of an array into function calls as separate arguments.

```typescript
const prices = [10, 8, 9, 7, 55];

console.log(10, 8, 9, 7, 55);
// 10, 8, 9, 7, 55

console.log(prices);
// [10, 8, 9, 7, 55]

console.log(...prices);
// 10, 8, 9, 7, 55

console.log([...prices]);
// [10, 8, 9, 7, 55]
```

# Adding an element to the end (push)

Previously you saw me use the `push` method to add an element to an array. You won't do that anymore. Instead, you're going to use the spread operator to unpack the array and then add a new element to the end, thereby creating NEW arrays. We'll talk about why later, but the gist is that we aren't going to modify our arrays, we're going to make new arrays based on old arrays.

```typescript
const prices = [10, 8, 9, 7, 55];
console.log(prices);

const pricesAtEnd = [...prices, 55];
console.log(pricesAtEnd);
// [10, 8, 9, 7, 55]

const pricesAtStart = [55, ...prices];
console.log(pricesAtStart);
// [55, 10, 8, 9, 7]

const doublePrices = [...prices, ...prices];
console.log(doublePrices);
// [10, 8, 9, 7, 10, 8, 9, 7]
```

# Inserting into an Array

There are many ways to add an element into an array at an arbitrary position. In this course, since we want to avoid mutating the original array, we will follow this pattern:

```typescript
const prices = [10, 8, 9, 7, 55];
console.log(prices);

// GOAL: Insert 499 after the 8 (aka after index 2)
// Make a duplicate of the original array
const pricesInside = [...prices]
// Use the Array's `splice` method that mutates the cloned array
// Splice takes three arguments: the new position, the number of
//    deletions, and then the new element 
pricesInside.splice(2, 0, 499)

console.log(pricesInside)
// [10, 8, 499, 9, 7, 55]
```

We clone the original array with the spread operator, and then mutate the cloned array with the `splice` method. This method is tricky and probably not something you've seen before, but it is actually straightforward. The function takes the **target index**, the **number of deletions**, and then the **new value**. The function does not return anything we need, so we DO NOT assign the result.

Why does `splice` take a **number of deletions**? Because if you wanted to replace items, you could pass in `1` instead of `0`. Then it would delete one element at that index, and then add another. Whether or not this is truly convenient, it is necessary to remember when using `splice`.

# Map an Array

A function that converts a single value to a single value

```
map:
  items: X[]
  (currentItem: X) -> Y
  ----
  Returns: Y[]
```

Let's use this to modify every element of the array.

```typescript
// Double all the prices
const prices = [13, 7, 8, 2];

// Using `map` - awesome!
const doubled = prices.map((num: number): number => num*2);
console.log(doubled);

// Foreach loop style - do not use this!
let doubled = [];
for (const num of prices) {
  doubled = [...doubled, num];
  // Mutable style which we won't use:
  // doubled.push(num);
}
console.log(doubled);
```

Then what if we want to convert an array? WE USE MAP.

```typescript
// Example where we change the type
```

So why not `for` loop? Not the style. We tend to always have a list, take advantage of that.

So why not `while` loops? ARE YOU SERIOUS DO NOT USE `while` LOOPS.

# Filter an Array

Want to remove some elements from an array?

```
filter:
  items: X[]
  (currentItem: X) -> boolean
  ----
  Returns: X[]
```

```typescript

```

# Conditionally Modify Array

What if we combine the `?` and `map`? IT WILL BE AWESOME.

# Reduce an Array

```
reduce:
  items: X[]
  (resultSoFar: Y, currentItem: X) -> Y
  initialValue: X
  ----
  Returns: Y
```

People tend to get confused by the `reduce` function, because it's weirder. It has an extra parameter (`initialValue`) and its function (the "reducer") has two parameters instead of one.

The `reduce` function makes more sense when you see how it connects to a classic `for` or `foreach` loop accumulation. The idea is that you have an "in-progress" variable with some initial value that is defined *outside* of the loop and updated *inside* of the loop. 

```typescript
const prices = [13, 7, 8, 2];

// Using `reduce` method - awesome!
const sum = prices.reduce((currentTotal: number, num: number) => currentTotal+num, 0);
console.log(sum);

// Foreach style - do not use!
let currentTotal = 0;
for (const num of prices) {
  currentTotal += num;
}
const sum = currentTotal;
console.log(sum);

// For style - do not use!
let currentTotal = 0;
for (let i=0; i < prices.length; i+=1) {
  const num = prices[i];
  currentTotal += num;
}
const sum = currentTotal;
console.log(sum);
```

# Other Array Operations

```typescript
// TODO: Finish this list

// `find` gives you an element matching a condition

// `findIndex` gives you the index of the element matching a condition

// `every` checks if a condition holds for all elements (repeatedly and)

// `some` checks if a conditions holds for at least one element (repeatedly or)

// `join` combines elements with a string

// `sort` sorts a list. Keep an eye on the second argument, very tricky.

// `length` is a field, not a function, gives you the length of the array.
```

Seriously try to find a list of these? I don't want to recreate the wheel.

