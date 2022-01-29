---
layout: default
title: TypeScript Objects
nav_order: 3.3
---

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

### Updating Objects Immutabily

Technically speaking, you can edit fields of objects the same way you can in most Object-Oriented languages:

```typescript
const myPhone = { brand: "Samsung", model: "Galaxy", batteryLeft: 97 };
console.log("Before:", myPhone.batteryLeft);

// Updates the field - we won't use this style much though!
myPhone.batteryLeft = 48;

console.log("After:", myPhone.batteryLeft);
```

Instead, we will be creating new objects based on old objects, using the spread operator. This is somewhat similar to how we use the spread operator to add elements to arrays, but is actually even more convenient.

```typescript
const myPhone = { brand: "Samsung", model: "Galaxy", batteryLeft: 97 };
console.log("Before": myPhone.batteryLeft);

// Creates an entirely new phone based on the old one, with a
//    different value for batteryLeft
const usedPhone = { ...myPhone, batteryLeft: 48 };

console.log("After:", usedPhone.batteryLeft);
```

You can modify any number of fields using this approach, including zero. You can refer to old fields in order to do increments.

```typescript
const player = { score: 100, money: 120, position: 9 };
console.log("New player:", player.score, player.money, player.position);

// Make an unchanged copy
const copyPlayer = { ...player };
console.log("New player:", copyPlayer.score, copyPlayer.money, copyPlaer.position);

// Modify multiple fields at once (double the score, increase position by one)
const advancedPlayer = { ...player, score: player.score*2, position: player.position+1 }
console.log("New player:", advancedPlayer.score, advancedPlayer.money, advancedPlayer.position);
```

## Interfaces

Okay so what type is it? Currently, we've said that it's an "object with these specific keys which must have these types". But we probably would rather give it a name.

The idea of an interface vs. a class

Terminology: "field", "attribute", all of these are appropriate.


```typescript
interface Dog {
  name: string
  breed: "Corgi" | "Chihuahua" | "Mutt"
  age: number
  fuzzy: boolean
}

const ada: Dog = {name: "Ada Bart", breed: "Corgi", age: 4, fuzzy: true };
```

## Records

If you paid attention in Data Structures, you know that Hash Maps are the best thing ever. Python calls them Dictionaries, some languages call them Tables, but the idea is that you can look up a value given a key. Unlike an object, you can have any number of keys and values bound together. The lookup time is *very* fast, similar to an array (thanks to the magic of hashing).

In JavaScript, there is actually a special class called `Map` that YOU WILL NEVER USE. Probably. I mean, you can, but it's more work than is necessary. Instead, we will just use regular old objects and tell TypeScript to treat them as `Record` type.

```typescript
const courseLookup: Record<string, string> = {
  "CISC108": "Introduction to Computer Science",
  "CISC210": "Systems Programming",
  "CISC220": "Data Structures",
  "CISC275": "Introduction to Software Engineering",
};

console.log(courseLookup['CISC275'])
console.log(courseLookup['CISC108'])
```

# JSON

The six core types combined make up the core idea of "JSON" data ("JavaScript Object Notation").

* number
* string
* boolean
* array
* object
* null

With the JSON types, you can represent most interesting kinds of data. Therefore, the format has become an extremely popular format for storing and transmiting data. You will see JSON data many, many times outside of this course.

Sometimes we need ways to turn JSON values into a string, and then back again. This allows us to save complex data into any structure that is good at storing strings. An example structure would normally be files, although you don't really have files in a web browser. Instead the actual good example would be `LocalStorage` but I don't want to get into that right now.

```typescript
const someData = { name: "Blah Blah", isCool: true, nums: [1, 7, 9] };
console.log(someData);

const dataAsText = JSON.stringify(someData);
console.log(dataAsText);

const dataAgain = JSON.parse(dataAsText);
console.log(dataAgain);
```

## Type Difficulties

Check out this confusing error message you get for using the following code:

* TODO: Some code where you have returned a function instead of a value, passed in a value instead of a value.
* TODO: Function where you are taking in an object instead of its fields
