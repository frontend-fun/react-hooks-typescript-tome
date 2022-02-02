---
layout: default
title: Primitives and Control Flow
parent: TypeScript
nav_order: 3.1
---

# TypeScript Primitives and Control Flow

[&laquo; Return to the Chapter Index](index.md)

<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

We're going to start by going over the basics of primitive data and the major control structures.

# Developer Console

You can bring up your developer console by pressing `CTRL+SHIFT+J`. TODO: VERIFY THIS

The console has several useful views like the Elements panel and the Network Panel. But right now we need to focus on the `Console` tab. There you can write individual lines of JavaScript to experiment with the language, manipulate the page, and see the results of logging and errors. The Developer Console is a useful tool, don't be afraid to try it.

In this site, we have also made all the code examples runnable. They probably work *okay*, although they don't give the same nice errors and warnings that you get in Visual Studio Code, and they don't give you all the interactive views that the JS Console gives. Still, hopefully you find it helpful to experiment with them.

# Logging

If you are used to Python or Java, you already are familiar with the idea of printing out data. In JavaScript, they refer to this as logging.

```typescript
console.log("Hello World!");
```

Try clicking the button in the topright of the code above. Then, run the code. You will see text appear above but also in your developer console.

Technically the semi-colon is optional but using it will avoid certain kinds of common mistakes.

You can use `console.log` to get a lot of information about variables. Expect to use it frequently!

## Primitive Data

Let's talk about types, values, operators, and variables.

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

## The Evil `any` type

You will never ever be allowed to use this.

Seriously, if you use this we literally will throw your project out.

The idea of the `any` type is to admit that you don't know what type something is. That means you don't know what you're doing. If you don't know what you're doing, then you need to learn (because that is the purpose of all this). If you learn what you are doing, then you know what type of data you are dealing with. Then you don't need `any`.

I'm not joking, don't you dare ever use `any`.

# Functions

Remember the vocabuarly you have seen in previous courses:

* Define: To specify what a function does
* Call: To activate a function
* Parameters: The formal names of the values passed to a function
* Arguments: The actual values passed to a function

## Function Calls

You call functions with the name of the function and parentheses. You can have any number of arguments.


```typescript
// Function name is `console.log`
// 3 arguments
console.log(19, "Hello World", true);
```

## Function Declarations

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

With the lambda syntax, you actually don't even need the curly braces and `return` IF the body of the function is just a single expression:

```typescript
const subtract = (first: number, second: number): number => (first - second);

// Still works the same way
console.log(subtract(9, 3));
```

To make functions available in other files, you need to use the `export` keyword:

```typescript
export const multiply = (first: number, second: number): number => {
  return first * second;
}

console.log(multiply(3, 4));
```

This won't do anything interesting here, but if were in Visual Studio Code you'd now be able to use the `multiply` function in other files. Nifty!

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

## Testing Functions

Our web application is setup to support tests. We can write classic unit tests very easily:

```typescript
/*
 * Consumes a number of vampires and count how many fangs they have.
 * Vampire always have two fangs each.
 */
export function countFangs(vampires: number): number {
  return vampires * 2;
}

// TODO: This is not currently supported in the browser, unfortunately.
test("Count vampires' teeth", () => {
  expect(countFangs(0)).toBe(0);
  expect(countFangs(1)).toBe(2);
  expect(countFangs(15)).toBe(30);
});
```


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

## Ternary IF

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

## Logical Operators

You have all the classics: `<` , `>`, `<=`, and `>=`.

You have the `!` (not).

You have `&&` (and) and `||` (or) and `^^` (xor).

## Truthiness

Like Python, JavaScript has Truthiness. Any value can be evaluated in a conditional context as either Truthy or Falsey. The rules are different than in Python.

You can read more here: <https://developer.mozilla.org/en-US/docs/Glossary/Truthy>

# Loops

JavaScript has several kinds of loops that are similar to what you have seen in other languages:

* The `for` loop
* For-each loops
* The `while` loop

But hey we aren't going to teach you how to use these because we'll do something even better in the next section with arrays. Get hyped!


# 📝 Task - Functions

So did you get all of that? Let's find out. Our next task has you define some TypeScript functions.

As always, begin by pulling our changes, making a new branch, and merging in our changes.

```sh
$> git pull upstream
$> git checkout -b solved-functions
$> git merge upstream/task-functions
```

You'll need to edit the `functions.ts` file.

Check your status with the tests by running:

```sh
$> npm run test:cov
```

As you complete functions, use the `git add`/`git commit` or the Visual Studio Code interface to make small regular commits. Practice the habit now!

Once you are passing all the tests, you should be able to push your branch to the remote and make a Pull Request to `main`. We'll be checking your tests to make sure you pass!

```sh
$> git push --set-upstream origin solved-functions
```

Once you're done submitting, we can learn about [TypeScript Arrays &raquo;](../3-control/arrays.md)