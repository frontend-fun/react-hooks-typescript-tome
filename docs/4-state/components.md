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

# The React Model

What happens when you call `setState`? The Component functions get called again.

React is very good at figuring out which Components need to be called again. It is based strictly on the hooks.

# State Across Components

* Passing down props, lifting state up

This is a complicated problem. Fundamentally, there are only two ways that you can do this. You either need to have a **closure** or you need to have a parameter.

# Functions in Functions

At this point it's worth mentioning how we can use closures.

Downsides: functions are recreated every time our component renders. Functions are not reusable between components.

Upside: we can conveniently include variables directly inside. Also, functions are close to where they will be used.

# 📝 Task - Fixing Components

* They need to fix an example where they've tried to move the useState outside of the component.
* Problem where they need to lift a state up to the top component
* Situation where the state can be moved down to a child component

This stuff never makes sense just reading about it. Let's try working on some problems instead!

As always, begin by pulling our changes, making a new branch, and merging in our changes.

```sh
$> git pull upstream
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