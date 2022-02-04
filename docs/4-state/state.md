---
layout: default
title: State
nav_order: 4.1
parent: Using State
---

# State

Coming soon
{: .label .label-yellow }

**Oops! This page is not yet ready. Please be patient while we finish it up.**

[&laquo; Return to the Chapter Index](index.md)

<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

JavaScript and TypeScript are not interesting because they let us do basic calculations and render static HTML. They are cool because they let us control web pages and make things dynamic and interactive. So let's do that now instead.

# A State-less Component

Let us look at a very simplistic application that has no state:

```tsx
export function App(): JSX.Element {
  // Boring!
  return <div>Hello World</div>
}
```

There are no buttons, input boxes, or other mechanisms to let us interact with the application, because there is no State to get or set. We just return a constant value. If there was a button, clicking it could not mess with the "Hello World" text. We need State in order to do fun interactive stuff.

# Interactivity

Interactivity means that a page changes when you interact with the page. That means a page has a BEFORE and an AFTER. At any given point in time, you can check the "State" of the page.

TODO: Image of a BEFORE and AFTER state for an application

Every application you have ever used or created has some kind of state. State is fundamental to a program. All those fancy control structures like `if` and `for` are all in service to the idea of *getting* and *updating* state. Here are some examples of State in applications:

* The current number displayed in a calculator
* A list of activities in a Todo application
* A collection of dates mapped to activities in a Calendar application
* Whether or not a checkbox is checked in a form
* What song is currently playing in a music player
* Where an avatar is on the screen in a video game

We represent State with *values*, and describe the possible sets of State with *types*. Often, State ends up being stored in *variables* temporarily, since those variables' values can change over time to reflect changes in State.

When you build an application, you need to think of the State first. Often, this means describing the State in terms of types and data structures. React is built around the idea of "one-way" State.

# Model, View, and Controller

One of the most common architectural patterns in Software Engineering is the idea of "Model-View-Controller".

* Model is the State, describing what possible values your State can live in.
* View is the parts of your application's logic that let you show off the current State.
* Controller is the parts of your application's logic that let you change the current State.

Most folks recommend trying to keep your Model, View, and Controller relatively distinct from each other. "How" to do this varies among frameworks and languages, but we're going to focus on React's model, which is called One-way Data Binding.

TODO: Image of React's One-way Data Binding architecture

React is organized into Component, and each Component has its own State. The main Component is called `App` and its State is the most important one. We will see later how we can have more components with their own State. For now, when we talk about State, we are talking about the State of `App`. That State is our **Model**.

A Component Function, by definition, returns JSX (aka HTML). This is the **View**. That View can use the current values of the State.

The View can also bind *events* to *functions*, so that when a user interacts with the View (e.g., clicking a button, typing into an input box), inner function can be fired that modifies the Model. We call those inner functions the **Controllers**. 

When the Controllers update the Model, React automatically knows to re-render the View by calling the Component Function again. The State updates happen in one big circular direction - The Controller modifies the Model, the Model tells the View to update, and the View provides mechanisms for the Controller to activate.

# A Component with State

So what does this mean in practice? Let's take a look at a Component that does have State:

```tsx
function App(): JSX.Element {
  const [counter, setCounter] = useState<number>(0);

  function addOne(): void {
    setCounter(counter+1);
  }
  
  return <Button onClick={addOne}>{counter}</Button>;
}
```

Run this application and click the button. Every time you click, the counter should increase by one. That single number in `counter` represents the Model of the application. The `addOne` logic represents the Controller, and the returned `Button` is the View.

But what on earth is happening in that second line with the `const [counter, setCounter] = ...`?

# The useState concept

Let's take a look at that most important line, with the `useState`.

```tsx
const [state, setState] = useState<number>(initialValue);
```

On its own outside of `App`, this line won't run. Not only because we haven't defined `initialValue`, but also because the Rules of Hooks: 

1. You must always call `useState` within a Component Function (like `App`).
2. Do not put `useState` inside of loops, conditionals, or other functions.

Before we dive into a proper example, let's get some terminology about that line of code, because we're going to see A LOT of it.

## Terminology

Memorize these terms

* `state` is the "State Variable", representing our current Model. We control its name.
* `setState` is the "State Setter Function", giving us a low-level Controller to modify our Model. We control its name.
* `useState` is the "Hook Creation Function", giving us a "Hook" to store our Model in. This name is always the same.
* `initialValue` is the "Initial Value" for the state variable, giving us the ability to set our initial Model. This is replaced with a literal value.

## The Concept of a Hook

When you call `useState`, think of React creating a "Hook" that values can be hung on.
When we say values, you can imagine a piece of paper with a number, some text, a list, etc.
The first value that will be hung is the "Initial Value" that you passed in to `useState`.
At any time, you can check the current value using the "State Variable", or update the value with the "State Setter Function".

TODO: Image of a hook holding values

So how is any of this different from a variable? It comes down to how it works when the Component Function is called. Recall that the Component Function is called by React to produce the HTML of your application. When a user interacts with that HTML (clicking a button, typing into a form, etc.), the State of the application changes by calling the State Setter Function (`setState`) and the Component Function needs to be rendered again - which React does by calling the Component Function on our behalf.

TODO: Image of React's model

