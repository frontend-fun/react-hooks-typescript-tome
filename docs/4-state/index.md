---
layout: default
title: Using State
nav_order: 4
---


# Using State

JavaScript and TypeScript are not interesting because they let us do basic calculations and render static HTML. They are cool because they let us control web pages and make things dynamic and interactive. So let's do that now instead.

## A State-less Component

Let us look at a very simplistic application that has no state:

```tsx
export function App(): JSX.Element {
  // Boring!
  return <div>Hello World</div>
}
```

There are no buttons, input boxes, or other mechanisms to let us interact with the application, because there is no State to get or set. We just return a constant value. If there was a button, clicking it could not mess with the "Hello World" text. We need State in order to do fun interactive stuff.

## Interactivity

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

## Model, View, and Controller

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

## A Component with State

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

## The useState concept

Let's take a look at that most important line, with the `useState`.

```tsx
const [state, setState] = useState<number>(initialValue);
```

On its own outside of `App`, this line won't run. Not only because we haven't defined `initialValue`, but also because the Rules of Hooks: 

1. You must always call `useState` within a Component Function (like `App`).
2. Do not put `useState` inside of loops, conditionals, or other functions.

Before we dive into a proper example, let's get some terminology about that line of code, because we're going to see A LOT of it.

### Terminology

Memorize these terms

* `state` is the "State Variable", representing our current Model. We control its name.
* `setState` is the "State Setter Function", giving us a low-level Controller to modify our Model. We control its name.
* `useState` is the "Hook Creation Function", giving us a "Hook" to store our Model in. This name is always the same.
* `initialValue` is the "Initial Value" for the state variable, giving us the ability to set our initial Model. This is replaced with a literal value.

### The Concept of a Hook

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

## Multiple States: Traffic Light

Here is a much more complex example representing a traffic light. You can only go when the light is "green" or "yellow".

```tsx
// LightColor is a Type Union of three possible string values
type LightColor = 'red' | 'yellow' | 'green';

function App(): JSX.Element {
  // We have two parts to our State
  const [lightColor, setLightColor] = useState<LightColor>("red");
  const [driving, setDriving] = useState<boolean>(false);

  setTimeout(function changeLightColor(): void {
    // Red -> Green, Green -> Yellow, Yellow -> Red
    setLightColor(
      lightColor === 'red' ?
        'green' :
        lightColor === 'green' ?
          'yellow' :
          'red'
    )
  }, driving === 'yellow' ? 1000 : driving === 'red' ? 3000 : 2000);

  function flipDriving(): void {
    setDriving(!driving);
  }

  return <div>
    <div>Current light: <span>{lightColor}</span></div>
    <div>
      <Button onClick={flipDriving}>{driving ? 'Stop Driving' : 'Drive'}</Button>
    </div>
    <div>
      {lightColor === 'red' && driving ?
        <span>Oh no you need to stop!</span> :
        <span>All okay!</span>}
    </div>
  </div>;
}
```

###

* Basic of useState concept
  * set entire state
  * Testing user interaction
  * Boolean state: visible/not visible, disabled/not disabled, text1/text2
  * Number state: counter, calculator
  * String state: Anagramer, pig-latin, etc?, something with emojis?
  * Two use states in one

## The React Model

What happens when you call `setState`? The Component functions get called again.

React is very good at figuring out which Components need to be called again. It is based strictly on the hooks.

# State Across Components

* Passing down props, lifting state up

This is a complicated problem. Fundamentally, there are only two ways that you can do this. You either need to have a **closure** or you need to have a parameter.

## Functions in Functions

* They need to fix an example where they've tried to move the useState outside of the component.
* Problem where they need to lift a state up to the top component
* Situation where the state can be moved down to a child component

# Forms for Editing State

* Form with K states
  * User input pattern, with link to big collection of other input types
    * Textbox
      * Simple string
      * Have to parse as number
    * Checkbox
    * Textarea
    * Select menu
  * How to test each input form type
    * Simulating user event
    * Finding things by their role
    * Finding some text
    * Dangerous fallback: test-id

# State based on State

* Dependent state based on other state
* What, you mean just calculating something? I suppose we need to make a point that just because you have some concept does not mean it needs to be represented in the Hooks.
