---
layout: default
title: Using State
nav_order: 4
---


# Using State

JavaScript and TypeScript are not interesting because they let us do basic calculations and stuff. They are cool because they let us control web pages. So let's do that now instead.

## Components

```tsx

export function App(): JSX.Element {
  return <div>Hello World</div>
}
```

## Model, View, and Controller

* Data/control/visual one-way MVC architecture

## The useState concept

```typescript
const [state, setState] = useState<number>(initialValue);
```

### Terminology

* `state` is the "state variable"
* `setState` is the "state setter function"
* `useState` is the "Hook creation function"
* `initialValue` is the "Initial Value"

## Basic State

```tsx

function App(): JSX.Element {
  const [visible, setVisible] = useState<boolean>(true);

  return <div>
    <button onClick={()=>setVisible(!visible)}>Show/Hide</button>
    {visible && <div>Hello!</div>}
  </div>;
}

// TODO: These tests

```

* Basic of useState concept
  * set entire state
  * Testing user interaction
  * Boolean state: visible/not visible, disabled/not disabled, text1/text2
  * Number state: counter, calculator
  * String state: Anagramer, pig-latin, etc?, something with emojis?

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
