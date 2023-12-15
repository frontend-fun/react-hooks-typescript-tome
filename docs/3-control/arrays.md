---
layout: default
title: Arrays
nav_order: 3.2
parent: TypeScript
---

# TypeScript Arrays

[&laquo; Return to Primitives and Control Flow](primitives.md)

<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

# Arrays

JavaScript has lists, but calls them "Arrays". This is because JavaScript was dumb and didn't know what to name things. They are really lists, but we'll go with the JavaScript lingo and call them Arrays. But remember they act more like Java's `ArrayList` or Python's Lists, compared to Java's or C++'s arrays.

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

// Append a 55 to the end of the array
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
const prices = [10, 8, 9, 7];
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
const doubled = prices.map((price: number): number => price*2);
console.log(doubled);

// Foreach loop style - do not use this!
let doubled = [];
for (const price of prices) {
  doubled.push(price);
  // Alternative Immutable style which we won't use either:
  // doubled = [...doubled, price];
}
console.log(doubled);
```

Then what if we want to convert an array? WE STILL USE MAP. We can change the return type to be something besides the original element type.

```typescript
const prices = [13, 7, 8, 2];

const dollars = prices.map((price: number): string => "$"+price.toString());
console.log(dollars);
```

So why not `for` loop? Not the style. We tend to always have a list, take advantage of that.

So why not `while` loops? ARE YOU SERIOUS DO NOT USE `while` LOOPS. They are messy and error-prone. I will be surprised if you ever actually need a `while` loop in this course.

# Filter an Array

Want to remove some elements from an array?

```
filter:
  items: X[]
  (currentItem: X) -> boolean
  ----
  Returns: X[]
```

The `filter` function consumes an element of the array, and let's you ask a question by passing in a "predicate", or a function that returns a boolean. For instance, you might have a helper function that asks something like "is this an even number?", or "does this string begin with a certain symbol?" If you want to make a list smaller than it was (or potentially the same size), without changing the type, then this is the function for you.

```typescript
const prices = [13, 7, 8, 2, 19];

const lowPrices = prices.filter((price: number): boolean => price < 10);
console.log(lowPrices);
```

This might be easier to see if break the helper function out separately:

```typescript
const prices = [13, 7, 8, 2, 19];

const isLowPrice = (price: number): boolean => price < 10;
const lowPrices = prices.filter(isLowPrice);
console.log(lowPrices);
```

Do you see how we wrote `isLowPrice` instead of `isLowPrice()`? We're not calling `isLowPrice`, we're passing the reference to the `isLowPrice` function to the `filter` so the `filter` function can call `isLowPrice` for us without us having to do so.

Let's write it one more time, as if it were an `if` statement in a `for` loop, just so you can see.

```typescript
// Don't use this approach!
const prices = [13, 7, 8, 2, 19];

let lowPrices = [];
for (const price of prices) {
  if (price < 10) {
    lowPrices.push(price);
  }
}
console.log(lowPrices);
```

A handy trick is to use the `length` field to count the quantity of something:

```typescript
const sentences = ["How are you?", "I am great.", "Oh really?"];

const questions = sentences.filter(
    // Check if the string in `sentence` includes the substring "?"
    (sentence: string): boolean => sentence.includes("?"));
// Get the `length` of the array
console.log("There were", questions.length, "questions.");
```

# Conditionally Modify Array

So we saw how to REMOVE elements from an array, and how to CHANGE elements in an array. What if we want to CHANGE SOME OF THE ELEMENTS in the array? Sometimes folks get confused and think they need `filter`, but you actually need to use `map`. Think about it - the list is still the same size, we're just changing some of the elements. The confusing part is that we still need a *question*.

Let's say we want to double all the "small" prices (prices less than $10). We can use the ternary `?` operator, which we saw in the previous chapter, to write this succinctly.

```typescript
const prices = [13, 7, 8, 2, 19];

const doubledLowPrices = prices.map(
  // If the price is less than 10, double the price, otherwise use the price unchanged
  (price: number): number => (price < 10) ? (2 * price) : price
);
console.log(doubledLowPrices);
```

If you aren't used to the `?` operator yet, you might find the `for` loop version easier to read - but that does not mean you should use that version!

```typescript
// Don't use this approach!
const prices = [13, 7, 8, 2, 19];

let doubledLowPrices = [];
for (const price of prices) {
  if (price < 10) {
    doubledLowPrices.push(2 * price);
  } else {
    doubledLowPrices.push(price);
  }
}
console.log(doubledLowPrices);
```

Once you get used to the ternary `?` operator, your life will be very sweet indeed.

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

Real quick, here are some other useful array functions. You gotta go learn them on your own though!

```typescript
const prices = [13, 7, 8, 2, 19];

// `find` gives you an element matching a condition
const firstLowPrice = prices.find((price: number): boolean => price < 10);
console.log("First low price is", firstLowPrice);

// `findIndex` gives you the index of the element matching a condition
const firstLowPriceIndex = prices.findIndex((price: number): boolean => price < 10);
console.log("Index of first low price is", firstLowPriceIndex);

// `every` checks if a condition holds for each element (repeatedly and)
const allLowPrices = prices.every((price: number): boolean => price < 10);
console.log("All prices are low:", allLowPrices);

// `some` checks if a conditions holds for at least one element (repeatedly or)
const anyLowPrices = prices.some((price: number): boolean => price < 10);
console.log("Any prices are low:", anyLowPrices);

// `join` combines elements with a string
const thePrices = prices.join(" and ");
console.log("The prices are", thePrices);

// `sort` sorts a list. This is done inplace, like `splice`, so we need a copy.
// Keep an eye on the second argument, very tricky: it's the comparison function
const descendingPrices = [...prices];
descendingPrices.sort((a: number, b: number): number => b - a);
console.log("The prices in descending order are", descendingPrices);
// Still isn't this better than making your own sort function?

// `length` is a field, not a function, gives you the length of the array.
const priceCount = prices.length;
console.log("There are", priceCount, "prices");
```


# 📝 Task - Arrays

This stuff never makes sense just reading about it. Let's try working on some problems instead!

As always, begin by pulling our changes, making a new branch, and merging in our changes.

```sh
$> git pull upstream main
$> git fetch upstream task-arrays
$> git checkout -b solved-arrays
$> git merge upstream/task-arrays
```

You'll need to edit the `arrays.ts` file.

YOU MAY NOT USE `for` LOOPS, `while` LOOPS, or recursion! You MUST use the array methods we have taught you. You must also avoid mutating the original arrays - all changes must be immutable! As long as you stick to the commands on this page, you shouldn't have any issues.

You may need additional functions in JavaScript; don't be afraid to seek help as needed if you aren't sure how to do a specific conversion (e.g., a string into an integer).

Check your status with the tests by running:

```sh
$> npm run test:cov
```

If you are overwhelmed by the number of failing tests, you can focus on just one at a time by typing `t` and entering the name of the function you want to test (e.g., `bookEndList`). You can go back to running all the tests by typing `a`.

As you complete functions, use the `git add`/`git commit` or the Visual Studio Code interface to make small regular commits. Practice the habit now!

Once you are passing all the tests, you should be able to push your branch to the remote and make a Pull Request to `main`. We'll be checking your tests to make sure you pass!

```sh
$> git push --set-upstream origin solved-arrays
```

Once you're done submitting, we can learn about [TypeScript Objects &raquo;](../3-control/objects.md)
