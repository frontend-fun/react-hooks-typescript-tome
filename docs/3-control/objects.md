---
layout: default
title: Objects
nav_order: 3.3
parent: TypeScript
---

# Typescript Objects

[&laquo; Return to TypeScript Objects](arrays.md)

<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

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
// This isn't real code, it's just an example comparing OO and FP a little

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
console.log(originalNumbers);

const doubledNumbers = originalNumbers.map((num: number): number => num*2);
console.log(doubledNumbers);

const smallNumbers = doubledNumbers.filter((num: number): boolean => num < 30);
console.log(smallNumbers);

const sum = smallNumbers.reduce((currentTotal: number, num: number) => currentTotal+num, 0);
console.log(sum);
```

## Updating Objects Immutably

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
console.log("New player:", copyPlayer.score, copyPlayer.money, copyPlayer.position);

// Modify multiple fields at once (double the score, increase position by one)
const advancedPlayer = { ...player, score: player.score*2, position: player.position+1 }
console.log("New player:", advancedPlayer.score, advancedPlayer.money, advancedPlayer.position);
```

## Nested Fields

When you are updating fields that have a data structure (like an array or another object), things get a little trickier. We have to be very careful to avoid modifying the original. Therefore, we do a nested copy.

```typescript
const student = { name: "Ada", grades: [100, 99, 78, 97]};

const studentWithNewGrade = {
  ...student,
  grades: [...student.grades, 100]
}
console.log("Original student grades:", student.grades);
console.log("New version's grades:", studentWithNewGrade.grades);
```

# Interfaces

Okay so what type is an Object? We don't have a class, so technically each of these curly braced things are just "plain old javascript objects" ("POJOs"). But we probably would rather give them a name and refer to similarly structured objects by their category. You could use a Class, but instead we will use an "Interface" to specify the shape of the structured data.

How is this different from a class? Well, a class has methods and an interface does not. Also, you can use classes to make instances, but technically we're never going to make instances - we're just going to make objects that "satisfy" the requirements of an interface. As long as they have the right names and types, TypeScript will be happy with us.

The data inside of an object is organized into "fields" or "attributes" (you could also say "keys", or "properties", there are many words). Each field has a specific type.

```typescript
interface Dog {
  name: string
  age: number
  // Type union of strings, must be one of these options
  breed: "Corgi" | "Chihuahua" | "Mutt"
  fuzzy: boolean
}

const ada: Dog = {name: "Ada Bart", breed: "Corgi", age: 4, fuzzy: true };
console.log(ada.name);
console.log(ada.age);

const olderAda = {...ada, age: ada.age+1 };
console.log(ada.age);

function makeCorgi(name: string): Dog {
  return {name: name, breed: "Corgi", age: 1, fuzzy: true};
}

function groomDog(dog: Dog): Dog {
  return {... dog, fuzzy: false };
}

function ageInHumanYears(dog: Dog): number {
  return dog.age * 7;
}

const grace = makeCorgi("Grace");
console.log("The new corgi is named:", grace.name);

console.log("Ada is", ageInHumanYears(ada), "in human years.");

const fancyAda = groomDog(ada);
console.log("Before grooming, is Ada fuzzy?", ada.fuzzy);
console.log("After grooming, is Ada fuzzy?", fancyAda.fuzzy);
```

# Records

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

## Records from Arrays

A Record is almost more similar to an Array than an Object. Which is actually a weird statement because technically Arrays are Objects, and Records are exactly Objects. But in terms of how we use them, Records are very similar to Arrays - a collection of an unknown things. Looking up an item in a record by its key is almost as fast as looking up an item by its position in an Array. In practice, they should usually be fairly instantenous ("constant time") operations.

Anyway, the point is that it's often very useful to convert an Array into a Record, so that you can look up items quickly based on a key (e.g., `id` or `name`) rather than having to use `find` or `findIndex` (which are linear time searches, yuck).

