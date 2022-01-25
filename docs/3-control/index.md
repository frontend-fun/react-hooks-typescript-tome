---
layout: default
title: Control Flow
nav_order: 3
---

<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

# Control Flow

## What is JavaScript Again?

The programming language of the web.

## The Problem with JavaScript

Its type system is madness! Things are very inconsistent and surprising. It's super easy to make mistakes that will take forever to debug. When you're writing JavaScript, things will be a little crazy.

*Good bit of the video below starts at 1:23*

<iframe width="481" height="361" src="https://www.youtube.com/embed/3se2-thqf-A?t=83" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


That's why we're going to be using TypeScript instead. TypeScript adds static types to JavaScript. That means when you declare a variable, you say what type of value it holds. The variable cannot hold other kinds of values. Similarly, when you define a function, you say what type of values it takes as parameters and what type of value it returns.

## Developer Console

You can bring up your developer console by pressing `CTRL+SHIFT+J`. TODO: VERIFY THIS

The console has several useful views like the Elements panel and the Network Panel. But right now we need to focus on the `Console` tab. There you can write individual lines of JavaScript to experiment with the language, manipulate the page, and see the results of logging and errors.

## Logging

If you are used to Python or Java, you already are familiar with the idea of printing out data. In JavaScript, they refer to this as logging.

```typescript
console.log("Hello World!");
```

Try clicking the button in the topright of the code above. Then, run the code. You will see text appear above but also in your developer console.

Technically the semi-colon is optional but using it will avoid certain kinds of common mistakes.

## Types and Values

Here are the basic types:

* `number`: Includes integers and decimals. Implemented as floating points.
* `boolean`: Either `true` or `false`
* `string`: You can use `'single quotes'` or `"double quotes"`. There are also backticks ` for multi-line strings (and a lot more).

```typescript
// Numbers
console.log(49);
console.log(300.9122);
console.log(0);

// Boolean
console.log(true);
console.log(false);

// Strings
console.log("Hello there");
console.log('Guess what?\nSpecial characters exist!');
console.log(`Backticks
allow multiple lines!`);
```

There's also several special values:

* `null`: A special value used to indicate something is "unknown".
* `undefined`: Another special value used to indicate a value is not yet set.
* `NaN`: Short for "Not a Number". Except if you typecheck it, it *is* counted as a `number`. The idea is that it is produced when you do math with numbers that is invalid. Basically, if you see it in your code, things have gone badly.

## Operators

Numeric operations are normal, but are always using floating point math.

```typescript
console.log("3+4 is", 3 + 4);
console.log("9/3 is", 9 / 3);
console.log("4/0 is", 4 / 0);
console.log("0/0 is", 0 / 0);
console.log("2.1*4.7 is", 2.1 * 4.7);
// Remember modulo? Clock arithematic? Remainder? Whatever you want to call it. 
console.log("18 % 12 is", 18 % 12);
```

Booleans use `&&`, `||`, and `!`

```typescript
console.log("This produces false:", true && false);
console.log("This produces true:", true || false);
```

Strings use `+`, indexing. Strings have a bunch of useful methods that you can call.

## Variables

```typescript
const UNCHANGED_VALUE: number = 100;

let name: string = "Dr. Bart";

console.log(UNCHANGED_VALUE);
console.log(name);
```

You might also see `var`, but you don't need to worry about using it. Basically, you should always define variables using the keyword `let`.

```typescript
// You won't need this:
var name = "Dr. Bart";

console.log(name);
```

## String Interpolation

A cool feature in modern JavaScript is that we can embed variables and expressions into string literals when we use backticks.

```typescript
let name: string = "Dr. Bart";
let pets: number = 3;

let message: string = `${name} has ${pets} pets. He would like ${pets+1} pets though!`;

