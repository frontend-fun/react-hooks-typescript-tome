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

The `map` function provides a convenient way to render more Array state. The syntax might seem a little strange at first, but we embed the `map` directly into the TSX being returned.

Notice that we include an attribute named `key`. This is related to what we saw previously about object equality. You can read more about `key` here: <https://reactjs.org/docs/lists-and-keys.html>


# State Across Components

Breaking down a large application into Components is very handy. Ideally, each Component has its own little isolated state that only that Component knows about. The Component returns a view (TSX) that provides controls (e.g., buttons) for manipulating that State, causing the Component to re-render.

Sadly, life is rarely that simple. Most of the time, messing with one Component should change another. For example, clicking a button might hide or show another component. Adding some text to a box should let you add an element to a list elsewhere. We need to have ways of manipulating and reading state across Components.

## Wrong Idea: Import/Export

Let's start with something that doesn't work: trying to have state imported and exported.

## Wrong Idea: Accessing Components Fields

Another approach that DOES NOT WORK is to try and access fields or methods from one Component in another.

Functions defined inside of a Component are NOT available outside of that function definition. They are *not* methods. They are inner functions.

## Right Idea: Lifting State

* Passing down props, lifting state up

This is a complicated problem. Fundamentally, there are only two ways that you can do this. You either need to have a **closure** or you need to have a parameter.

# Functions in Functions

At this point it's worth mentioning how we can use closures.

Downsides: functions are recreated every time our component renders. Functions are not reusable between components.

Upside: we can conveniently include variables directly inside. Also, functions are close to where they will be used.

# 📝 Task - Fixing Components

Stop Here
{: .label .label-yellow }

**THIS TASK IS NOT READY YET. PLEASE WAIT UNTIL THE TASK OPENS ON CANVAS TO CONTINUE.**

* They need to fix an example where they've tried to move the useState outside of the component.
* Problem where they need to lift a state up to the top component
* Situation where the state can be moved down to a child component

This stuff never makes sense just reading about it. Let's try working on some problems instead!

As always, begin by pulling our changes, making a new branch, and merging in our changes.

```sh
$> git pull upstream main
$> git fetch upstream task-components
$> git checkout -b solved-components
$> git merge upstream/task-components
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

Once you're done submitting, we can learn about [Forms &raquo;](../4-state/forms.md)