Local variables inside of a function do not stick around between function calls. They disppear when you reach a `return` statement, and the next time the function is called they are not still there. That's why this doesn't work.

```tsx
function App(): JSX.Element {
  let counter: number = 0;

  function addOne(): void {
    counter += 1;
  }
  
  // Does not work!
  return <Button onClick={addOne}>{counter}</Button>;
}
```

Every time this bad code calls `App`, the bad code resets `counter` back to zero. The fact that the bad code increased `counter` by one doesn't matter - the `App` function doesn't remember the old value, and just unconditionally sets the `counter` to be zero each time the bad component is called, and then renders that new `0`. We need some way of "remembering" the value in that variable.

This is where "Hooks" come in. There is clever code inside of the definition of `useState` that remembers the variable's value each time we call `App`. When you call the State Setter Function, it first updates the value on the Hook, then re-renders the Component Function. Because we're not relying on a normal variable, 

How does this magic work? You can watch a longer explanation [here](https://www.youtube.com/watch?v=1VVfMVQabx0), but basically the idea is the "Hooks" are just being stored in an array that lives outside of the Component Function. Even though the Component Function's execution may end, that same array will be available in the Component Function's next execution. This is why we must never put `useState` inside of conditional statements, loops, or other complex control flow - we need to call `useState` in the same order every time, so that each piece of the State matches between renders.

If that was all too confusing, then here's the bottom line: if you want State in your application, you need to create a Hook using `useState`.

# State Type Examples

Let's run through some examples of different types of State.

## Boolean State: Show/Hide Example

Let's look at another example. This time, we will have a button that shows or hides some text.

```tsx
function App(): JSX.Element {
  const [visible, setVisible] = useState<boolean>(true);

  function flipVisibility(): void {
    // Set visible to be the logical opposite of its previous value
    setVisible(!visible);
  }

  // Only includes <div>Hello!</div> if `visible` is true
  return <div>
    <Button onClick={flipVisiblity}>Show/Hide</Button>
    {visible && <div>Hello!</div>}
  </div>;
}
```

Run the application. When you click the button, the text will be hidden. We are using the `&&` operator which only evaluates the right-hand expression when the left-hand expression is `true`. 

Notice how we can embed the Model into our View using curly brackets. Without those curly brackets, that just becomes boring HTML text. Try removing the curly brackets and see for yourself.

## String State: Pet Photos

I've uploaded some images for this book, of some of my pets.

```tsx
function App(): JSX.Element {
  // We can define constants before calling useState
  const PETS: string[] = ["ada", "pumpkin", "babbage"];
  // Initialize to first animal
  const [pet, setPet] = useState<string>(PETS[0]);

  const setRandomPet = (): void => {
    // Choose an index randomly from the PETS array
    const chosenIndex = Math.floor(Math.random() * PETS.length);
    // Update the `pet` to the chosen string
    setPet(PETS[chosenIndex]);
  };

  // Make an Image pointing to the current pet
  return <Image onClick={setRandomPet} src={`../assets/images/pet-${pet}.jpg`}/>
}
```

Click the image a few times and you should see it randomly cycle between the pets.

Remember, 1/3 of the time it will stay on the same photo!

## Multiple States: Traffic Light

Here is a much more complex example simulating a traffic light. You can only go when the light is `"green"` or `"yellow"`. You can advance the current state of the light by clicking the "Advance Light" button.

```tsx
// LightColor is a Type Union of three possible string values
type LightColor = 'red' | 'yellow' | 'green';

function App(): JSX.Element {
  // We have two parts to our State
  const [lightColor, setLightColor] = useState<LightColor>("red");
  const [driving, setDriving] = useState<boolean>(false);

  // No parameters or return value, because it's a closure
  function changeLightColor(): void {
    setLightColor(
      // If it's red, make it green
      lightColor === 'red' ?
        'green' :
        // If it's green, make it yellow
        lightColor === 'green' ?
          'yellow' :
          // Otherwise it is yellow, so make it yellow
          'red'
    )
  }

  // Notice how we bind an anonymous lambda function to onClick instead of a named function?
  return <div>
    <div>
      Current light: <span>{lightColor}</span>
      <Button onClick={()=>changeLightColor()}>Advance Light</Button>
    </div>
    <div>
      <Button onClick={()=>setDriving(true)} disabled={driving}>Drive</Button>
      <Button onClick={()=>setDriving(false)} disabled={!driving}>Stop</Button>
    </div>
    <div>
      {lightColor === 'red' && driving ?
        <span>Oh no you need to stop!</span> :
        <span>All okay!</span>}
    </div>
  </div>;
}
```

# 📝 Task - Using State

* Basic of useState concept
  * set entire state
  * Testing user interaction
  * Boolean state: visible/not visible, disabled/not disabled, text1/text2
  * Number state: counter, calculator
  * String state: Anagramer, pig-latin, etc?, something with emojis?
  * Two use states in one

This stuff never makes sense just reading about it. Let's try working on some problems instead!

As always, begin by pulling our changes, making a new branch, and merging in our changes.

```sh
$> git pull upstream
$> git checkout -b solved-state
$> git merge upstream/task-state
```

TODO: ALL OF THIS STUFF

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
$> git push --set-upstream origin solved-state
```

Once you're done submitting, we can learn more about [Components &raquo;](../4-state/components.md)