console.log(message);
```

# Basic Functions

Remember the vocabuarly you have seen in previous courses:

* Parameters: The formal names of the values passed to a function
* Arguments: The actual values passed to a function

You can define function in two different ways. There's the classic syntax with the `function` keyword, and the modern "lambda" syntax using the `=>` symbols. Both are called the same way, with the name of the function, parentheses, and the arguments.

```typescript
// Classic syntax
function add(first: number, second: number): number {
  return first + second;
}

// Modern "lambda" syntax
const subtract = (first: number, second: number): number => {
  return first - second;
}

// Both are called the exact same way:
console.log(add(1, 3));
console.log(subtract(9, 3));
```

To make functions available in other files, you need to use the `export` keyword:

```typescript
export const multiply = (first: number, second: number): number => {
  return first * second;
}

console.log(multiply(3, 4));
```

This won't do anything interesting here, but if were in TypeScript you'd now be able to use the `multiply` function in other files. Nifty!

## Function Signature

The `void` type is used for a function that doesn't return anything.

```typescript
export const sayHello = (name: string): void => {
  console.log("Hello", name);
}

sayHello();

console.log(sayHello());
```

What happens when you log the result of calling a `void` function? The function MUST return a value, so it returns `undefined` by default. Depending on how you log it, it might appear as an empty string or the word `undefined`. Importantly, `console.log` is NOT the same thing as `return`.

# Function Practice 1

**TODO** At this point we know enough to start having them define Monster Mash functions, right?
Some basic calculation functions that take in primitive information.

```typescript
export function countTeeth(vampires: number): number {
  return vampires * 2;
}

test("Count vampires' teeth", () => {
  expect(countTeeth(0)).toBe(0);
  expect(countTeeth(1)).toBe(2);
  expect(countTeeth(15)).toBe(30);
});
```

* Variation of that multiply-by-a-number function
* Function that does some complicated math to convert

# Conditionals

JavaScript has `if` statements. Parentheses are required.

```typescript
let age: number = 29;
if (age >= 21) {
  console.log("Can drink");
} else {
  console.log("Cannot drink");
}
```

There's also a ternary `?` operator that you can use for expressions instead of statements.

```typescript
let age: number = 29;
console.log(age >= 21 ? "Can drink" : "Cannot drink");
```

## Equality

There are two equality operators in JavaScript. There's the double equal operator (which you will never use) and the triple equal operator (which you will always use). Along with the `!==` equal operator ("not equal equal"), you can check for equality.

```typescript
console.log(1+1 === 2);
console.log("Hello" + "World" === "HelloWorld");
console.log(1+3 !== "4");
```

Okay there is actually a case where you MIGHT choose to use the double equal operator, but we're gonna skip over it for now. Just assume you won't use it.

You will basically never use `==` or `!=`. You will only ever use `===` and `!==`.

## Abusing || and &&

You will often see people abuse `&&` and `||` to conditionally execute code or provide a default value, respectively.

TODO: Finish this.

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

## Reference equality vs value equality

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

### The Spread Operator

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

### Adding an element to the end (push)

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

## Map an Array

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

## Filter an Array

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

## Conditionally Modify Array

What if we combine the `?` and `map`? IT WILL BE AWESOME.

## Reduce an Array

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

## Other Array Operations

`every`, `some`, `join`

`concat`, `length`

Seriously try to find a list of these? I don't want to recreate the wheel.

# Objects

We don't make classes, we just make objects.

You CAN make classes. But, like, we don't. We just make objects directly.

It's actually really convenient. You use `{}` to make a new object.

```typescript
let drBart = { title: "Dr. Bart", shirtColor: "blue", isProfessor: true };
let ada = { height: 23, name: "Ada Bart" };
let cisc275 = { id: "CISC275", seats: 80, online: false, labs: ['20', '21', '22'] };
let emptyObject = {};

// Get fields
console.log(drBart.shirtColor);
console.log(ada.height);
console.log(cisc275.labs);

// Fields are case-sensitive; this logs `undefined`
console.log(drBart.Title)

