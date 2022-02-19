---
layout: default
title: Components
nav_order: 4.2
parent: Using State
---

# Components

Coming soon
{: .label .label-yellow }

**Oops! This page is not yet ready. Please be patient while we finish it up.**

[&laquo; Return to State](state.md)

<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

# The React Model

What happens when you call `setState`? The Component functions get called again.

React is very good at figuring out which Components need to be called again. It is based strictly on the hooks's value, relying on *reference equality*.

## Whether to Render

Remember how we kept making a big deal about Immutability back in Chapter 3? We kept stressing that we had to make NEW lists and NEW objects in our functions, rather than mutating existing ones. 

What happens if we fail to follow the rule of immutability? Let's look at an example.

```tsx
export function App(): JSX.Element {
  const [people, setPeople] = useState<string[]>([]);
  const [newName, setNewName] = useState<string>("New Name");

  function addPerson(name: string) {
    // ...
  }

  return <div>
    <input type="textbox" onChange={(event) => setNewName(event.target.value)}/>
    <button onClick={()=>addPerson(newName)}>Add Person</button>
    <ul>
      {(people.map(
        (person: string): JSX.Element => <li key={person}>{person}</li>
      ))}
    </ul>
  </div>;
}
```

Replace the `// ...` with the code below, which tries to manipulate the list mutably.

```typescript
// No detection of changed value, reference equality
people.push(newName);
setPeople(people)
```

If you run the application, type into the box, and press the "Add Person" button, nothing will occur. HOWEVER, if you *then* type into the box, suddenly the application will re-render and the new person will appear in the list.

This behavior, where messing with a different part of the application seems to suddenly "fix" another part of the application, is a dead giveaway that you are using state incorrectly. Avoiding that problem is why we are avoiding mutable state so diligently.

To fix the issue, we simply need to follow our rules of immutability. Try this code instead:

```typescript
const newPeople = [...people, newName];
setPeople(newPeople);
```

The core idea is that we must create a NEW list so that React can compare their references, and discover that the new list is different. Otherwise, it compares the old reference to itself, without realizing that the CONTENTS of the array has changed.

