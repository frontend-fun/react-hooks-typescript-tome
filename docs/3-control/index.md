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

Its type system is madness! Things are very inconsistent and surprising. It's super easy to make mistakes that will take forever to debug.

What are the basic types:

* number: Actually floating points.
* boolean: `true` or `false`
* string: You can use `'single quotes'` or `"double quotes"`. There are also backticks ` for multi-line strings.
* null: A special value used to indicate something is "unknown".
* undefined: Another special value used to indicate a value is not yet set.

## Operators

Numeric operations are normal, but always involve floats.

Booleans use `&&`, `||`, and `!`

Strings use `+`, indexing. Strings have a bunch of useful methods that you can call.

## Variables

```typescript
const UNCHANGED_VALUE = 100;

let name = "Dr. Bart";
```

You might also see `var`, but you don't need to worry about using it.

```typescript
// You won't need this:
var name = "Dr. Bart";
```

# Basic Functions

Parameters, arguments

Function name

```typescript
// Classic syntax
function add(first: number, second: number): number {
  return first + second;
}

// Modern "lambda" syntax
const subtract = (first: number, second: number): number => {
  return first - second;
}
```

To make functions available in other files, you need to use the `export` keyword:

```typescript
export const multiply = (first: number, second: number): number => {
  return first * second;
}
```

## Function Signature

The `void` type is used for a function that doesn't return anything.

```typescript
export const sayHello = (name: string): void => {
  console.log("Hello", name);
}
```

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

An `if` statement

Ternary `if` operator

## Equality

== vs. ===

You will basically never use `==` or `!=`. You will only ever use `===` and `!==`.

# Arrays

JavaScript has lists, but calls them "Arrays". This is because JavaScript is drunk.

```typescript
// Example of creating array variables
let fruits: string[] = ["apple", "banana", "orange"];
let grades: number[] = [90, 93, 78, 45, 99, 100];

// Function that consumes an array
const summate = (numbers: number[]): number => {
  // ...
}
```

The array type is just a regular type followed by a pair of empty square brackets.

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

## Map an Array

A function that converts a single value to a single value

Then what if we want to convert an array? WE USE MAP.

Show how it is exactly equivalent to `for` loop

So why not `for` loop? Not the style. We tend to always have a list, take advantage of that.

So why not `while` loops? ARE YOU SERIOUS DO NOT USE `while` LOOPS.

## Filter an Array

What if we combine the `?` and `map`? IT WILL BE AWESOME.

## Reduce an Array

Summate an array

## Other Array Operations

`every`, `some`, `join`

`concat`, `length`

Seriously try to find a list of these? I don't want to recreate the wheel.

# Objects

We don't make classes, we just make objects.

You CAN make classes. But, like, we don't. We just make objects directly.

It's actually really convenient. Just use `{}` syntax.

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