```typescript
interface State {
  abbreviation: string
  name: string
  capitol: string
}

const usaStates: State[] = [
  { abbreviation: "DE", name: "Delaware", capitol: "Dover" },
  { abbreviation: "MD", name: "Maryland", capitol: "Annapolis" },
  { abbreviation: "VA", name: "Virginia", capitol: "Richmond" },
  { abbreviation: "PA", name: "Pennsylvania", capitol: "Harrisburg" }
];

// The `fromEntries` function converts an array of pairs to an object
const lookupState: Record<string, State> = Object.fromEntries(
    // Convert the array to an array of pairs, where each pair has the abbreviation
    // and the state.
    usaStates.map((state: State): [string, State] => [state.abbreviation, state])
);

console.log(lookupState["DE"].capitol);

// You can also go back using Object.keys() or Object.values()
console.log("State Abbreviations:", Object.keys(lookupState);
```

# Unpacking Objects ("Destructuring Assignment")

Okay this is a really weird and cool feature, but it's gonna be a little complicated. Basically, we can unpack objects' fields directly into variables.

```typescript
const ada = {name: "Ada Bart", breed: "Corgi", age: 4, fuzzy: true };

// This works, because you can access fields
console.log("Ada's name:", ada.name);

// But this DOES NOT work, because the variable `name` does not exist (it's a field)
// console.log("Ada's name:", name);

// But it DOES work if we unpack that field first!
const { name, breed } = ada
console.log("Ada's name", name);
console.log("Ada's breed", breed);

// You can also rename fields if you wanted to
const { name: adaName } = ada
console.log("Ada's name", adaName);
```

This works with parameters, weird as that might sound. We'll see later that it can be really convenient.

```typescript
interface Dog {
  name: string
  breed: "Corgi" | "Chihuahua" | "Mutt"
  age: number
  fuzzy: boolean
}

// We only specify that the object passed to the function MUST contain the field `breed`
// and that field MUST be a string. It can have other fields, too.
function checkIfCorgi({breed}: {breed: string}): boolean {
    return breed === "Corgi";
}

// Compare that to this version; they're not better or worse in this case, just have tradeoffs.
// Try swapping out the parameter types between two functions, you'll see it works either way!
function checkIfCorgi(aDog: Dog): boolean {
    return aDog.breed === "Corgi";
}
```

This works with arrays too, if you know how long the array is.

```typescript
const rgbColor = [255, 128, 200];
const [red, green, blue] = rgbColor;

console.log(rgbColor);
console.log(red, green, blue);
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
console.log(someData.name, someData.isCool, someData.nums);

const dataAsText = JSON.stringify(someData);
console.log(dataAsText);

const dataAgain = JSON.parse(dataAsText);
console.log(dataAgain);
console.log(dataAgain.name, dataAgain.isCool, dataAgain.nums);
```

Often, you will find data stored as JSON in files (`.json`). Modern TypeScript tooling can load that data into our programs, the same way we'd load files (using `import` statements). This makes JSON a good way to store configuration settings, raw data, swappable user interface text, test case data, and much more.

# 📝 Task - Objects

As always, begin by pulling our changes, making a new branch, and merging in our changes.

```sh
$> git pull upstream main
$> git fetch upstream task-objects
$> git checkout -b solved-objects
$> git merge upstream/task-objects
```

You'll need to edit the `objects.ts` file.

You may need additional functions in JavaScript; don't be afraid to seek help as needed if you aren't sure how to do a specific conversion (e.g., a string into an integer).

Check your status with the tests by running:

```sh
$> npm run test:cov
```

If you are overwhelmed by the number of failing tests, you can focus on just one at a time by typing `t` and entering the name of the function you want to test (e.g., `makeQuiz`). You can go back to running all the tests by typing `a`.

As you complete functions, use the `git add`/`git commit` or the Visual Studio Code interface to make small regular commits. Practice the habit now!

Once you are passing all the tests, you should be able to push your branch to the remote and make a Pull Request to `main`. We'll be checking your tests to make sure you pass!

```sh
$> git push --set-upstream origin solved-objects
```

Once you're done submitting, we can learn about [Nesting Data &raquo;](../3-control/nested.md)