Review [Reference Equality vs. Value Quality](../3-control/arrays.md#reference-equality-vs-value-equality) for more information about reference and value (content) equality. This is also known as shallow vs. deep equality. If you still don't understand the concept, please go out and seek more help until you understand!

## Rendering an Array

The `map` function provides a convenient way to render more Array state. The syntax might seem a little strange at first, but we embed the `map` directly into the TSX being returned. Let us look at an example Component where we simply render a list of names.

```tsx
function App(): JSX.Element {
  const names = ["Ada", "Pumpkin", "Babbage"];

  return <div>
    The names are:
    <ul>
      { names.map((name: string) => <li key={name}>{name}</li>) }
    </ul>
  </div>
}
```

We have to be very precise about the curly braces. Notice how:

* The `names.map(...)` expression is contained within `{ }` braces 
* Inside of the body of the anonymous function there are `<li> </li>` tags
* Inside of the `li` tags there are another pair of `{ }` braces surrounding the `name` variable

TSX allows us to nest HTML tags anywhere that we would normally write an expression. However, in order to embed values, variables, and code in the TSX, we must surround the expression with curly braces. Be very careful with this nesting, since skipping a curly brace or parentheses can have a disasterous effect on the code!

You might also notice that we include an attribute named `key`. This is related to what we saw previously about object equality. You can read more about `key` in the [React guide page about lists and keys](https://reactjs.org/docs/lists-and-keys.html), but the basic idea is that we must provide a `key` attribute to help React distinguish between different adjacent elements created from the `map`. It'll be easy to forget, but can often be the source of many errors.

# State Across Components

Breaking down a large application into Components is very handy. Ideally, each Component has its own little isolated state that only that Component knows about. The Component returns a view (TSX) that provides controls (e.g., buttons) for manipulating that State, causing the Component to re-render.

Sadly, life is rarely that simple. Most of the time, messing with one Component should change another. For example, clicking a button might hide or show another component. Adding some text to a box should let you add an element to a list elsewhere. We need to have ways of manipulating and reading state across Components.

## Wrong Idea: Import/Export

Let's start with something that doesn't work: trying to have state imported and exported as toplevel variables. This is a mistake that some newcomers thing will work, but it definitely does not. Fundamentally, you cannot have a `useState` outside of a Component function. Therefore, you cannot export the variable and use it in another file.

```tsx
// THIS DOES NOT WORK!!! BAD IDEA
// Can NOT have toplevel `useState`, must be in Component

// First file: src/Reveal.tsx
export const [visible, setVisible] = useState<boolean>(false);

export function Reveal(): JSX.Element {
    return <Button onClick={() => setVisible(!visible)}>Show/Hide</Button>
}

// Second file: src/App.tsx
import { visible, Reveal } from "./Reveal";

export function App(): JSX.Element {
    return <div>
      <Reveal></Reveal> {visible && '42'}
    </div>
}
```

## Wrong Idea: Accessing Components "Fields"

Another approach that DOES NOT WORK is to try and access fields or methods from one Component in another.
Functions and variables defined inside of a Component are NOT available outside of that Component's function definition. They are *not* methods or fields, like in a Class. They are local variables and inner functions. In fact, "inner functions" are just variables defined inside of another function that happen to be holding functions instead of primitive values (functions are just another type!). And as always, local variables disappear when the function (in this case a Component) returns.

```tsx
// THIS ALSO DOES NOT WORK!!! BAD IDEA
// Cannot access local variables from a function

// First file: src/Reveal.tsx
export function Reveal(): JSX.Element {
    const [visible, setVisible] = useState<boolean>(false);
    return <Button onClick={() => setVisible(!visible)}>Show/Hide</Button>
}

// Second file: src/App.tsx
import { visible, Reveal } from "./Reveal";

export function App(): JSX.Element {
    const revealButton = <Reveal></Reveal>;
    // BIG FAT NOPE, THIS DOES NOT WORK!!!
    return <div>
        {revealButton} {revealButton.visible && '42'}
    </div>
}
```

If you are unsure why this does not work, consider the following example, which is basically the same problem: local variables are not automatically just fields of a returned value.

```typescript
function average(first: number, second: number): number {
    const sum = first + second;
    return sum/2;
}

const answer = average(1, 3);
console.log("The average is", answer);
// THIS DOES NOT WORK!
console.log("The sum is", answer.sum);
```

## Right Idea: Parameters and Arguments

Okay, so how *do* you have shared state between two components? The answer is to use "Props" and "Attributes". Or rather, what we might call "Component Parameters" and "Component Arguments".

* Props: The parameters of a Component, defined as part of the function definition of the component
* Attributes: The arguments of a Component, provided when you instantiate the component.

You've been using Attributes when you use Components since almost the very beginning. This is the `key={value}` syntax that you kept seeing whenever you have an HTML tag:

```tsx
function App(): JSX.Element {
    // The `src` attribute is an *argument* to the `Image` component
    return <Image src={`../assets/images/pet-ada.jpg`}/>
}
```

When React encounters an embedded Component like `Image` above, it collects all of the attributes (including their names and values) into a new object, and passes this object as an argument to the Component's function. The React terminology for this object that collects all of the arguments is the "Props" of the component (short for "Properties"). Let's take a look at what this means in practice by seeing a simple example Component that has two attributes `firstName` and `lastName`:

```tsx
interface IDCardProps {
    firstName: string;
    lastName: string;
}

function IDCard(props: IDCardProps): JSX.Element {
    return <div style={ {border: '1px solid black'} }>
        <h3>ID Card</h3>
        <p>First name: <span>{props.firstName}</span></p>
        <p>Last name: <span>{props.lastName}</span></p>
    </div>;
} 

function App(): JSX.Element {
    return <div>
        <IDCard firstName="Babbage" lastName="Bart"></IDCard>
        <IDCard firstName="Ada" lastName="Bart"></IDCard>
    </div>;
}
```

The `IDCardProps` interface connects exactly to the arguments (aka the attributes) that were passed into the `IDCard` component. Once bound to the parameter `props`, we can access any of the fields of the created object using `props.firstName` or `props.lastName`. The `props` are just a simple object containing whatever attributes were provided.

However, that's not the only way to define the Props, thanks to modern JavaScript features called unpacking. Previously, we have used array and object unpacking (also kind "destructuring") to assign array elements and fields directly into variables. We can do the exact same thing with our Component's parameters, in order to avoid having to do field accesses like `props.firstName`:

```tsx
interface IDCardProps {
    firstName: string;
    lastName: string;
}

function IDCard({firstName, lastName}: IDCardProps): JSX.Element {
    return <div style={ {border: '1px solid black'} }>
        <h3>ID Card</h3>
        <p>First name: <span>{firstName}</span></p>
        <p>Last name: <span>{lastName}</span></p>
    </div>;
} 

function App(): JSX.Element {
    return <div>
        <IDCard firstName="Babbage" lastName="Bart"></IDCard>
        <IDCard firstName="Ada" lastName="Bart"></IDCard>
    </div>;
}
```

By replacing our `props` parameter name with a curly brace containing the attributes' names, we are able to create local variables that each match the original attributes. This means that the body of `IDCard` no longer needs property accesses with `.`, and can instead just use the variables directly!

Many React developers will go one step further, and also do away with interfaces like `IDCardProps` by embedding the interface's type directly into the parameter. This will look a little cumbersome, but it is quite popular.

```tsx
function IDCard({firstName, lastName}: {
    firstName: string;
    lastName: string;
}): JSX.Element {
    return <div style={ {border: '1px solid black'} }>
        <h3>ID Card</h3>
        <p>First name: <span>{firstName}</span></p>
        <p>Last name: <span>{lastName}</span></p>
    </div>;
} 

function App(): JSX.Element {
    return <div>
        <IDCard firstName="Babbage" lastName="Bart"></IDCard>
        <IDCard firstName="Ada" lastName="Bart"></IDCard>
    </div>;
}
```

To be clear, the two previous code blocks achieve *exactly the same effect*. The last one may look a little confusing since we are not used to having curly braces INSIDE of the function header, but it can become natural if you see it enough. If a component only has a few parameters (which is usually desirable), then emebedding the type as an object directly in the header is often preferred.

### Lifting State

Now that we know about Props and Attributes, we are able to share state between two components. The trick comes down to "lifting" the state of a child into its nearest common parent. In other words, moving a `useState` into a parent Component and then passing its State Variable and State Setter as attributes into a child component!

```tsx
interface RevealButtonsProps {
  // The type is "a function that consumes a boolean and returns nothing"
  setVisible: (newVisibility: boolean) => void
}

function RevealButtons({setVisible}: RevealButtonsProps): JSX.Element {
    return <div>
      <Button onClick={() => setVisible(true)}>Show</Button>
      <Button onClick={() => setVisible(false)}>Hide</Button>
    </div>;
}

export function App(): JSX.Element {
    const [visible, setVisible] = useState<boolean>(false);
    return <div>
        <RevealButtons setVisible={setVisible}></RevealButtons>
        {visible && '42'}
    </div>
}
```

By passing `setVisible` as an attribute to the `Reveal` component, we are allowed to call the `setVisible` function from within the `RevealButtons` component! Notice the unusual type that we gave to `setVisible` in `RevealButtonsProps`. This is how we describe the type of the State Setter: "a function that consumes a boolean and returns nothing". Recall that the State Setter does not return a value because it instead updates the Hook and triggers React to render again.

In the example above, we had two separate buttons, one to show and one to hide. We avoided having a single button because then we would need to pass the `visible` State Variable into `RevealButtons` too. But we could do so!

```tsx
interface RevealButtonProps {
  // The type is "a function that consumes a boolean and returns nothing"
  setVisible: (newVisibility: boolean) => void
  visible: boolean
}

function RevealButton({setVisible, visible}: RevealButtonProps): JSX.Element {
    return <div>
      <Button onClick={() => setVisible(!visible)}>
        { visible ? 'Hide' : 'Show'}
      </Button>
    </div>;
}

export function App(): JSX.Element {
    const [visible, setVisible] = useState<boolean>(false);
    return <div>
        <RevealButton setVisible={setVisible} visible={visible}></RevealButton>
        {visible && '42'}
    </div>
}
```

We had to provide a second field for the `RevealButtonProps` interface, a second parameter in the `RevealButton` function definition, and a second attribute in the `RevealButton` call. However, by doing so, we are now free to use both `visible` and `setVisible` in the child Component (`RevealButton`) AND the parent Component (`App`).

Passing in both `visible` and `setVisible` is a little cumbersome, since it forces `RevealButton` to deal with a lot of state from its parent. A common trick is to define a *closure* (a function with variables from an enclosing scope) using the variables. This loses us the ability to refer to `visible` or `setVisible`, but if that was truly not necessary, it can simplify the function definition a little.

```tsx
interface RevealButtonProps {
  // The type is "a function that consumes nothing and returns nothing"
  showHide: () => void
}

function RevealButton({showHide}: RevealButtonProps): JSX.Element {
    return <div>
      <Button onClick={showHide}>Show/Hide</Button>
    </div>;
}

export function App(): JSX.Element {
    const [visible, setVisible] = useState<boolean>(false);
    // Closure on visible and setVisible
    const flipVisible = () => setVisible(!visible);
    // The attribute and the value do not have to match!
    return <div>
        <RevealButton showHide={flipVisible}></RevealButton>
        {visible && '42'}
    </div>
}
```

### Peer Components

We have just seen several examples with a Parent and Child component. But the most common case is actually having *peer* (or "sibling") components. In fact, often you will have a lot of state defined in the top of your `App`, and then passed down to multiple Child components.

```tsx
interface RevealButtonProps {
  // The type is "a function that consumes nothing and returns nothing"
  showHide: () => void
}

function RevealButton({showHide}: RevealButtonProps): JSX.Element {
    return <div>
      <Button onClick={showHide}>Show/Hide</Button>
    </div>;
}

function Answer({visible}: {visible: boolean}): JSX.Element {
    return <div>
      The answer is { visible ? <span>42</span> : <span>A SECRET!</span>}.
    </div>;
}

export function App(): JSX.Element {
    export const [visible, setVisible] = useState<boolean>(false);
    // Closure on visible and setVisible
    const flipVisible = () => setVisible(!visible);
    // The attribute and the value do not have to match!
    return <div>
        <RevealButton showHide={flipVisible}></RevealButton>
        <Answer visible={visible}></Answer>
    </div>
}
```

### Grandparents, Great-grandparents, and the Hierarchy

As your React application grows, you will often end up in a situation where you have a large amount of State that needs to be shared across multiple components. Sometimes these components will be embedding other components inside. You end up with a large hierarchy of components. State defined up at the top of the hiearchy has to be passed down through a "chain" of Props and Attributes, sometimes being handed to Components that don't even care about all the details. This can be quite frustrating.

There are other ways to have State shared between components without requiring a heirarchy of Props and Attributes, but we will not learn about them. They are an advanced feature, suitable for larger-scale applications. When you start making *very* sophisticated applications, you can look into systems like "React Redux" that support this kind of sharing. For now, though, our goal is to keep State at a minimum, and localize it down to the lowest point in the Heirarchy possible.

A really cool feature of React Developer Tools is to be able to visualize the heirarchy via a special "Components" tab. This shows off not only the parent, child, and sibling relationships, but also allows you to inspect the current State of Hooks, and see how Hooks have been passed around via Props and Attributes. Check out the Components tab in your Developer Console!

<!-- TODO: Make a screenshot highlighting the heirarchy and the props and the state -->

### Closures and State

Let's take just a minute to talk about how closures can help us streamline functions, compared to parameters. You see, fundamentally, we have two good ways to get data inside of a function: via parameters or via closures. Let's say we wanted to create a function to calculate a price taking into account the tax rate. We could do this by having two parameters:

```tsx
// Two parameter version
function calculatePrice(price: number, taxRate: number): number {
  return price + price * taxRate;
}

console.log("At a 7% tax rate, a price of $9.99 is now", calculatePrice(9.99, .07));
```

Now let us look at an alternative version, where we create a function inside of a function, using the `taxRate` parameter from the outer function inside of the inner function `calculatePrice`.

```typescript
// One parameter, closure version
function makePriceCalculator(taxRate: number): (p: number) => number {
  return (price: number): number => price + price * taxRate;
}

const calculatePriceInAlaska = makePriceCalculator(.7);
console.log("At a 7% tax rate, a price of $9.99 is now", calculatePriceInAlaska(9.99));
```

Connecting this back to the example we saw earlier with `showHide` and `flipVisible`, you can see that a closure provides a simpler interface: the `calculatePriceInAlaska` function takes only a single parameter, and the `showHide` function takes no parameters. Of course, we had to create a custom function in order to do so in both cases. In the case of the Components, this is happening *whenever* we render that Component. This is not insanely expensive, but it is a cost!

To summarize, there are plusses and minuses to closures compared to just having more parameters in functions:

* Downsides: Functions are recreated every time our component renders. Functions are not as reusable between components because they are specifically bound to the variables they are closed upon.

* Upsides: We can conveniently include variables directly inside the closure, reducing the number of variables that have to be passed around. Also, functions are close to where they will be used.


# 📝 Task - Fixing Components

Stop Here
{: .label .label-yellow }

**THIS TASK IS NOT READY YET. PLEASE WAIT UNTIL THE TASK OPENS ON CANVAS TO CONTINUE.**

* They need to fix an example where they've tried to move the useState outside of the component.
* Problem where they need to lift a state up to the top component
* Situation where the state can be moved down to a child component
* Incorrect behavior because of a list missing its key

This stuff never makes sense just reading about it. Let's try working on some problems instead!

As always, begin by pulling our changes, making a new branch, and merging in our changes.

```sh
$> git checkout task-state
$> git pull upstream main
$> git fetch upstream task-components
$> git checkout -b solved-components
$> git merge upstream/task-components
```

TODO: ALL OF THIS STUFF

## Testing and Deploying

Check your status with the tests by running:

```sh
$> npm run test:cov
```

If you are overwhelmed by the number of failing tests, you can focus on just one at a time by typing `p` and entering the name of the file you want to test (e.g., `Counter.test.tsx`). You can go back to running all the tests by typing `a`.

As you complete components, use the `git add`/`git commit` or the Visual Studio Code interface to make small regular commits. Practice the habit now!

Once you are passing all the tests, you should be able to push your branch to the remote and make a Pull Request to `main`. We'll be checking your tests to make sure you pass!

```sh
$> git push --set-upstream origin solved-components
```

Once you're done submitting, we can learn about [Forms &raquo;](../4-state/forms.md)