// If fields don't exist, then `undefined` is produced
console.log(emptyObject.name)
```

## Object-Oriented Programming vs. Functional Programming

Most likely, you have had a lot of experience with classic Object-Oriented Programming, where you organize data and control flow using classes and methods. A class describes the layout of an object, including its fields and methods. You can use the class as a template for creating new objects, which will come with an initial state based on a constructor method. When you call any method, you expect the method to manipulate the state stored in the fields of an object. The objects cluster together related state - for example, a `Person` might have their `name` and `age` fields, which relate so closely to the `Person` that it would be crazy to separate them.

On the other hand, the classic idea of Functional Programming is to organize your application's logic around function application. You still want to cluster related state - but whether you organize them into "objects" or "structs" or "records" or whatever, the functions live independent of the state. In other words, you don't have methods. Instead, you are focused on describing the composition of function calls that transform the state.

Compare these two chunks of code:

```typescript
// Object-Oriented Style
const recipe = make_new_recipe();
recipe.load_ingredients();
recipe.mix();
recipe.bake();
const result = recipe.serve();

// Functional Style
const recipe = make_new_recipe();
const ingredients = get_ingredients(recipe);
const mixedIngredients = mix(ingredients);
const bakedIngredients = bake(mixedIngredients);
const result = serve(bakedIngredients);
```

The true differences extend far beyond this simplistic example, but you can start getting the idea of the experience as a programmer. With Object-Oriented Programming, you call methods that manipulate the mutable state of the object; you always have a `recipe`, you just change its state over time. On the other hand, the Functional Style has you calling functions that create a new object at each step, as the state changes over time. 

Someone may try to tell you that Object-Oriented or Functional programming is superior to the other. They may also suggest other kinds of programming styles. Don't believe the hype. All of these different styles are just tools for your toolkit. You use the right tool for the right job. Get experience with every kind of programming style that you can, and you will eventually learn what the best tool to reach for a given problem is. There's a lot of personal preference involved, but that preference will change over time. Someday, you too will be amused when you hear people advocate for one style over another.

For now, though, we're going to focus on learning to work in a Functional Style. Ironically, we will still see a lot of methods and objects, because those are still useful abstractions to build on. In particular, Arrays in TypeScript are implemented as Objects, and we use their methods to manipulate them in a Functional Style.

```typescript
const originalNumbers = [10, 20, 30, 40];
const doubledNumbers = originalNumbers.map((num: number): number => num*2);
const smallNumbers = doubledNumbers.filter((num: number): boolean => num < 30);
const sum = smallNumbers.reduce((currentTotal: number, num: number) => currentTotal+num, 0);
console.log(originalNumbers);
console.log(doubledNumbers);
console.log(smallNumbers);
console.log(sum);
```

## Interfaces

Okay so what type is it? Currently, we've said that it's an "object with these specific keys which must have these types". But we probably would rather give it a name.

The idea of an interface vs. a class

Terminology: "field", "attribute", all of these are appropriate.

## Records

If you paid attention in Data Structures, you know that Hash Maps are the best thing ever. Python calls them Dictionaries, but the idea is that you can 

Objects as a map

# JSON

These six types combined make up the core idea of "JSON".

* number
* string
* boolean
* array
* object
* null

With this, you can represent pretty much anything if you're patient enough.

# The Evil `any` type

You will never ever be allowed to use this.

## Type Difficulties

Check out this confusing error message you get for using the following code:

* Some code where you have returned a function instead of a value, passed in a value instead of a value.
* Function where you are taking in an object instead of its fields

## Nested Data

List of objects

List of objects of objects

List of list of objects

```typescript
interface Ingredient {
  name: string
  rare: boolean
}

interface Potion {
  effect: string
  ingredients: Ingredient[]
  timeRequired: number
}

export function getRarestEffect(potions: Potion[]): string {

}
```
