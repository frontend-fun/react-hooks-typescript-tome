---
layout: default
title: Components
nav_order: 4.2
parent: Using State
---

# Components

[&laquo; Return to State](state.md)

<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

# Array State

Before we start talking about sharing state across components, we're going to take a closer look at how setState works when it comes to Arrays. Their behavior can be quite surprising, since Arrays are objects. To understand everything involved, we must understand how React's model of rendering components works. But first, let's just see how we can use an Array in a Component.

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

TSX allows us to nest HTML tags anywhere that we would normally write an expression. However, in order to embed values, variables, and code in the TSX, we must surround the expression with curly braces. Be very careful with this nesting, since skipping a curly brace or parentheses can have a disastrous effect on the code!

You might also notice that we include an attribute named `key`. This is related to what we saw previously about object equality. You can read more about `key` in the [React guide page about lists and keys](https://reactjs.org/docs/lists-and-keys.html), but the basic idea is that we must provide a `key` attribute to help React distinguish between different adjacent elements created from the `map`. It'll be easy to forget, but can often be the source of many errors.

The example above is simple, because the State of the application is constant. Nothing changes the `names`, and the Component only ever needs to render once. That makes this a pretty lame application. Let's mix it up a little.

## Whether to Render

What happens when you call `setState`? The Component functions get called again. This means we end up generating the TSX to be returned all over again, binding the freshest version of all the Hook's values. This sounds expensive, but the costs aren't as bad as you might think (especially compared to just naively rendering ALL the components again). In fact, React is very good at figuring out which Components need to be called again. React decides to renrender a Component based strictly on the hooks's value, relying on *reference equality*.

Remember how we kept making a big deal about Immutability back in Chapter 3? We kept stressing that we had to make NEW lists and NEW objects in our functions, rather than mutating existing ones. 

What happens if we fail to follow the rule of immutability? Let's look at an example using an editable box; don't worry about how the input box works, we'll learn more about it later. For now, we're focusing on adding and removing elements from the list.

```tsx
export function App(): JSX.Element {
  const [people, setPeople] = useState<string[]>([]);
  const [newName, setNewName] = useState<string>("New Name");

  function addPerson(name: string) {
    // No detection of changed value, reference equality
    people.push(newName);
    setPeople(people)
    // VERY BAD!!!
  }

  return <div>
    <input type="textbox" onChange={(event) => setNewName(event.target.value)}/>
    <button onClick={()=>addPerson(newName)}>Add Person</button>
    <ul>
      {(people.map(
        (person: string) => <li key={person}>{person}</li>
      ))}
    </ul>
  </div>;
}
```

If you run the application, type into the box, and press the "Add Person" button, nothing will occur. HOWEVER, if you *then* type into the box, suddenly the application will re-render and the new person will appear in the list.

This behavior, where messing with a different part of the application seems to suddenly "fix" another part of the application, is a dead giveaway that you are using state incorrectly. Avoiding that problem is why we are avoiding mutable state so diligently.

To fix the issue, we simply need to follow our rules of immutability. Try this code instead:

```typescript
const newPeople = [...people, newName];
setPeople(newPeople);
```

The core idea is that we must create a NEW list so that React can compare their references, and discover that the new list is different. Otherwise, it compares the old reference to itself, without realizing that the CONTENTS of the array has changed.

Review [Reference Equality vs. Value Equality](../3-control/arrays.md#reference-equality-vs-value-equality) for more information about reference and value (content) equality. This is also known as shallow vs. deep equality. If you still don't understand the concept, please go out and seek more help until you understand! (Note: this is a standard job interview question.)

## Closures and Mapping Arrays

If you render an array with `map`, then the function defined inside of the `map` has a parameter representing each element of the array. To be clear, the parameter can only represent ONE element at any given time - the `map` function iterates through ALL of the elements one-by-one, just like a `for` loop, passing each element as an argument to the provided function. This allows us to use an individual *singular* element from a *plural* collection of elements (and also provides a hint to how we should name the variables involved: plural words for the variable holding the array, and the singular version of that word for the parameter). In the example below, we have `colors` holding an array of strings and `color` representing one element.

```tsx
function App(): JSX.Element {
  const [colors, setColors] = useState<string[]>(["Red", "Blue", "Green"]);

  return <div>
    The colors are:
    <ul>
      { colors.map((color: string) => 
          <li key={color}>
            {color}
          </li>
        )}
    </ul>
  </div>
}
```

That `name` variable is available for any code inside of the `map` function's inner function. This is especially important when we want to have a click handler for each element of an array, since we can provide the variable as a **Closure** ("a variable from an outer scope being used inside of a function"). Let's say we wanted to modify the example above so that we could select one of the colors in the list and store it in a new bit of string state.

```tsx
function App(): JSX.Element {
  const [colors, setColors] = useState<string[]>(["Red", "Blue", "Green", "Orange", "White"]);
  const [chosen, setChosen] = useState<string>(colors[0]);

  function updateChosen(newColor: string) {
    setChosen(newColor);
  }

  return <div>
    <div>
      Current Color is:
      <span style={ {backgroundColor: chosen} }>{chosen}</span>
    </div>
    <div>
      Choose a color:
      <ul>
        { colors.map((color: string) => 
            <li key={color}>
              <Button onClick={() => updateChosen(color)}>{color}</Button>
            </li>
          )}
      </ul>
    </div>
  </div>
}
```

Notice that we *had* to use an anonymous function instead of just providing the name `updateChosen`. The `updateChosen` function requires a parameter (the `newColor`), which was fortunately available to us via the `color` parameter of the `colors.map` anonymous function.

The idea here is that we create a temporary function `() => updateChosen(color)` whose only job when called is to invoke the `updateChosen` function with the current `color`. Since we define the temporary function INSIDE of the loop from `colors.map`, the variable `color` is *closed over* the function and will use the value from that iteration of the loop. This would not work if we did `onClick={updateChosen}`!

Note that this means each of five Buttons in this example will get its own *custom* onClick function. For example, the *blue* button onClick will be `() => updateChosen(blue)`.

# Late Updates

Continuing the conversation about weird React behavior, another critical thing to note is that React does NOT update Hook's State Variable immediately when the Hook's State Setter is called. In fact, it would be impossible for that to happen, because the State Variable is actually stored in a constant.

```tsx
function App(): JSX.Element {
  const [value, setValue] = useState<number>(0);
  
  function increaseTwice() {
    // Nope, doesn't actually increase twice!
    setValue(1+value);
    setValue(1+value);
  }
  
  return <Button onClick={increaseTwice}>{value}</Button>
}
```

If you run this application, you might expect that the value shown on the button would increase by two, since we are calling `setValue` twice. However, that is not what happens. We are calling `setValue` twice, but each time we are performing the same calculation (`1+value`), and that value involves a constant (`value`) that cannot change. The `setValue` function *does not modify `value`*. This is probably strange to think about, just based on its name. But the idea is that we are updating the Hook's value, and that Hook will provide a value the next time the component renders, which does not happen immediately when you call `setValue`. React waits until the `increaseTwice` function is done before it re-renders anything.

The issue is a little easier to see when you have two pieces of state that are relying on each other. The code below works because the order of calling `setNewNumber` and `setNums` has no effect on the elements being added to the list.

```tsx
function App(): JSX.Element {
  const [ nums, setNums ] = useState<number[]>([]);
  const [ newNumber, setNewNumber ] = useState<number>(0);
  
  const addNumber = () => {
    setNewNumber(newNumber+1);
    // The correct number is added even though we just did `newNumber+1`!
    setNums([...nums, newNumber]);
  };
  
  return <div>
    <Button onClick={addNumber}>Add {newNumber}</Button>
    <ul>
      { nums.map((num: number) => <li key={num}>{num}</num>)}
    </ul>
  </div>
}
```

Compare that to this non-working code below, which tries to rely on a `count` variable. Since the `nums` has not changed just because we called `setNums`, the `count` does not get updated the right way! When you run this, the first two elements become zero instead of just the first element.

```tsx
function App(): JSX.Element {
  const [ nums, setNums ] = useState<number[]>([]);
  const [ count, setCount ] = useState<number>(0);
  
  const addNumber = () => {
    setNums([...nums, count]);
    setCount(nums.length);
  };
  
  return <div>
    <Button onClick={addNumber}>Add {count}</Button>
    <ul>
      { nums.map((num: number) => <li key={num}>{num}</li>)}
    </ul>
  </div>
}
```

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

To be clear, the two previous code blocks achieve *exactly the same effect*. The last one may look a little confusing since we are not used to having curly braces INSIDE of the function header, but it can become natural if you see it enough. If a component only has a few parameters (which is usually desirable), then embedding the type as an object directly in the header is often preferred.

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
    const [visible, setVisible] = useState<boolean>(false);
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

As your React application grows, you will often end up in a situation where you have a large amount of State that needs to be shared across multiple components. Sometimes these components will embed other components inside. You end up with a large hierarchy of components. State defined up at the top of the hiearchy has to be passed down through a "chain" of Props and Attributes, sometimes being handed to Components that don't even care about all the details. This can be quite frustrating.

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

To summarize, there are pluses and minuses to closures compared to just having more parameters in functions:

* Downsides: Functions are recreated every time our component renders. Functions are not as reusable between components because they are specifically bound to the variables they are closed upon.

* Upsides: We can conveniently include variables directly inside the closure, reducing the number of variables that have to be passed around. Also, functions are defined close to where they will be used.

## Mostly Wrong: Nested Components

An idea that leads to runnable but *inefficient* code is to use nested components. Using closures, you can technically define components inside of other components - which means defining a function inside of another function. This may lead to working code, like below.

```tsx
// Not the best approach! See below
export function App(): JSX.Element {
    const [visible, setVisible] = useState<boolean>(false);

    function RevealButton(): JSX.Element {
        return <div>
          <Button onClick={()=> setVisible(!visible)}>Show/Hide</Button>
        </div>
    }

    function Answer(): JSX.Element {
        return <div>
          The answer is { visible ? <span>42</span> : <span>A SECRET!</span>}.
        </div>
    }
    
    return <div>
        <RevealButton></RevealButton>
        <Answer></Answer>
    </div>
}
```

This code works fine in the browser, similar to code we saw before. And this approach might seem convenient, since there are no parameters ("Props") required for the Components. Everything is just available as a closure!

Unfortunately, there are hidden penalties because of how React expects things to work. Remember that React is essentially a sophisticated system for detecting changes to the State, determining when a Component needs to re-render to avoid unnecessary work. The computational cost of deciding whether a component has changed is much smaller than the cost of having to redraw a component, so we save a lot of time if we figure out that a component has not changed. This is true not only of parent components, but also for children components. In this case, the `App` is the parent component and `RevealButton` and `Answer` are both *nested*, *children* components. If React is acting intelligently, then it might find situations where it has to re-render `App` but could *remount* (aka reuse) existing versions of `RevealButton` and `Answer` instead of having to re-render them.

But with nested components, when you call `App` and render the component, there is no way for React to know whether or not `RevealButton` and `Answer` depend on data that has changed, so React makes the decision to *always* re-render those children components. In fact, it wouldn't matter if props were passed in to those components (which also defeats the value of a closure), since React will be inspecting the actual reference (essentially the memory address) of the components. Since new functions were declared for these nested components, React will always identify them as changing - regardless of any parameters that changed, the functions themselves were redeclared. Even if two functions have the exact same body and name and other properties, TypeScript only believes they are equal if they live in the same memory address. 

So the outcome here is that if you are nesting components, you lose some of the best advantages of React: rather than efficiently reusing existing versions of a child component, React must instead recreate and redraw a new version of a component, even if the data involved in rendering the component has not changed. The `Answer` component above may change every time `visible` changes its value, but the `RevealButton` definitely should not, since its `onClick` function doesn't actually change. These small inefficiencies can add up quickly in large applications!

Another place this can cause trouble is with tests. The code below is supposed to find a button named `Show/Hide`, and then click on that button to reveal or hide some text (`42`). Although the first test can be expected to pass, the second test will fail because the button referenced by `reveal` is no longer available in the screen. We would need to use `getByRole` each time to get a fresh reference to the button, even though we'd expect that button's component to be unchanged as described above.

```tsx
// Just example code, does not run in the browser
const reveal = screen.getByRole("button", { name: /Show\/Hide/i });

// Passes
expect(screen.queryByText("42")).not.toBeInTheDocument();

reveal.click();
// Passes because clicking worked once
expect(screen.getByText("42")).toBeInTheDocument();

reveal.click();
// Fails because the reference to `reveal` was out of date!
expect(screen.queryByText("42")).not.toBeInTheDocument();
```

Arguably, a test relying on a component to not change its reference is fragile, and it might be better to use `getByRole` to get a fresh refrence before each click. However, if the developers intention was that the component should not re-render, then the test is not only safe, but defines and accurately tests the expected behavior of the component. As with all testing, you must think critically about what requirements and behavior you are trying to enforce!

# 📝 Task - Fixing Components

As always, begin by pulling our changes, making a new branch, and merging in our changes.

```sh
$> git checkout solved-state
$> git pull upstream main
$> git fetch upstream task-components
$> git checkout -b solved-components
$> git merge upstream/task-components
```

Congratulations! We gave you four broken components. Some of them are so broken, they will immediately cause errors. Yay!

You're going to need to fix the components. Beware: just passing their tests MAY not be sufficient. Make sure you achieve the desired functionality in the correct way. For example, simply deleting a test or component is not a good strategy.

## Fix `DoubleHalf`

The `DoubleHalf` component provides two buttons. One doubles the value, the other halves the value.

Currently, the component is commented out because it is broken and crashes your application. Uncomment the component's instantiation in `src/App.tsx`, and then fix the Component so that it works correctly.

You must NOT add or remove components; you can only *modify* the existing components. Hint: You are free to delete files if they serve no purpose, though...

## Fix `ChooseTeam`

The `ChooseTeam` component provides a list of buttons representing people, and a list of people representing a team. Clicking a button adds the given person to the team on the right, if they are not already there.

Currently, the component is broken and partially out, because its click handlers are not coded correctly to properly update state. Fix the click handler functions so that the component works correctly. Hint: You will want to modify the signature and binding of one of the inner helper functions.

You must not add or remove components; you can only *modify* the existing components.

## Fix `ColoredBox`

The `ColoredBox` component provides a single button that cycles through a list of colors, updating a box off to its right.

Currently, the component does not work, since the box always stays the same color when clicked. Fix the state so the component works correctly.

You must NOT add or remove components; you can only *modify* the existing components.

## Fix `ShoveBox`

The `ShoveBox` component provides a button that moves an adjacent box farther away, by increasing the boxes left margin.

Currently, part of the component's returned body is commented out because it is broken and crashes your application. Uncomment the component's body in `src/ShoveBox.tsx` and then fix the Component so that it works correctly.

You must NOT add or remove components; you can only *modify* the existing components.

<!--
TODO: Decided not to use this question. It's too easy to game, and doesn't say its point clearly enough. I wanted something where students would see that React doesnt' update its variables immediately. But it's a relatively rare situation. For now, I'm holding off on this until we get something better.

## Fix `Tracking Numbers`

The `TrackingNumbers` component provides a button to track ID numbers in a list; each time the button is clicked, a new number is added to the list starting with 1. A number can be clicked on to remove that number from the list.

Currently, the component is commented out because of an error. Further, when the error is fixed, you will find that the number being tracked is incorrect. Uncomment the component, handle the error, and then fix so that the number being tracked is correct..

-->

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
